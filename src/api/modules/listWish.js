import { apiHttp } from '../axiosApi'
import {
    wishPath,
} from '../config/apiRoute'
export const addWishApi = (body) => apiHttp('POST', `${wishPath}`, body)
export const getAllWishApi = () => apiHttp('GET', `${wishPath}`)
export const deleteWishApi = (id) => apiHttp('DELETE', `${wishPath}/${id}`)
