import axios, { AxiosError } from 'axios'
import type { Customer } from '../types/Customer'

const API_URL = 'http://localhost:5000/customers'

export const getCustomers = async (): Promise<Customer[]> => {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get<Customer[]>(`${API_URL}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError.response?.data || 'Error loading customers'
  }
}

export const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`${API_URL}/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError.response?.data || 'Error deleting customer'
  }
}

export const updateCustomer = async (
  customerId: string,
  updatedData: Partial<Customer>,
): Promise<void> => {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`${API_URL}/${customerId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError.response?.data || 'Error updating customer'
  }
}

export const addCustomer = async (customerData: Customer) => {
  try {
    const token = localStorage.getItem('token')
    await axios.post('http://localhost:5000/customers', customerData, {
      headers: { Authorization: `Bearer ${token}` },
    })
  } catch (error) {
    const axiosError = error as AxiosError
    throw axiosError.response?.data || 'Error adding customer'
  }
}
