<script setup lang="ts">
  import userInfoStore from '@/store/userInfoStore'
  import ScanLogin from './components/ScanLogin.vue'
</script>

<template>
  <div class="login">
    <Setting class="absolute top-5 right-5 z-10" />
    <ScanLogin>
      <template #header>
        <el-button v-if="userInfoStore().cookie" type="success" class="mb-4" @click="$router.push('/cloud')">
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
