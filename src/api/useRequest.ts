import { ref } from 'vue'
import type { Ref } from 'vue'

import { getToken } from './auth'

enum Code {
  Fail = 0,
  Unauthorized = 1,
  Success = 100,
}

export interface Response<T> {
  code: Code
  data: T
  message: string
}

export interface Result<T> {
  data: Ref<T>
  isLoading: Ref<boolean>
  error: Ref<Error | null>
}

function isResponse<T>(data: unknown): data is Response<T> {
  if (!data) {
    return false
  }
  if (typeof data === 'object') {
    return 'code' in data && 'data' in data && 'message' in data
  }
  return false
}

export interface Query {
  [key: string]: string | number
}

class RequestHandler {
  #baseUrl: string

  private static instance: RequestHandler
  private constructor(baseUrl: string = import.meta.env.VITE_API_BASE_URL) {
    this.#baseUrl = baseUrl
  }

  public static getInstance(): RequestHandler {
    if (!RequestHandler.instance) {
      RequestHandler.instance = new RequestHandler()
    }
    return RequestHandler.instance
  }

  private useRequest<T>(url: string, requestInit: RequestInit, isAsync: true): Promise<T>
  private useRequest<T>(url: string, requestInit: RequestInit, isAsync: false): Result<T>
  private useRequest<T>(
    url: string,
    requestInit: RequestInit,
    isAsync: boolean = true,
  ): Promise<T> | Result<T> {
    if (isAsync) {
      return fetch(url, {
        // requestInit
        headers:{
          ...requestInit.headers,
          
        },
        method:requestInit.method,
        mode:'cors',
        body:requestInit.body
      })
        .then((response) => response.json())
        .then((data) => {
          if (isResponse<T>(data)) {
            this.codeHandler(data.code)
            return data.data
          }
          throw new Error('0')
        })
    }
    const data = ref<T>()
    const isLoading = ref(true)
    const error = ref<Error | null>(null)
    fetch(url, requestInit)
      .then((response) => response.json())
      .then((res) => {
        if (!isResponse<T>(res)) {
          throw new Error('0')
        } 
        this.codeHandler(res.code)
        data.value = res.data
      })
      .catch((error) => {
        console.error(error)
        error.value = error
      })
      .finally(() => {
        isLoading.value = false
      })
    return {
      data,
      isLoading,
      error,
    } as Result<T>
  }

  private codeHandler(code: Code) {
    switch (code) {
      case 0: {
        throw new Error('fail')
      }
      case 1: {
        // TODO: 重新登录
        console.log('未登录')
        break
      }
      case 100 :{
        break
      }
      default: {
        throw new Error('后端改了前端没改')
      }
    }
  }

  public Get<T>(url: string, query: Query, isAuth: boolean, isAsync: true): Promise<T>
  public Get<T>(url: string, query: Query, isAuth: boolean, isAsync: false): Result<T>
  public Get<T>(
    url: string,
    query: Query,
    isAuth: boolean = true,
    isAsync: boolean = true,
  ): Promise<T> | Result<T> {
    const headers = new Headers()
    if (isAuth) {
      const token = getToken()
      if (!token) {
        throw new Error('1')
      }
      headers.set('Authorization', `Bearer ${token}`)
    }
    const queryParams = new URLSearchParams()
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        queryParams.append(key, query[key].toString())
      }
    }
    let fullUrl = this.#baseUrl + url
    if (queryParams.toString()) {
      fullUrl += '?' + queryParams.toString()
    }
    if (isAsync) {
      return this.useRequest<T>(
        fullUrl,
        {
          method: 'GET',
          headers,
        },
        true,
      )
    } else {
      return this.useRequest<T>(
        fullUrl,
        {
          method: 'GET',
          headers,
        },
        false,
      )
    }
  }

  public Post<T>(url: string, body: unknown, isAuth: boolean, isAsync: true): Promise<T>
  public Post<T>(url: string, body: unknown, isAuth: boolean, isAsync: false): Result<T>
  public Post<T>(
    url: string,
    body: unknown,
    isAuth: boolean = true,
    isAsync: boolean = true,
  ): Promise<T> | Result<T> {
    const headers = new Headers()
    if (body instanceof Object) {
      headers.set('Content-Type', 'application/json')
    } else {
      headers.delete('Content-Type')
    }
    if (isAuth) {
      const token = getToken()
      if (!token) {
        throw new Error('1')
      }
      headers.set('Authorization', `Bearer ${token}`)
    }
    if (isAsync) {
      return this.useRequest<T>(
        this.#baseUrl + url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        },
        true,
      )
    } else {
      return this.useRequest<T>(
        this.#baseUrl + url,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        },
        false,
      )
    }
  }

  public Put<T>(url: string, body: unknown, isAuth: boolean, isAsync: true): Promise<T>
  public Put<T>(url: string, body: unknown, isAuth: boolean, isAsync: false): Result<T>
  public Put<T>(
    url: string,
    body: unknown,
    isAuth: boolean = true,
    isAsync: boolean = true,
  ): Promise<T> | Result<T> {
    const headers = new Headers()
    if (body instanceof Object) {
      headers.set('Content-Type', 'application/json')
    } else {
      headers.delete('Content-Type')
    }
    if (isAuth) {
      const token = getToken()
      if (!token) {
        throw new Error('1')
      }
      headers.set('Authorization', `Bearer ${token}`)
    }
    if (isAsync) {
      return this.useRequest<T>(
        this.#baseUrl + url,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify(body),
        },
        true,
      )
    } else {
      return this.useRequest<T>(
        this.#baseUrl + url,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify(body),
        },
        false,
      )
    }
  }

  public Delete<T>(url: string, isAuth: boolean, isAsync: true): Promise<T>
  public Delete<T>(url: string, isAuth: boolean, isAsync: false): Result<T>
  public Delete<T>(
    url: string,
    isAuth: boolean = true,
    isAsync: boolean = true,
  ): Promise<T> | Result<T> {
    const headers = new Headers()
    if (isAuth) {
      const token = getToken()
      if (!token) {
        throw new Error('1')
      }
      headers.set('Authorization', `Bearer ${token}`)
    }
    if (isAsync) {
      return this.useRequest<T>(
        this.#baseUrl + url,
        {
          method: 'DELETE',
          headers,
        },
        true,
      )
    } else {
      return this.useRequest<T>(
        this.#baseUrl + url,
        {
          method: 'DELETE',
          headers,
        },
        false,
      )
    }
  }
}

// 单例模式

export const requestHandler = RequestHandler.getInstance()
