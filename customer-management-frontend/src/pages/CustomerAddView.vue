<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addCustomer } from '@/services/customerService'

const companyName = ref('')
const firstName = ref('')
const lastName = ref('')
const type = ref<'DEALER' | 'COMPANY' | 'PRIVATE'>('DEALER')
const zip = ref('')
const street = ref('')
const city = ref('')
const country = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleAddCustomer = async () => {
  try {
    await addCustomer({
      _id: '',
      name: firstName.value + ' ' + lastName.value,
      type: type.value,
      contactPersons: [
        { firstName: firstName.value, lastName: lastName.value, email: '', phone: '' },
      ],
      addresses: [
        {
          companyName: companyName.value,
          country: country.value,
          city: city.value,
          postalCode: zip.value,
          street: street.value,
        },
      ],
    })

    router.push('/customers') // Redirect to customers list
  } catch (error) {
    console.error('Error adding customer:', error)
    errorMessage.value = error as string
  }
}
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-8 rounded-lg login-card" elevation="10">
          <v-card-title class="text-h4 text-center font-weight-bold"> Add Customer </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleAddCustomer">
              <v-text-field v-model="companyName" label="Company Name" required></v-text-field>
              <v-text-field v-model="firstName" label="First Name" required></v-text-field>
              <v-text-field v-model="lastName" label="Last Name" required></v-text-field>
              <v-select
                v-model="type"
                label="Customer Type"
                :items="['DEALER', 'COMPANY', 'PRIVATE']"
                required
              ></v-select>

              <v-text-field v-model="street" label="Street" required></v-text-field>
              <v-text-field v-model="zip" label="ZIP Code" required></v-text-field>
              <v-text-field v-model="city" label="City" required></v-text-field>
              <v-text-field v-model="country" label="Country" required></v-text-field>

              <v-alert v-if="errorMessage" type="error" class="mt-4">
                {{ errorMessage }}
              </v-alert>

              <v-btn type="submit" color="primary" size="x-large" block rounded="lg" class="mt-4">
                Add Customer
              </v-btn>

              <v-btn
                color="secondary"
                size="large"
                block
                rounded="lg"
                class="mt-2"
                @click="router.push('/customers')"
              >
                Cancel
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
