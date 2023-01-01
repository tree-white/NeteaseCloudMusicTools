import http from '@/plugins/axios'

/** 云盘上传 */
export const uploadCloudDisk = (options: UploadCloudDisk) =>
  http.request({
    url: '/cloud',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options
  })

/** 云盘查询 */
export const getCloudDiskList = (limit?: number, offset?: number) =>
  http.request<null, QueryCloudDisk>({
    url: '/user/cloud',
    method:'POST',
    data: { limit, offset }
  })

/** 云盘删除 */
export const delCloudDisk = (id: string) =>
  http.request<null, DelCloudDisk>({
    url: '/user/cloud/del',
    params: { id }
  })
