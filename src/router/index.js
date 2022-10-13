import { createRouter, createWebHistory } from 'vue-router'
import Sale from '../views/Sale/Sale.vue'
import Warehouse from '../views/warehouse/warehouse.vue'
import Revenue from '@/views/Revenue/Revenue.vue'
import LogIn from '@/components/LogIn.vue'
import Welcome from '@/components/welcome.vue'
import AddUser from '@/components/addUser.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'LogIn' } },
    {
      path: '/sale',
      name: 'sale',
      component: Sale
    },
    {
      path: '/ware-house',
      name: 'warehouse',
      component: Warehouse
    },
    {
      path: '/Revenue',
      name: 'Revenue',
      component: Revenue
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/Welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/AddUser',
      name: 'AddUser',
      component: AddUser
    }
  ]
})

export default router
