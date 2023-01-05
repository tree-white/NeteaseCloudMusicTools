<script setup lang="ts">
  import systemStore from '@/store/systemStore'
  import userInfoStore from '@/store/userInfoStore'
  const system = systemStore()
  const userInfo = userInfoStore()

  const emit = defineEmits<{ (event: 'refresh'): void }>()
  const description = {
    changeUrl:
      '当提供的接口不稳定时,可以切换其他备用接口<br/><b class="text-[#f90]">如果使用了自定义地址,请先删除自定义地址才能使用默认提供的接口</b>',
    requestUrl: '把请求接口地址改成自己部署的接口',
    realIp: '在代理模式下,网易接口会判断环境为"异常环境",需要开启国内IP请求'
  }
  const showSetting = ref<boolean>(false)
  const form = reactive<Partial<ImportMetaEnv>>({ VITE_BASE_URL: '', VITE_USE_REAL_IP: system.env.VITE_USE_REAL_IP })

  const confirm = () => {
    system.saveEnvParams(form)
    showSetting.value = false
    emit('refresh')
  }
  const initial = () => {
    for (const key in form) {
      if (Object.prototype.hasOwnProperty.call(form, key)) {
        form[key] = system.env[key]
      }
    }
  }
  const reset = () => {
    system.resetSystemConfig()
    initial()
    showSetting.value = false
    emit('refresh')
  }
  const changeUrl = () => {
    if (!!form.CUSTOM_BASE_URL) {
      ElMessage.error('请先清空自定义接口')
      return
    }
    form.VITE_BASE_URL = system.nextReserveUrl()
    system.saveEnvParams(form)
    ElMessage.success('切换接口成功')
  }

  initial()
</script>

<template>
  <div class="setting">
    <el-dropdown class="icon" trigger="hover">
      <i-ep-Setting class="outline-none" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="showSetting = true">设置</el-dropdown-item>
          <el-dropdown-item @click="userInfo.logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dialog v-model="showSetting" title="设置配置" width="80%" @closed="initial">
      <el-form :model="form">
        <el-form-item>
          <template #label>
            <section class="label">
              <span>切换接口</span>
              <Tips :content="description.changeUrl" placement="auto" />
            </section>
          </template>
          <el-button type="success" @click="changeUrl" :disabled="!!form.CUSTOM_BASE_URL">切换备用接口地址</el-button>
        </el-form-item>
        <el-form-item>
          <template #label>
            <section class="label">
              <span>自定义接口</span>
              <Tips :content="description.requestUrl" placement="auto" />
            </section>
          </template>
          <section class="flex gap-2 w-full">
            <el-input class="flex-grow" v-model="form.CUSTOM_BASE_URL" autocomplete="off" clearable />
          </section>
        </el-form-item>
        <el-form-item>
          <template #label>
            <section class="label">
              <span>使用RealIP</span>
              <Tips :content="description.realIp" placement="auto" />
            </section>
          </template>
          <el-switch v-model="form.VITE_USE_REAL_IP" active-color="#13ce66" inactive-text="否" active-text="是" />
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

    .label {
      @apply flex items-center;

      > span {
        @apply w-[80px] text-right;
      }
    }
  }
</style>
