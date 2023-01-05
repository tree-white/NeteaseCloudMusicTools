<script setup lang="ts">
  import { getQrCodeKey, getQrCodeUrl, queryQrCodeState } from '@/apis/login'
  import userInfoStore from '@/store/userInfoStore'

  const infoStore = userInfoStore()
  const key = ref('')
  const userInfo = reactive<Partial<LoginQrCheck>>({})
  const qrCodeConfig = reactive({ isExpire: true, errorHint: '点击获取二维码', text: '', waitHint: '', avatar: '' })
  const router = useRouter()
  const isUnmounted = ref(false)

  const resetConfig = (error: string) => {
    Object.assign(qrCodeConfig, { isExpire: true, waitHint: '', errorHint: error, avatar: '' })
  }

  /** 轮询状态 */
  const pollingState = async () => {
    try {
      if (isUnmounted.value) throw '重新获取二维码'
      const { code, cookie, nickname, avatarUrl } = await queryQrCodeState({ key: key.value })
      switch (code) {
        case 800: // 二维码过期
          throw '二维码过期'
        case 801: // 等待扫码
          qrCodeConfig.waitHint = '请打开手机网易云音乐App进行扫码'
          setTimeout(() => pollingState(), 1000)
          break
        case 802: // 已扫码等待确认
          qrCodeConfig.waitHint = `${nickname} 请在手机上点击授权`
          qrCodeConfig.avatar = avatarUrl!
          Object.assign(userInfo, { cookie, nickname, avatarUrl })
          setTimeout(() => pollingState(), 2000)
          break
        case 803: // 授权成功
          Object.assign(userInfo, { cookie })
          infoStore.setUserInfo(userInfo)
          qrCodeConfig.waitHint = '授权成功,即将跳转...'
          setTimeout(() => router.push('/cloud'), 2000)
          break
      }
    } catch (error) {
      resetConfig(error as string)
    }
  }

  /** 生成二维码 */
  const generateQrCode = async () => {
    qrCodeConfig.errorHint = '生成二维码中'
    try {
      const { unikey } = await getQrCodeKey().then(r => r.data)
      if (!unikey) throw '获取二维码失败'
      key.value = unikey
      const { code, data } = await getQrCodeUrl({ key: key.value })
      if (code !== 200) throw '生成二维码失败'
      Object.assign(qrCodeConfig, {
        isExpire: false,
        waitHint: '请打开手机网易云音乐App进行扫码',
        text: data.qrurl
      })
      pollingState()
    } catch (error) {
      resetConfig(error as string)
    }
  }

  const refresh = () => {
    generateQrCode()
  }

  onBeforeUnmount(() => {
    isUnmounted.value = true
  })
  defineExpose({ generateQrCode, qrCodeConfig })
</script>

<template>
  <div class="m-scanLogin">
    <slot name="header" />
    <QrCode v-bind="qrCodeConfig" @refresh="refresh" class="my-4" />
    <slot name="footer" />
  </div>
</template>

<style lang="scss" scoped>
  .m-scanLogin {
    @apply relative flex flex-col justify-center items-center;
  }
</style>
