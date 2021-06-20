import {
    buyPath,
} from '../config/apiRoute'

import { apiHttp } from '../axiosApi'

export const createBuyApi = (body) => apiHttp('POST', `${buyPath}`, body)

export const getAllBuyApi = () => apiHttp('GET', `${buyPath}`)
