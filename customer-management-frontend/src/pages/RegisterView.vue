<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/authService'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  try {
    await register(firstName.value, lastName.value, email.value, password.value)
    router.push('/')
  } catch (error) {
    errorMessage.value = error as string
  }
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8 rounded-lg login-card" elevation="10">
          <v-card-title class="text-h4 text-center font-weight-bold"> Register </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleRegister">
              <v-text-field
                v-model="firstName"
                label="First Name"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-account"
                required
              ></v-text-field>

              <v-text-field
                v-model="lastName"
                label="Last Name"
                variant="outlined"
                density="comfortable"
                color="primary"
                rounded="lg"
                prepend-inner-icon="mdi-account"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="Email"
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

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
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
                Register
              </v-btn>

              <v-btn
                color="secondary"
                size="large"
                block
                rounded="lg"
                class="mt-2"
                @click="router.push('/')"
              >
                Back to Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-card {
  background: white;
  border-radius: 12px;
}
</style>
