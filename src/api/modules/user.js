import { apiHttp } from '../axiosApi'

import {
    loginPath,
    registerPath,
} from '../config/apiRoute'

export const loginApi = (body) => apiHttp('POST', `${loginPath}`, body)
export const registerApi = (body) => apiHttp('POST', `${registerPath}`, body)
