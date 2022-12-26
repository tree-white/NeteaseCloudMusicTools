import http from '@/plugins/axios'

/** 获取二维码登录所需Key */
export const getQrCodeKey = () =>
  http.request<LoginQrKey>({
    url: '/login/qr/key',
    method: 'POST'
  })
/** 获取登录二维码 */
export const getQrCodeUrl = (data: LoginQrCreateData) =>
  http.request<LoginQrCreate>({
    url: '/login/qr/create',
    method: 'POST',
    data
  })
/** 查询登录二维码扫码状态 */
export const queryQrCodeState = (data: LoginQrCheckData) =>
  http.request<null, LoginQrCheck>({
    url: '/login/qr/check',
    method: 'POST',
    data
  })
