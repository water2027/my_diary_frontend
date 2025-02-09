<script setup lang="ts">
import { ref } from 'vue'

import FormContainer from '@/components/FormContainer.vue'

import type { CustomFormData } from '@/components/FormContainer.vue'

import { ExamineData } from '@/api/model'
import { LoginRequest } from '@/api/user/model'
import { UserLogin } from '@/api/user/login'

import { type User, useUserStore } from '@/store/userStore'

const userStore = useUserStore()

const rememberMe = ref(false)

const formData: CustomFormData[] = [
  {
    id: 'email',
    label: '邮箱',
    value: '',
    type: 'email',
    autocomplete: 'email',
  },
  {
    id: 'password',
    label: '密码',
    value: '',
    type: 'password',
    autocomplete: 'current-password',
  },
]

const login = async () => {
  const req = new LoginRequest(formData[0].value, formData[1].value)
  if (!ExamineData(req)) {
    return
  }
  try {
    const res = await UserLogin(req)
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
</script>

<template>
  <FormContainer @submit-form="login" form-name="登录" :form-data="formData">
    <input type="checkbox" v-model="rememberMe" />记住我
    <div class="flex flex-row justify-around">
      <router-link to="/auth/register">还没账号？</router-link>
      <router-link to="/auth/reset">忘记密码了？</router-link>
    </div>
  </FormContainer>
</template>
