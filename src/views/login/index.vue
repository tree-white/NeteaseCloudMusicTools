<script setup lang="ts">
  import userInfoStore from '@/store/userInfoStore'
  import ScanLogin from './components/ScanLogin.vue'

  const ScanLoginRef = ref<typeof ScanLogin>()
  const refresh = () => {
    ScanLoginRef.value!.generateQrCode()
  }
  const tips = `
  <div>
    <h2 class="mb-2 text-lg text-center">可能获取二维码失败原因</h2>
    <ol class='list-decimal pl-4'>
      <li>网络接口为免费提供，存在不稳定情况 (<span class="text-orange-400">可在右上角设置中配置</span>)</li>
      <li>使用了代理或VPN改变了自身IP,该情况会导致被网易风控为异常请求 (<span class="text-orange-400">可在右上角设置中开启"realIp"即可</span>)</li>
    </ol>
  </div>`
</script>

<template>
  <div class="login">
    <Setting class="absolute top-5 text- right-5 z-10" @refresh="refresh" />
    <ScanLogin ref="ScanLoginRef">
      <template #header>
        <Tips :content="tips" placement="top" />
      </template>
      <template #footer>
        <el-button
          v-if="ScanLoginRef?.qrCodeConfig.isExpire && userInfoStore().cookie"
          type="success"
          @click="$router.push('/cloud')"
        >
          已有账号登录,点击进入云盘
        </el-button>
      </template>
    </ScanLogin>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    @apply w-full min-h-[100vh];
  }
</style>
