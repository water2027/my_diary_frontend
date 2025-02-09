export interface User {
  email: string
  username: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  email: string
  username: string
  token: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  password2: string
  code: number
}

export interface RegisterResponse {
  email: string
  username: string
  token: string
}

export interface UpdatePasswordRequest {
  email: string
  password: string
  password2: string
  code: number
}

export type UpdatePasswordResponse = null

export interface SendCodeRequest {
  email: string
}

export type SendCodeResponse = string

export interface DeleteRequest {
  code: string
}

export type DeleteResponse = null

export interface GetUserInfoRequest {
  email: string
  username: string
}
