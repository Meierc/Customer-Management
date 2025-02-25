<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'
import type { VBtn } from 'vuetify/components'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    await login(email.value, password.value)
    router.push('/customers')
  } catch (error) {
    errorMessage.value = error as string
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container fluid class="fill-height d-flex justify-center align-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-6 rounded-lg" elevation="10">
          <v-card-title class="text-h4 text-center font-weight-bold"> Login </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="email"
                label="E-Mail"
                type="email"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-lock"
                required
              ></v-text-field>

              <v-alert
                v-if="errorMessage"
                type="error"
                class="mt-4"
                border="start"
                color="red"
                density="compact"
              >
                {{ errorMessage }}
              </v-alert>

              <v-btn type="submit" color="primary" size="x-large" block rounded="lg" class="mt-4">
                Login
              </v-btn>
              <v-divider>or</v-divider>
              <v-btn
                color="secondary"
                size="large"
                block
                rounded="lg"
                class="mt-2"
                @click="router.push('/register')"
              >
                Register
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  min-height: 100vh;
}
</style>
