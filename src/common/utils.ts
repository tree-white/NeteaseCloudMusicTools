const PROJECT_NAME = 'NeteaseCloudMusicTools'

function getName(name: string) {
  return PROJECT_NAME + '_' + name
}

export default {
  /** 获取本地存储 */
  getStorage<T>(key: string) {
    return JSON.parse(window.localStorage.getItem(getName(key))!) as T | null
  },
  /** 存储到本地存储 */
  saveStorage(key: string, value: any) {
    window.localStorage.setItem(getName(key), JSON.stringify(value))
  },
  /** 删除本地存储 */
  removeStorage(key: string) {
    window.localStorage.removeItem(getName(key))
  }
}
