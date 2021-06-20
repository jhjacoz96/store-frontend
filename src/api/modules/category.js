import { apiHttp } from '../axiosApi'
import {
    categoryPath,
} from '../config/apiRoute'

export const getAllCategoryApi = () => apiHttp('GET', `${categoryPath}`)
export const getCategoryApi = (slug, params) => apiHttp('GET', `${categoryPath}/${slug}/?page=${params.page}&size=${params.size}`)
