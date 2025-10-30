<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">个人智能体</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- 用户信息 -->
            <div class="flex items-center gap-3">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ user?.full_name || user?.username }}</p>
                <p class="text-xs text-gray-500">{{ user?.email }}</p>
              </div>
              <div class="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {{ getInitials(user?.username || '') }}
              </div>
            </div>
            
            <!-- 退出按钮 -->
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 欢迎卡片 -->
      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
        <h2 class="text-3xl font-bold mb-2">欢迎回来，{{ user?.full_name || user?.username }}！</h2>
        <p class="text-blue-100">这是你的个人智能体控制台</p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">账户状态</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ user?.is_active ? '已激活' : '未激活' }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">用户权限</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ user?.is_superuser ? '管理员' : '普通用户' }}
              </p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 mb-1">注册时间</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatDate(user?.created_at) }}
              </p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 用户信息详情 -->
      <div class="bg-white rounded-xl shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">个人信息</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-3 border-b">
            <span class="text-gray-600">用户名</span>
            <span class="font-medium text-gray-900">{{ user?.username }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b">
            <span class="text-gray-600">邮箱</span>
            <span class="font-medium text-gray-900">{{ user?.email }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b">
            <span class="text-gray-600">全名</span>
            <span class="font-medium text-gray-900">{{ user?.full_name || '未设置' }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b">
            <span class="text-gray-600">用户 ID</span>
            <span class="font-medium text-gray-900">{{ user?.id }}</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-gray-600">最后更新</span>
            <span class="font-medium text-gray-900">{{ formatDateTime(user?.updated_at) }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storage } from '@/utils/storage'
import type { UserResponse } from '@/api/auth'

const router = useRouter()
const user = ref<UserResponse | null>(null)

// 获取用户首字母
const getInitials = (name: string): string => {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
}

// 格式化日期
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}

// 格式化日期时间
const formatDateTime = (dateString: string | undefined): string => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 退出登录
const handleLogout = () => {
  storage.clear()
  router.push('/login')
}

// 页面加载时获取用户信息
onMounted(() => {
  const userData = storage.getUser()
  if (!userData) {
    router.push('/login')
    return
  }
  user.value = userData
})
</script>

<style scoped>
/* 如果需要额外的样式，可以在这里添加 */
</style>

