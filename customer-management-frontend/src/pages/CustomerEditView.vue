<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCustomers, updateCustomer } from '@/services/customerService'
import type { Customer } from '@/types/Customer'

const route = useRoute()
const router = useRouter()
const customerId = route.params.id as string

const customer = ref<Customer | null>(null)
const errorMessage = ref('')
const loading = ref(true)

const loadCustomer = async () => {
  try {
    const customers = await getCustomers()
    customer.value = customers.find((c: Customer) => c._id === customerId) || null
  } catch {
    errorMessage.value = 'Error loading customer data'
  } finally {
    loading.value = false
  }
}

const saveChanges = async () => {
  if (!customer.value) return
  try {
    await updateCustomer(customerId, customer.value)
    router.push('/customers')
  } catch {
    errorMessage.value = 'Error updating customer'
  }
}

onMounted(loadCustomer)
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card class="pa-6 rounded-lg edit-card" elevation="10">
          <v-card-title class="text-h4 text-center font-weight-bold"> Edit Customer </v-card-title>

          <v-card-text v-if="!loading">
            <v-form @submit.prevent="saveChanges">
              <v-text-field
                v-model="customer!.addresses[0].companyName"
                label="Company Name"
                variant="outlined"
                density="comfortable"
                required
              ></v-text-field>

              <v-text-field
                v-model="customer!.contactPersons[0].firstName"
                label="First Name"
                variant="outlined"
                density="comfortable"
                required
              ></v-text-field>

              <v-text-field
                v-model="customer!.contactPersons[0].lastName"
                label="Last Name"
                variant="outlined"
                density="comfortable"
                required
              ></v-text-field>

              <v-select
                v-model="customer!.type"
                label="Customer Type"
                :items="['DEALER', 'COMPANY', 'PRIVATE']"
                variant="outlined"
              ></v-select>

              <v-text-field
                v-model="customer!.addresses[0].city"
                label="City"
                variant="outlined"
                density="comfortable"
              ></v-text-field>

              <v-text-field
                v-model="customer!.addresses[0].postalCode"
                label="ZIP Code"
                variant="outlined"
                density="comfortable"
              ></v-text-field>

              <v-text-field
                v-model="customer!.addresses[0].country"
                label="Country"
                variant="outlined"
                density="comfortable"
              ></v-text-field>

              <v-alert v-if="errorMessage" type="error" class="mt-4">
                {{ errorMessage }}
              </v-alert>

              <v-btn type="submit" color="primary" size="x-large" block rounded="lg" class="mt-4">
                Save Changes
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

          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
            class="mx-auto"
          ></v-progress-circular>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.edit-card {
  background: white;
  border-radius: 12px;
}
</style>
