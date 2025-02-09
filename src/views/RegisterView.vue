<script setup lang="ts">
import FormContainer from '@/components/FormContainer.vue'

import type { CustomFormData } from '@/components/FormContainer.vue'

import { ExamineData } from '@/api/model'
import { RegisterRequest, SendCodeRequest } from '@/api/user/model'

import { UserRegister } from '@/api/user/register'
import { SendCode } from '@/api/user/sendCode'

import { type User, useUserStore } from '@/store/userStore'

const userStore = useUserStore()

const formData: CustomFormData[] = [
  {
    id: 'email',
    label: '邮箱',
    value: '',
    type: 'email',
    autocomplete: 'email',
  },
  {
    id: 'username',
    label: '用户名',
    value: '',
    type: 'text',
  },
  {
    id: 'password',
    label: '密码',
    value: '',
    type: 'password',
    autocomplete: 'current-password',
  },
  {
    id: 'password2',
    label: '确认密码',
    value: '',
    type: 'password',
  },
  {
    id: 'code',
    label: '验证码',
    value: '',
    type: 'text',
  },
]

const register = async () => {
  const req = new RegisterRequest(
    formData[0].value,
    formData[1].value,
    formData[2].value,
    formData[3].value,
    formData[4].value,
  )
  if (!ExamineData(req)) {
    return
  }
  try {
    const res = await UserRegister(req)
    const user: User = {
      email: res.email,
      username: res.username,
      token: res.token,
    }
    userStore.setUser(user)
  } catch (e) {
    console.error(e)
  }
}

const sendVCode = async () => {
  const req = new SendCodeRequest(formData[0].value)
  if (!ExamineData(req)) {
    return
  }
  try {
    await SendCode(req)
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <FormContainer @submit-form="register" form-name="注册" :form-data="formData">
    <div class="flex flex-row justify-around">
      <router-link to="/auth/login">已有账号？</router-link>
    </div>
    <button
      @click="sendVCode"
      class="w-full h-10 bg-[#eb6b26] text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b] disabled:bg-zinc-600"
    >
      发送验证码
    </button>
  </FormContainer>
</template>
