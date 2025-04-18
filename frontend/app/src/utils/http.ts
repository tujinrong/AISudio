// src/utils/http.ts
import axios, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
    AxiosInstance
  } from 'axios'
  
  // from .env
  const BASE_URL = import.meta.env.VITE_API_BASE
  
  // create axios instance
  const instance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    // timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let loadingCount = 0;

// show loading
const showLoading = () => {
    loadingCount++;
    if (loadingCount === 1) {
        console.log('显示全局 Loading');
    }
};
// hide loading
const hideLoading = () => {
    loadingCount--;
    if (loadingCount <= 0) {
        loadingCount = 0;
        console.log('隐藏全局 Loading');
    }
};


// interceptors
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // auth token
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        // show loading
        if (config.showLoading !== false) {
            showLoading();
        }
        
        // dev env log
        if (import.meta.env.DEV) {
            console.log(`request: ${config.url}`, config.params || config.data)
        }
        
        return config
    },
    (error: AxiosError): Promise<AxiosError> => {
        // hide loading
        hideLoading();
        return Promise.reject(error)
    }
)
  
// response interceptors
instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        // hide loading
        hideLoading();

        // dev
        if (import.meta.env.DEV) {
            console.log(`response: ${response.config.url}`, response.data)
        }
      
        return response.data
    },
    (error: AxiosError): Promise<AxiosError> => {
        // hide loading
        hideLoading();

        // error handler
        if (import.meta.env.DEV) {
            console.error('request error:', error)
        }
        // deal with status
        switch (error.response?.status) {
                case 401:
                // redireact to login
                window.location.href = '/login'
                break
                case 403:
                alert('no pomission')
                break
                case 500:
                alert('server error')
                break
                default:
                alert(`request failure: ${error.message}`)
        }
        return Promise.reject(error)
    }
)
  
  // request method
  const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
    return instance.request(config)
  }
  
  // http method
  export const get = <T>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({ ...config, method: 'GET', url, params })
  }
  
  export const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({ ...config, method: 'POST', url, data })
  }
  
  export const put = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({ ...config, method: 'PUT', url, data })
  }
  
  export const del = <T>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({ ...config, method: 'DELETE', url, params })
  }
  
  export const patch = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return request<T>({ ...config, method: 'PATCH', url, data })
  }
  
  export default {
    get,
    post,
    put,
    del,
    patch
  }
  