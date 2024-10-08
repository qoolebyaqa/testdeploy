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
  
  customers: '/api/v1/customers',

  users: '/api/v1/users',
} 

export const ApiService = {
  //auth:
  login: async (login: string, password: string) => {
    const response = await privateAxios.post(endPoints.login_post, {login, password});
    return response;
  },
  refreshToken: async(refreshToken: string) => {
    const response = await privateAxios.post(endPoints.refreshToken_post, {refresh_token: refreshToken});
    return response;
  },
  getLinktoReset: async(login: string) => {
    const response = await privateAxios.post(endPoints.passwordRest_post, {login, with_sms: true, with_mail: false} );
    return response;
  },
  getOTP: async(linkTKN: string, phoneN: string) => {
    const response = await privateAxios.post(endPoints.passwordOTPcode_post, {token: linkTKN, phone: phoneN} );
    return response;
  },  
  verifyOTP: async(linkTKN: string, code: number) => {
    const response = await privateAxios.post(endPoints.passwordVerifyOTP_post, {token: linkTKN, code} );
    return response;
  },
  setNewPass: async(linkTKN: string, password: string, repeat: string) => {
    const response = await privateAxios.post(endPoints.passwordSetNew_post, {token: linkTKN, password, repeat_password: repeat} );
    return response;
  },
  //customers:
  getCustomers: async() => {
    const response = await privateAxios.get(endPoints.customers);
    return response;
  },
  createCustomer: async(formData: {[key:string]: string}) => {
    const response = await privateAxios.post(endPoints.customers, formData);
    return response;
  },
  getCustomer: async(id: number) => {
    const response = await privateAxios.get(`${endPoints.customers}/${id}`);
    return response;
  },
  updateCustomer: async(formData: {[key:string]: string}, etag: string) => {
    const response = await privateAxios.put(`${endPoints.customers}/${formData.id}`, formData, {headers: {"If-Match": etag}});
    return response;
  },
  //users:
  getUsers: async() => {
    const response = await privateAxios.get(endPoints.users);
    return response;
  },
  getUser: async (id: string) => {
    const response = await privateAxios.get(`${endPoints.users}/${id}`);
    return response;
  },  
  createUser: async(formData: {[key:string]: string}) => {
    const response = await privateAxios.post(endPoints.users, formData);
    return response;
  },
  updateUser: async(formData: {[key:string]: string}, etag: string) => {
    const response = await privateAxios.put(`${endPoints.users}/${formData.id}`, formData, {headers: {"If-Match": etag}});
    return response;
  },
  deleteUser: async(userID: string, etag:string) => {
    const response = await privateAxios.delete(`${endPoints.users}/${userID}`, {headers: {"If-Match": etag.slice(2)}});
    return response;
  },
}

