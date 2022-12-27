<script setup lang="ts">
  import systemStore from '@/store/systemStore'
  import userInfoStore from '@/store/userInfoStore'
  const system = systemStore()
  const userInfo = userInfoStore()

  const emit = defineEmits<{ (event: 'refresh'): void }>()
  const showSetting = ref<boolean>(false)
  const form = ref({ baseUrl: '' })

  const confirm = () => {
    system.setEnvBaseUrl(form.value.baseUrl)
    showSetting.value = false
    emit('refresh')
  }
  const reset = () => {
    form.value.baseUrl = ''
    system.resetSystemConfig()
    showSetting.value = false
    emit('refresh')
  }
</script>

<template>
  <div class="setting">
    <el-dropdown class="icon">
      <i-ep-Setting class="outline-none" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="showSetting = true">设置</el-dropdown-item>
          <el-dropdown-item v-if="$route.name !== 'login'" @click="userInfo.logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog v-model="showSetting" title="设置配置" width="80%">
      <el-form :model="form">
        <el-form-item label="请求地址">
          <el-input v-model="form.baseUrl" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reset">还原</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .setting {
    @apply flex justify-center items-center;
    > .icon {
      @apply text-2xl text-gray-600 hover:cursor-pointer hover:text-blue-600 duration-300 hover:font-bold hover:rotate-180;
    }
  }
</style>
