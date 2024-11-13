import request from '@/utils/request-util'

export interface CaptchaType {
  ticket: string
  randstr: string
}
export interface LoginRequest {
  username: string
  password: string
}

export default class LoginService {
  static login = (params: LoginRequest): Promise<any> => {
    return request({
      url: '/api/auth/login',
      method: 'post',
      data: params,
    })
  }

  static logout = () => {
    return request({
      url: '/api/auth/logout',
      method: 'post',
    })
  }
}
