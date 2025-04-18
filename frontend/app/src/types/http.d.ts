// src/types/http.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosRequestConfig, AxiosResponse } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /**
     * showLoading
     * @default false
     */
    showLoading?: boolean
    
    /**
     * silentError
     * @default false
     */
    silentError?: boolean
  }

  export interface AxiosResponse<T = unknown> {
    code: number
    message: string
    data: T
  }
}
