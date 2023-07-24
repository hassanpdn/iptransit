<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg :src="authV1TopShape" class="auth-v1-top-shape d-none d-sm-block" />

      <!-- 👉 Bottom shape -->
      <VImg :src="authV1BottomShape" class="auth-v1-bottom-shape d-none d-sm-block" />

      <!-- 👉 Auth Card -->
      <VCard class="auth-card pa-4" max-width="448">
        <VCardItem class="justify-center">
          <VCardTitle class="font-weight-bold text-h5 py-1">
            <VNodeRenderer :nodes="themeConfig.app.logo" />
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-1">
          <h5 class="text-h5 font-weight-semibold mb-1">
            Welcome to {{ themeConfig.app.title }}! 👋🏻
          </h5>
          <p class="mb-0">
            {{ $t('Please sign-in to your account') }}
          </p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="handleSubmit">
            <VRow>
              <!-- username -->
              <VCol cols="12">
                <VTextField hide-details="auto" variant="outlined" density="comfortable"  v-model="form.username" label="Username" :rules="[requiredValidator]"
                  :error-messages="errors.username" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <!-- <VTextField hide-details="auto" variant="outlined" density="comfortable"  v-model="form.password" label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  :rules="[requiredValidator, passwordValidator, minLengthValidator(form.password, 8), maxLengthValidator(form.password, 16)]" :error-messages="errors.password"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" /> -->
                <VTextField hide-details="auto" variant="outlined" density="comfortable"  v-model="form.password" label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  :rules="[requiredValidator, passwordValidator]" :error-messages="errors.password"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />

                <!-- login button -->
                <VBtn color="primary" class="mt-6" block type="submit" @click="handleSubmit">
                  Login
                </VBtn>
              </VCol>

              <!-- Create account -->
              <VCol cols="12" class="text-center">
                <span>🎉 One click to your personalized experience</span>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<script setup>
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg'

import { useAuthStore } from '@/store/useAuthStore'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import {
maxLengthValidator,
minLengthValidator,
passwordValidator,
requiredValidator
} from '@validators'

const refVForm = ref()

const isPasswordVisible = ref(false)

const errors = ref({
  username: undefined,
  password: undefined,
})

const form = ref({
  username: 'contoso',
  password: 'contoso',
  remember: false,
})

const authStore = useAuthStore()

const handleSubmit = e => {
  e.preventDefault()

  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
  })
}

async function login() {
  await authStore.login(form.value.username, form.value.password)
}
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  requiresAuth: false
</route>
