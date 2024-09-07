import privateAxios from "./PrivateAxios"

const endPoints = {
  login_post: '/api/v1/auth/login',
  refreshToken_post: '/api/v1/auth/refresh',
  logout_post: '/api/v1/auth/logout',

  passwordRegexConstraints_get: '/api/v1/users/password/constraints',
  passwordRest_post: '/api/v1/users/password/token',
  passwordOTPcode_post: '/api/v1/users/password/code/send',
  passwordVerifyOTP_post: '/api/v1/users/password/code/verify',
  passwordSetNew_post: '/api/v1/users/password',
  
  //getList, createNew, 
  //getOne, updateOne, 
  //changeStatus
  customers: '/api/v1/customers',

  //getList, createNew, 
  //getOne, updateOne, deleteOne
  users: '/api/v1/users',
} 

export const ApiService = {
  login: async (login: string, password: string) => {
    const response = await privateAxios.post(endPoints.login_post, {login, password});
    return response;
  },
  refreshToken: async(refreshToken: string) => {
    const response = await privateAxios.post(endPoints.refreshToken_post, {refresh_token: refreshToken});
    return response;
  },
  getCustomers: async() => {
    const response = await privateAxios.get(endPoints.customers);
    return response;
  },
  createCustomer: async(formData: {[key:string]: string}) => {
    const response = await privateAxios.post(endPoints.customers, formData);
    return response;
  },
  getUsers: async() => {
    const response = await privateAxios.get(endPoints.users);
    return response;
  },  
  createUser: async(formData: {[key:string]: string}) => {
    const response = await privateAxios.post(endPoints.users, formData);
    return response;
  },
}

