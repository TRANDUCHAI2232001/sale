import { createRouter, createWebHistory } from 'vue-router'
import Sale from '../views/Sale/Sale.vue'
import Warehouse from '../views/warehouse/warehouse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sale',
      name: 'sale',
      component: Sale
    },
    {
      path: '/ware-house',
      name: 'warehouse',
      component: Warehouse
    }
  ]
})

export default router
