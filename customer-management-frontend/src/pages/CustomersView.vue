<!-- eslint-disable vue/valid-v-slot -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCustomers, deleteCustomer } from '@/services/customerService'
import type { Customer } from '@/types/Customer'
import { useRouter } from 'vue-router'
import { logout } from '@/services/authService'

const router = useRouter()
const customers = ref<Customer[]>([])
const loading = ref(true)

const loadCustomers = async () => {
  try {
    customers.value = await getCustomers()
  } catch (error) {
    console.error('Error loading customers:', error)
  } finally {
    loading.value = false
  }
}

const confirmDialog = ref(false)
const customerToDelete = ref<string | null>(null)

const openDeleteDialog = (id: string) => {
  customerToDelete.value = id
  confirmDialog.value = true
}

const handleDelete = async (id: string | null) => {
  if (!id) return
  try {
    await deleteCustomer(id)
    customers.value = customers.value.filter((customer) => customer._id !== id)
    confirmDialog.value = false // Close dialog
  } catch (error) {
    console.error('Error deleting customer:', error)
  }
  loadCustomers()
}

onMounted(loadCustomers)

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" elevation="4">
      <v-toolbar-title>Customer Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="elevated" color="error" @click="handleLogout">Logout</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-btn variant="elevated" color="success" @click="router.push('/customers/new')">
          + Add Customer
        </v-btn>
        <v-card class="pa-4">
          <v-data-table
            v-if="!loading"
            :items="customers"
            :headers="[
              { title: 'Customer Number', key: 'intNr' },
              { title: 'Company Name', key: 'addresses[0].companyName' },
              { title: 'First Name', key: 'contactPersons[0].firstName' },
              { title: 'Last Name', key: 'contactPersons[0].lastName' },
              { title: 'Country', key: 'addresses[0].country' },
              { title: 'City', key: 'addresses[0].city' },
              { title: 'Actions', key: 'actions', sortable: false },
            ]"
            class="elevation-2"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn color="primary" variant="tonal" size="small" :to="`/customers/${item._id}`">
                Edit
              </v-btn>
              <v-btn
                color="error"
                variant="tonal"
                size="small"
                class="ml-2"
                @click="openDeleteDialog(item._id)"
              >
                Delete
              </v-btn>
            </template>
          </v-data-table>

          <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
        </v-card>
      </v-container>

      <v-dialog v-model="confirmDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Are you sure?</v-card-title>
          <v-card-text>
            This action cannot be undone. Do you really want to delete this customer?
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="confirmDialog = false">Cancel</v-btn>
            <v-btn color="error" @click="handleDelete(customerToDelete!)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </v-app>
</template>
