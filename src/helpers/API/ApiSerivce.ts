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
  regions: '/api/v1/regions',

  loans: '/api/v1/loans',

  collaterals: '/api/v1/collateral',

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
  searchCustomers: async(query: string, page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.customers}/search?query=${query}&page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },
  addDocument: async(formData: FormData, id: string, type: 'DOCUMENT' | 'PASSPORT') => {
    const response = await privateAxios.post(`${endPoints.customers}/${id}/documents?type=${type}`, formData);
    return response;
  },
  getDocuments: async(customerId: string, type?: string) => {
    const response = await privateAxios.get(`${endPoints.customers}/${customerId}/documents?type=${type}`);
    return response;
  },
  deleteDocument: async(customerId: string, docId: string) => {
    const response = await privateAxios.delete(`${endPoints.customers}/${customerId}/documents/${docId}`);
    return response.data;
  },
  getRegions: async() => {
    const response = await privateAxios.get(`${endPoints.regions}`);
    return response;
  },
  getCustomerComments: async(customerId:string) => {
    const response = await privateAxios.get(`${endPoints.customers}/${customerId}/comments`)
    return response
  },
  addCustomerComments: async(customerId:string,formData:{[key:string]: string}) => {
    const response = await privateAxios.post(`${endPoints.customers}/${customerId}/comments`,formData)
    return response
  },
  updateCustomerComments: async(customerId:string,commentId:string,formData:{[key:string]: string}) => {
    const response = await privateAxios.put(`${endPoints.customers}/${customerId}/comments/${commentId}`,formData)
    return response
  },
  deleteCustomerComments: async(customerId:string,commentId:string) => {
    const response = await privateAxios.delete(`${endPoints.customers}/${customerId}/comments/${commentId}`)
    return response
  },

  //contracts: 
  getLoanProducts: async() => {
    const response = await privateAxios.get(`${endPoints.loans}/products`);
    return response;
  },
  postLoanProduct: async(formData: {[key:string]: string | boolean | number}) => {
    const response = await privateAxios.post(`${endPoints.loans}/products`, formData);
    return response;
  },
  createPOinHold: async(formData: {[key:string]: string | boolean | number}) => {
    const response = await privateAxios.post(`${endPoints.loans}/hold`, formData);
    return response;
  },
  confirmPo: async (id: number) => {
    const response = await privateAxios.post(`${endPoints.loans}/${id}/confirm`);
    return response;
  },  
  issuePo: async (id: number, formData: {[key:string]: any}) => {
    const response = await privateAxios.post(`${endPoints.loans}/${id}/issue`, formData);
    return response;
  },
  getPaginatenPOs: async(page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.loans}?page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },  
  searchPOs: async(query: string, page:number = 0, size:number = 14, sortStr?: string, filter?: string) => {
    const response = await privateAxios.get(`${endPoints.loans}/search?query=${query}&page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },
  getPO: async(id: string | number) => {
    const response = await privateAxios.get(`${endPoints.loans}/${id}`);
    return response;
  },

  //collaterals:
  getPOCollaterals: async(filter: string, page:number = 0, size:number = 14, sortStr?: string) => {
    const response = await privateAxios.get(`${endPoints.collaterals}s?page=${page}&size=${size}${filter ? filter : ''}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },  
  createCollateralForPO: async(formData: {[key:string]: any}) => {
    const response = await privateAxios.post(`${endPoints.collaterals}s`, formData);
    return response;
  },
  updateCollateralForPO: async(formData: {[key:string]: any}, id: string | number) => {
    const response = await privateAxios.put(`${endPoints.collaterals}s/${id}`, formData);
    return response;
  },
  deleteCollateral: async(id: string | number) => {
    const response = await privateAxios.delete(`${endPoints.collaterals}s/${id}`);
    return response;
  },
  getCollateralTypes: async() => {
    const response = await privateAxios.get(`${endPoints.collaterals}-types`);
    return response;
  },
  createCollateralTypeAttr: async(id:string, formData: {[key:string]: string | boolean | number| string[]}) => {
    const response = await privateAxios.post(`${endPoints.collaterals}-types/${id}/attributes`, formData);
    return response;
  },
  updateCollateralTypeAttr: async(id:string, attrId: string, formData: {[key:string]: string | boolean | number | {}}) => {
    const response = await privateAxios.put(`${endPoints.collaterals}-types/${id}/attributes/${attrId}`, formData);
    return response;
  },
  deleteCollateralTypeAttr: async(id:string, attrId: string) => {
    const response = await privateAxios.delete(`${endPoints.collaterals}-types/${id}/attributes/${attrId}`);
    return response;
  },
  deleteCollateralType: async(id: string) => {
    const response = await privateAxios.delete(`${endPoints.collaterals}-types/${id}`);
    return response;
  },
  createCollateralType: async(name: string, formula_type: 'SIMPLE_MULTIPLICATION') => {
    const response = await privateAxios.post(`${endPoints.collaterals}-types`, {name, formula_type, is_active: true});
    return response;
  },  
  getCollateralPriceList: async(page:number = 0, size:number = 14, sortStr?: string) => {
    const response = await privateAxios.get(`${endPoints.collaterals}-price-list?page=${page}&size=${size}${sortStr ? `&${sortStr}`:''}`);
    return response;
  },
  updateCollateralPriceList: async(formData: {[key:string]: any}, id: string | number) => {
    const response = await privateAxios.put(`${endPoints.collaterals}-price-list/${id}`, formData);
    return response;
  },
  createCollateralPriceList: async(formData: {[key:string]: string | boolean | number | object}) => {
    const response = await privateAxios.post(`${endPoints.collaterals}-price-list`, formData);
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
      notification_ids: ids
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

