<script setup lang="ts">
  import userInfoStore from '@/store/userInfoStore'
  import ScanLogin from './components/ScanLogin.vue'
  import PhoneLogin from './components/PhoneLogin.vue'

  const ScanLoginRef = ref<InstanceType<typeof ScanLogin>>()
  const refresh = () => {
    ScanLoginRef.value?.generateQrCode()
  }
  const tips = `
  <div>
    <h2 class="mb-2 text-lg text-center">温馨提示</h2>
    <ol class='list-decimal pl-4'>
      <li>推荐用扫码,安全稳定,正常不会被频繁换接口👍🏻</li>
      <li>账密登录的密码会进行MD5加密,不会明文请求</li>
      <li>网络接口为免费提供，存在不稳定情况 (<span class="text-orange-400">可在右上角设置中配置自己的接口</span>)</li>
      <li>使用了代理或VPN改变了自身IP,该情况会导致被网易风控为异常请求 (<span class="text-orange-400">可在右上角设置中开启"realIp"即可</span>)</li>
      <li>账密登录接口网易经常替换接口,如果登录不上表示又被替换接口了 (<span class="text-orange-400">等更新</span>)</li>
      <li>能获取验证码但登录失败,表示网易又更改登录接口了 (<span class="text-orange-400">等更新</span>)</li>
    </ol>
  </div>`
  const loginType = ref('扫码登录')
</script>

<template>
  <div class="login">
    <Setting class="absolute top-5 text- right-5 z-10" @refresh="refresh" />

    <section>
      <el-card shadow="always" :body-style="{ padding: '20px' }">
        <template #header>
          <section class="w-[400px] flex justify-center items-center relative px-10">
            <el-radio-group v-model="loginType">
              <el-radio-button label="扫码登录" />
              <el-radio-button label="账密登录" />
              <el-radio-button label="验证码登录" />
            </el-radio-group>
            <Tips :content="tips" placement="top" class="absolute right-0 top-1/2 -translate-y-1/2" />
          </section>
        </template>

        <!-- 扫码登录 -->
        <ScanLogin v-if="loginType === '扫码登录'" ref="ScanLoginRef">
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
        <!-- 账密登录 -->
        <PhoneLogin v-else :type="loginType === '账密登录' ? 'password' : 'captcha'" />
      </el-card>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    @apply w-full min-h-[100vh] relative;

    > section {
      @apply absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center items-center gap-4;

      ::v-deep .el-card__header {
        @apply text-center;
      }
    }
  }
</style>
