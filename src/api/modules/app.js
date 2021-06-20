import {
    appPath,
    appsPath,
} from '../config/apiRoute'
import { apiHttp } from '../axiosApi'

export const createAppApi = (body) => apiHttp('POST', `${appPath}`, body)

export const getAllAppsApi = (params) => apiHttp('GET', `${appsPath}/?page=${params.page}&size=${params.size}`)

export const getAllAppDevApi = () => apiHttp('GET', `${appPath}`)

export const getAppApi = (slug) => apiHttp('GET', `${appPath}/${slug}`)

export const serchAppApi = (params) => apiHttp('GET', `${appPath}/search?search=${params}`)

export const putAppApi = (slug, body) => apiHttp('PUT', `${appPath}/${slug}`, body)
