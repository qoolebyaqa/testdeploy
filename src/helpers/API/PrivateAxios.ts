import { authActions } from '../../store/auth';
import axios, { Axios } from "axios";
import store from "../../store";
import { ApiService } from './ApiSerivce';
import { v4 as uuidv4 } from 'uuid';

const privateAxios: Axios = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

let isRefreshingToken = false;

function setAuthInterceptors(client: Axios) {
  client.interceptors.request.use(
    (request) => {
      if(request.method === 'post' || request.method === 'put')
        {request.headers['Idempotency-Key'] = uuidv4()}      
      if(request.url?.includes('/v1/auth/login') || request.url?.includes('/v1/auth/refresh'))
        {return request;}
      const token = store.getState().auth.access_token;
      if (token && request.headers) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;
      // Errors handling
      const { response } = error;
      if (response && response.status === 401 && !isRefreshingToken && !originalRequest.url.includes('/v1/auth/refresh') && !originalRequest.url.includes('/v1/auth/login')) {
        isRefreshingToken = true;
        try {
          const res = await ApiService.refreshToken(localStorage.getItem('rt') as string); 
          const accessToken = res.data.access_token;
          if (accessToken) {
            localStorage.setItem('rt', res.data.refresh_token)
            store.dispatch(authActions.setCurToken(accessToken));
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return client.request(originalRequest);
          } else {
            localStorage.removeItem('rt');
            store.dispatch(authActions.setCurToken(null))    
            return error
          }   
        } catch (err) {
          console.log('refresh with error')
          return err;
        } finally {
          isRefreshingToken = false;
        }
      }
      return Promise.reject(error);
    }
  );
}

setAuthInterceptors(privateAxios);
export default privateAxios;
