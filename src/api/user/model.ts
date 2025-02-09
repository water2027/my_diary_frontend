import type { Examiner } from '../model'

export class LoginRequest implements Examiner {
  email: string
  password: string
  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
  Examine(): boolean {
    const newEmail = this.email.replace(/\s+/g, '')
    const newPassword = this.password.replace(/\s+/g, '')
    return newEmail !== '' && newPassword !== ''
  }
}

export interface LoginResponse {
  email: string
  username: string
  token: string
}

export class RegisterRequest implements Examiner {
  email: string
  username: string
  password: string
  password2: string
  code: string
  constructor(email: string, username: string, password: string, password2: string, code: string) {
    this.email = email
    this.username = username
    this.password = password
    this.password2 = password2
    this.code = code
  }
  Examine(): boolean {
    const newEmail = this.email.replace(/\s+/g, '')
    const newUsername = this.username.replace(/\s+/g, '')
    const newPassword = this.password.replace(/\s+/g, '')
    const newPassword2 = this.password2.replace(/\s+/g, '')
    return newEmail !== '' && newUsername !== '' && newPassword !== '' && newPassword2 !== '' && newPassword === newPassword2 && this.code.length > 0 && this.code.length <= 6
  }
}

export interface RegisterResponse {
  email: string
  username: string
  token: string
}

export class UpdatePasswordRequest implements Examiner {
  email: string
  password: string
  password2: string
  code: string
  constructor(email: string, password: string, password2: string, code: string) {
    this.email = email
    this.password = password
    this.password2 = password2
    this.code = code
  }
  Examine(): boolean {
    // 去除空格
    const newEmail = this.email.replace(/\s+/g, '')
    const newPassword = this.password.replace(/\s+/g, '')
    const newPassword2 = this.password2.replace(/\s+/g, '')
    return newEmail !== '' && newPassword !== '' && newPassword2 !== '' && this.code.length > 0 && this.code.length <= 6
  }
}

export type UpdatePasswordResponse = null

export class SendCodeRequest implements Examiner {
  email: string
  constructor(email: string) {
    this.email = email
  }
  Examine(): boolean {
    // 去除空格
    const newEmail = this.email.replace(/\s+/g, '')
    return newEmail !== ''
  }
}

export type SendCodeResponse = string

export class DeleteRequest implements Examiner {
  code: string
  constructor(code: string) {
    this.code = code
  }
  Examine(): boolean {
    const newCode = this.code.replace(/\s+/g, '')
    return newCode.length > 0 
  }
}

export type DeleteResponse = null

export class GetUserInfoRequest implements Examiner {
  email: string
  username: string
  constructor(email: string, username: string) {
    this.email = email
    this.username = username
  }
  Examine(): boolean {
    const newEmail = this.email.replace(/\s+/g, '')
    const newUsername = this.username.replace(/\s+/g, '')
    return newEmail !== '' && newUsername !== ''
  }
}
