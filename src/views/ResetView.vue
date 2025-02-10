<script setup lang="ts">
import FormContainer from '@/components/FormContainer.vue'

import type { CustomFormData } from '@/components/FormContainer.vue'

import { ExamineData } from '@/api/model'
import { UpdatePasswordRequest, SendCodeRequest } from '@/api/user/model'

import { UpdatePassword } from '@/api/user/updatePassword'
import { SendCode } from '@/api/user/sendCode'

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
    label: '确认密码',
    value: '',
    type: 'password',
    autocomplete: 'current-password',
  },
  {
    id: 'password2',
    label: '密码',
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

const reset = async () => {
  const req = new UpdatePasswordRequest(
    formData[0].value,
    formData[1].value,
    formData[2].value,
    formData[3].value,
  )
  if (!ExamineData(req)) {
    return
  }
  try {
    await UpdatePassword(req)
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
  <FormContainer @submit-form="reset" form-name="重置密码" :form-data="formData">
    <div class="flex flex-row justify-around">
      <router-link to="/auth/login">没忘记</router-link>
    </div>
    <button
      type="button"
      @click="sendVCode"
      class="w-full h-10 bg-[#eb6b26] text-white border-0 text-lg cursor-pointer mt-5 rounded-[20px] flex justify-center items-center hover:bg-[#ff7e3b] disabled:bg-zinc-600"
    >
      发送验证码
    </button>
  </FormContainer>
</template>
