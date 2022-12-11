const PROJECT_NAME = 'NeteaseCloudMusicTools'

function getName(name: string) {
  return PROJECT_NAME + '_' + name
}

export default {
  /** 获取本地存储 */
  getStorage(key: string) {
    return window.localStorage.getItem(getName(key)) || null
  },
  /** 存储到本地存储 */
  saveStorage(key: string, value: any = null) {
    window.localStorage.setItem(getName(key), value)
  },
  /** 删除本地存储 */
  delStorage(key: string) {
    window.localStorage.removeItem(key)
  }
}
