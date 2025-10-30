import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { storage } from '@/utils/storage'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫：检查登录状态
router.beforeEach((to, _from, next) => {
  const token = storage.getToken()
  const requiresAuth = to.meta.requiresAuth !== false

  // 如果页面需要认证但用户未登录
  if (requiresAuth && !token) {
    next('/login')
  }
  // 如果用户已登录但访问登录页，重定向到首页
  else if (to.path === '/login' && token) {
    next('/')
  }
  // 其他情况正常放行
  else {
    next()
  }
})

export default router

