<script setup lang="ts">
  import type { UploadFile, UploadFiles, UploadInstance, UploadRequestOptions, UploadUserFile } from 'element-plus'
  import { uploadCloudDisk } from '@/apis/cloud'
  import { AxiosProgressEvent } from 'axios'

  const emit = defineEmits<{
    (event: 'finished'): void
  }>()

  const uploadList = ref<UploadUserFile[]>([])
  const uploadRef = ref<UploadInstance>()

  const upload = async (options: UploadRequestOptions) => {
    const curFile = uploadList.value.find(file => file.raw === options.file)!
    curFile.status = 'uploading'
    const data = new FormData()
    data.append('songFile', options.file)
    await uploadCloudDisk({
      data,
      onUploadProgress: (evt: AxiosProgressEvent) => {
        const { progress = 0 } = evt
        curFile.percentage = progress === 1 ? 99.99 : +(progress * 100).toFixed(2)
      }
    })
  }

  const uploadConfig = reactive({
    drag: true,
    multiple: true,
    'auto-upload': true,
    accept: '.mp3',
    'http-request': upload,
    'on-error': (error: Error, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
      uploadList.value.push(uploadFile)
    },
    'on-success': (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
      if (uploadFiles.every(f => f.status === 'success')) {
        emit('finished')
        uploadRef.value?.clearFiles()
      }
    }
  })

  const uploadAgain = () => {
    uploadRef.value?.clearFiles(['success'])
    uploadList.value.forEach(f => {
      f.status === 'fail' && (f.status = 'ready')
    })
    uploadRef.value?.submit()
  }
</script>

<template>
  <div>
    <el-upload ref="uploadRef" v-model:file-list="uploadList" v-bind="uploadConfig">
      <i-ep-upload-filled class="el-icon--upload inline"></i-ep-upload-filled>
      <div class="el-upload__text">
        将音频文件拖到此处或
        <em>点击上传</em>
        <br />
        <b class="text-orange-500">※ 仅支持 mp3 格式,大小控制在5M以内,否则可能会失败<br/>如果选择界面在窗口后面,请先分离uTools,再选择</b>
        <br />
        <el-button
          v-show="uploadList.some(f => f.status === 'fail')"
          class="mt-2"
          type="success"
          size="default"
          @click.stop="uploadAgain"
        >
          重新上传失败歌曲
        </el-button>
      </div>
      <template #file></template>
    </el-upload>
  </div>
</template>

<style lang="scss" scoped></style>
