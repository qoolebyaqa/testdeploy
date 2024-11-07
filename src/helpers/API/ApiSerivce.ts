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

  notificationTemplates: '/api/v1/notification-templates',
  messages: '/api/v1/messages',
  notificationQueue: '/api/v1/notification-queue',
  recipientGroups: '/api/v1//recipient-groups',
  registerFinger: '/api/v1/fingerprints/register',
  preLoginUrl: '/api/v1/fingerprints/pre-login',
  loginUrl: '/api/v1/fingerprints/login',
} 

export const ApiService = {
  //auth:
  login: async (login: string, password: string) => {
    const response = await privateAxios.post(endPoints.login_post, {login, password});
    return response;
  },
  logout: async (rt: string) => {
    const response = await privateAxios.post(endPoints.logout_post, {refresh_token: rt});
    return response;
  },
  refreshToken: async(refreshToken: string) => {
    const response = await privateAxios.post(endPoints.refreshToken_post, {refresh_token: refreshToken});
    return response;
  },
  getUserInfo: async() => {
    const response = await privateAxios.get(`${endPoints.users}/me`);
    return response;
  },
  getLinktoReset: async(login: string) => {
    const response = await privateAxios.post(endPoints.passwordRest_post, {login, with_sms: true, with_mail: false} );
    return response;
  },
  getOTP: async(linkTKN: string) => {
    const response = await privateAxios.post(endPoints.passwordOTPcode_post, {token: linkTKN} );
    return response;
  },  
  verifyOTP: async(phoneN: string, code: number) => {
    const response = await privateAxios.post(endPoints.passwordVerifyOTP_post, {phone: phoneN, code} );
    return response;
  },
  setNewPass: async(linkTKN: string, password: string, repeat: string) => {
    const response = await privateAxios.post(endPoints.passwordSetNew_post, {token: linkTKN, password, repeat_password: repeat} );
    return response;
  },
  //customers:
  getCustomers: async(page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.customers}?page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },
  createCustomer: async(formData: {[key:string]: string | number}) => {
    const response = await privateAxios.post(endPoints.customers, formData);
    return response;
  },
  getCustomer: async(id: number) => {
    const response = await privateAxios.get(`${endPoints.customers}/${id}`);
    return response;
  },
  updateCustomer: async(formData: {[key:string]: string | number}, etag: string) => {
    const response = await privateAxios.put(`${endPoints.customers}/${formData.id}`, formData, {headers: {"If-Match": etag}});
    return response;
  },
  searchCustomers: async(query: string) => {
    const response = await privateAxios.get(`${endPoints.customers}/search?query=${query}`);
    return response;
  },
  addDocument: async(formData: FormData, id: string) => {
    const response = await privateAxios.post(`${endPoints.customers}/${id}/documents`, formData);
    return response;
  },
  getDocuments: async(customerId: string) => {
    const response = await privateAxios.get(`${endPoints.customers}/${customerId}/documents`);
    return response;
  },
  deleteDocument: async(customerId: string, docId: string) => {
    const response = await privateAxios.delete(`${endPoints.customers}/${customerId}/documents/${docId}`);
    return response;
  },
  //users:
  getUsers: async(page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.users}?page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
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

  //notification:
  getMessages: async(page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.messages}?page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },
  createGroup: async(name: string, description: string) => {
    const response = await privateAxios.post(endPoints.recipientGroups, {
      name, description
    });
    return response;
  },
  createNotificationTemplate: async(formData: {[key:string]: string}) => {
    const response = await privateAxios.post(endPoints.notificationTemplates, formData);
    return response;    
  },
  getCroups: async(page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.recipientGroups}?page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },
  getTemplates: async(page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.notificationTemplates}?page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },
  getQueue: async(page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.notificationQueue}?page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },
  addToQueue: async(formData: {template_id: string, scheduled: boolean, recipient_type: string, scheduled_at?: string, recipient_ids: number[]}) => {
    const response = await privateAxios.post(endPoints.notificationQueue, formData);
    return response;    
  },
  deleteFromQueue: async(ids: number[]) => {
    const response = await privateAxios.delete(endPoints.notificationQueue, {
      data: {notification_ids: ids}
    });
    return response;    
  },
  retrySendQueue: async(ids: number[]) => {
    const response = await privateAxios.post(`${endPoints.notificationQueue}/retry`, {
      data: {notification_ids: ids}
    });
    return response;    
  },

  //fingerPrint
  registerFingers: async(agent_id: string, login: string, templates:string[]) => {
    const response = await privateAxios.post(`${endPoints.registerFinger}`,{agent_id,login,templates});
    return response;
  },
  preLogin: async(login: string,) => {
    const response = await privateAxios.post(`${endPoints.preLoginUrl}?login=${login}`);
    return response;
  },
  loginWithFingerPrint: async(result: string,agent_id:string) => {
    const response = await privateAxios.post(`${endPoints.loginUrl}`,{agent_id,result});
    return response;
  },
}

