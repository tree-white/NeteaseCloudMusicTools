interface HttpResponse<T> {
  code: number
  data: T
}
interface HttpResponseCookie {
  code: number
  message: string
  cookie: string
}

//============================== 登录 ==============================//
/** 获取登录二维码KEY */
interface LoginQrKey {
  code: number
  unikey: string
}
/** 获取登录二维码 */
interface LoginQrCreateData {
  key: LoginQrKey.unikey
  qrimg?: any
}
interface LoginQrCreate {
  qrurl: string
  qrimg: string
}
/** 查询登录二维码状态 */
interface LoginQrCheckData {
  key: string
}
interface LoginQrCheck {
  code?: number
  message?: string
  cookie?: string
  nickname?: string
  avatarUrl?: string
}

/** 手机号登录参数 */
interface PhoneLoginData {
  phone: string
  password?: string
  countrycode?: number
  md5_password?: string
  captcha?: number
}

/** 手机号登录响应 */
interface PhoneLoginResponse extends HttpResponseCookie {
  msg?: string
  [key: string]: any
}

/** 邮箱号登录参数 */
interface EMailLoginData extends Partial<PhoneLoginData> {
  email: string
}
/** 邮箱号登录响应 */
interface EMailLoginResponse extends PhoneLoginResponse {}

//============================== 云盘 ==============================//
type UploadCloudDisk = {
  data: FormData
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}

interface QueryCloudDisk extends HttpResponse<CloudMusicInfo[]> {
  count: number
  size: string
  maxSize: string
  upgradeSign: number
  hasMore: boolean
}

interface CloudMusicInfo {
  simpleSong: SimpleSong
  coverId: string
  lyricId: string
  fileSize: number
  album: string
  artist: string
  bitrate: number
  songId: number
  addTime: number
  songName: string
  cover: number
  version: number
  fileName: string
}

interface SimpleSong {
  name: string
  id: number
  pst: number
  t: number
  ar: Ar[]
  alia: any[]
  pop: number
  st: number
  rt: null | string
  fee: number
  v: number
  crbt: null
  cf: null | string
  al: Al
  dt: number
  h: H | null
  m: H | null
  l: H | null
  a: null
  cd: null | string
  no: number
  rtUrl: null
  ftype: number
  rtUrls: any[]
  djId: number
  copyright: number
  s_id: number
  mark: number
  originCoverType: number
  originSongSimpleData: null
  single: number
  noCopyrightRcmd: NoCopyrightRcmd | null
  rtype: number
  rurl: null
  mst: number
  cp: number
  mv: number
  publishTime: number
  privilege: Privilege
}

interface Al {
  id: number
  name: null | string
  picUrl: string
  tns: any[]
  pic: number
  pic_str?: string
}

interface Ar {
  id: number
  name: null | string
  tns: any[]
  alias: any[]
}

interface H {
  br: number
  fid: number
  size: number
  vd: number
}

interface NoCopyrightRcmd {
  type: number
  typeDesc: string
  songId: null
}

interface Privilege {
  id: number
  fee: number
  payed: number
  st: number
  pl: number
  dl: number
  sp: number
  cp: number
  subp: number
  cs: boolean
  maxbr: number
  fl: number
  toast: boolean
  flag: number
  preSell: boolean
  playMaxbr: number
  downloadMaxbr: number
  maxBrLevel: DLLevelEnum
  playMaxBrLevel: DownloadMaxBrLevelEnum
  downloadMaxBrLevel: DownloadMaxBrLevelEnum
  plLevel: DLLevelEnum
  dlLevel: DLLevelEnum
  flLevel: DownloadMaxBrLevelEnum
  rscl: null
  freeTrialPrivilege: FreeTrialPrivilege
  chargeInfoList: ChargeInfoList[] | null
}

interface ChargeInfoList {
  rate: number
  chargeUrl: null
  chargeMessage: null
  chargeType: number
}

enum DLLevelEnum {
  Exhigh = 'exhigh',
  Lossless = 'lossless',
  Standard = 'standard'
}

enum DownloadMaxBrLevelEnum {
  Exhigh = 'exhigh',
  Lossless = 'lossless',
  None = 'none'
}

interface FreeTrialPrivilege {
  resConsumable: boolean
  userConsumable: boolean
  listenType: null
}

interface DelCloudDisk {
  succIds: number[]
  failIds: any[]
  code: number
}

//============================== 用户信息 ==============================//
interface IUserInfo extends LoginQrCheck {}

//============================== 验证码返回 ==============================//
interface CaptchaResponse extends HttpResponse<boolean> {
  message?: string
}
