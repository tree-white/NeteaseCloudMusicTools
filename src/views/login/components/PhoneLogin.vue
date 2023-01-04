<template>
  <div v-loading="loading">
    <el-form :model="form" ref="formRef" label-width="65px" status-icon :rules="rules" class="w-[350px]">
      <el-form-item label="账号" prop="account">
        <section class="flex">
          <el-input v-model="form.account" :placeholder="`输入${accountType}号`" clearable tabindex="1" />
          <el-radio-group class="!flex-nowrap ml-1" v-model="accountType" @change="form.account = ''">
            <el-radio-button label="手机" />
            <el-radio-button label="邮箱" :disabled="props.type !== 'password'" />
          </el-radio-group>
        </section>
      </el-form-item>

      <el-form-item label="验证码" v-if="props.type === 'captcha'" prop="captcha">
        <el-input v-model="form.captcha" placeholder="输入验证码" clearable tabindex="2">
          <template #append>
            <el-button
              class="w-[160px]"
              :class="{ '!bg-green-400 !text-white': !isCooling }"
              :disabled="isCooling || captcha === '获取验证码中'"
              @click="getCode"
            >
              {{ captcha }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item label="密码" v-else prop="password">
        <el-input v-model="form.password" placeholder="输入密码" type="password" clearable tabindex="2" />
      </el-form-item>
    </el-form>

    <section class="flex justify-center items-center w-full">
      <el-button class="w-1/3" size="large" type="primary" @click="onSubmit">登录</el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
  import utils from '@/common/utils'
  import { FormInstance, FormRules } from 'element-plus'
  import { phoneLogin, eMailLogin, getCaptcha } from '@/apis/login'
  import userInfoStore from '@/store/userInfoStore'
  import systemStore from '@/store/systemStore'

  interface IForm extends Partial<PhoneLoginData> {
    account: string
  }

  const infoStore = userInfoStore()
  const system = systemStore()
  const props = withDefaults(defineProps<{ type?: string }>(), {
    type: 'password'
  })

  const loading = ref(false)
  const router = useRouter()
  const form = reactive<IForm>({ account: '' })
  const accountType = ref<'手机' | '邮箱'>('手机')
  const formRef = ref<FormInstance>()
  const captcha = ref<string>(`获取验证码`)
  const isCooling = ref(false)
  /** 表单规则 */
  const rules = reactive<FormRules>({
    account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  })
  /** 登录 */
  const onSubmit = async () => {
    console.log('点击了登录')
    try {
      await formRef.value?.validate()
      console.log('通过')
      loading.value = true

      const phone = form.account
      const email = form.account
      const md5_password = utils.md5Encrypt(form.password ?? '')
      console.log('类型=>', typeof form.captcha)

      const captcha = form.captcha

      let result =
        props.type === 'captcha'
          ? await phoneLogin({ phone, captcha })
          : accountType.value === '手机'
          ? await phoneLogin({ phone, md5_password })
          : await eMailLogin({ email, md5_password })
      console.log('>>>>>> result=>', result)
      if (result.code !== 200) throw '登录失败'
      infoStore.setUserInfo({ cookie: result.cookie })
      loading.value = false
      ElMessage.success('登录成功')
      router.push('/cloud')
    } catch (error) {
      console.log('>>>>>> 未通过=>', error)
      ElMessage.error('登录失败')
      loading.value = false
    }
  }

  /** 获取验证码 */
  const getCode = async () => {
    if (!form.account || !/^(?:(?:\+|00)86)?1\d{10}$/.test(form.account)) {
      ElMessage.warning('请先输入正确手机号')
      return
    }
    try {
      captcha.value = '获取验证码中'
      const { code, data, message } = await getCaptcha(form.account)
      if (code === 200 && data) ElMessage.success(`尾号「${form.account.slice(-4)}」验证码已发送`)
      else throw message
    } catch (error) {
      console.log('>>>>>> error=>', error)
      ElMessage.error('获取验证码失败,请稍后再试')
    } finally {
      utils.saveStorage('captchaCooling', Date.now())
      runCooling()
    }
  }
  /** 倒计时 */
  const runCooling = (coolingTime?: number | null) => {
    coolingTime = utils.getStorage('captchaCooling')
    if (coolingTime === null) return
    const cooling = system.coolingTime - dayjs().diff(coolingTime, 'second')

    if (cooling > 0) {
      isCooling.value = true
      captcha.value = `请 ${cooling} 秒后再获取`
      setTimeout(() => runCooling(coolingTime), 1000)
    } else {
      isCooling.value = false
      captcha.value = '获取验证码'
    }
  }
  watchEffect(() => {
    console.log('监听props类型=>', props.type)
    formRef.value?.clearValidate()
    if (props.type === 'captcha') {
      accountType.value = '手机'
    }
  })
  runCooling()
</script>

<style scoped lang="scss"></style>
