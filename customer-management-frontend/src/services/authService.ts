import axios, { AxiosError } from 'axios'

const API_URL = 'http://localhost:5000/auth'

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    })

    const { token } = response.data

    if (!token) {
      throw new Error('No token received')
    }

    sessionStorage.setItem('token', token)
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError
    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message || 'Login has failed!'
    throw errorMessage
  }
}
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  try {
    await axios.post(`${API_URL}/register`, {
      firstName,
      lastName,
      email,
      password,
    })
  } catch (error) {
    const axiosError = error as AxiosError
    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message || 'Registration has failed!'
    throw errorMessage
  }
}

export const logout = () => {
  sessionStorage.removeItem('token')
  window.location.reload()
}
