<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VImg :src="authV1TopShape" class="auth-v1-top-shape d-none d-sm-block" />

      <!-- 👉 Bottom shape -->
      <VImg :src="authV1BottomShape" class="auth-v1-bottom-shape d-none d-sm-block" />

      <!-- 👉 Auth card -->
      <VCard class="auth-card pa-4" max-width="448">
        <VCardItem class="justify-center">
          <VCardTitle class="font-weight-bold text-h5 py-1">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-2">
          <h3 class="text-h5 font-weight-semibold mb-1 text-center">
            Adventure starts here 🚀
          </h3>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="handleSubmit">
            <VRow>
              <!-- Company Name -->
              <VCol v-if="isCompany" cols="12">
                <VTextField hide-details="auto" variant="outlined" density="comfortable" v-model="form.company" label="Company Name"
                  :rules="[requiredValidator]" />
              </VCol>

              <!-- email -->
              <VCol cols="12">
                <VTextField hide-details="auto" variant="outlined" density="comfortable" v-model="form.username"
                  label="Username" :rules="[requiredValidator]"
                  :error-messages="errors.username" />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField hide-details="auto" variant="outlined" density="comfortable" v-model="form.password"
                  label="Password" :type="isPasswordVisible ? 'text' : 'password'"
                  :rules="[requiredValidator, passwordValidator]"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible" />

                <VCol cols="12" class="">
                  <v-radio-group hide-details v-model="isCompany" inline>
                    <v-radio color="primary" label="User" :value="false"></v-radio>
                    <v-radio color="primary" label="Company" :value="true"></v-radio>
                  </v-radio-group>
                </VCol>
                
                <VBtn color="primary" block type="submit" @click="handleSubmit">
                  Sign up
                </VBtn>
              </VCol>


              <!-- login instead -->
              <VCol cols="12" class="text-center text-base">
                <span>Already have an account?</span>
                <RouterLink class="text-primary ms-2" :to="{ name: 'login' }">
                  Sign in instead
                </RouterLink>
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


import { themeConfig } from '@themeConfig'
import {
  requiredValidator,
  passwordValidator
} from '@validators'


const refVForm = ref()
const authStore = useAuthStore()
const isCompany = ref(false)

const errors = ref({
  username: undefined,
  password: undefined,
})

const form = ref({
  username: 'hassan',
  password: 'Aa12345678',
  company: ""
})

const isPasswordVisible = ref(false)

const handleSubmit = e => {
  e.preventDefault()

  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      register()
  })
}

async function register() {
  await authStore.register(form.value)
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
