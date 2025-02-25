import { createRouter, createWebHistory } from 'vue-router'
import CustomersView from '@/pages/CustomersView.vue'
import LoginView from '@/pages/LoginView.vue'
import CustomerEditView from '@/pages/CustomerEditView.vue'
import RegisterView from '@/pages/RegisterView.vue'
import CustomerAddView from '@/pages/CustomerAddView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/customers',
    component: CustomersView,
    meta: { requiresAuth: true },
  },
  { path: '/customers/new', component: CustomerAddView },
  {
    path: '/customers/:id',
    component: CustomerEditView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/') // Redirect to login page
  } else {
    next()
  }
})

export default router
