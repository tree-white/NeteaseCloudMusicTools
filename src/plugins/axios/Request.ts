import { RESPONSE_TYPE_ENUM } from '@/common/enums'
import systemStore from '@/store/systemStore'
import userInfoStore from '@/store/userInfoStore'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export default class Request {
  private instance
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.requestInterceptor()
    this.responseInterceptor()
  }

  public request<T extends any, D = HttpResponse<T>>(config: AxiosRequestConfig): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config)
        resolve(response.data)
      } catch (error) {
        console.warn('>>>>>> 响应异常=>', error)
        reject('接口请求失败')
      }
    })
  }

  /** 请求拦截 */
  requestInterceptor() {
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        console.log('>>>>>> config=>', config)
        const FIELD = config.method === 'get' ? 'params' : 'data'

        // 设置基准地址
        config.baseURL = systemStore().baseUrl

        // 添加时间戳
        config.params = Object.assign(config.params ?? {}, { ts: Date.now() })

        // 使用VPN时，代理的IP可能会被网易云拉入危险IP，需要传递一个真实的国内IP来做转换[手动开启，默认关闭]
        if (systemStore().useRealIp) {
          config[FIELD] = Object.assign(config[FIELD] || {}, { realIP: systemStore().realIp })
        }

        // 非登录接口添加Cookie
        if (!config.url?.includes('/login')) {
          config[FIELD]['cookie'] = userInfoStore().cookie
        }

        return config
      },
      error => {
        console.log('>>>>>> error=>', error)
      }
    )
  }

  /** 响应拦截 */
  responseInterceptor() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      error => {
        const { status = error?.message ?? error } = error?.response ?? {}
        console.log('>>>>>> error=>', error)
        const errorMessage: string = RESPONSE_TYPE_ENUM[status] ?? `连接出错(${status})`
        ElMessage.error(errorMessage + '，请检查网络或联系管理员！')
      }
    )
  }
}
