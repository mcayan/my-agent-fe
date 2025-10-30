<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
    <!-- 顶部导航栏 -->
    <nav class="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot :size="24" class="text-white" />
            </div>
            <h1 class="text-2xl font-bold text-white">个人智能体</h1>
          </div>
          
          <div class="flex items-center gap-4">
            <!-- 用户信息 -->
            <div class="flex items-center gap-3">
              <div class="text-right hidden md:block">
                <p class="text-sm font-medium text-gray-200">{{ user?.full_name || user?.username }}</p>
                <p class="text-xs text-gray-400">{{ user?.email }}</p>
              </div>
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {{ getInitials(user?.username || '') }}
              </div>
            </div>
            
            <!-- 退出按钮 -->
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition flex items-center gap-2"
            >
              <LogOut :size="16" />
              <span class="hidden sm:inline">退出登录</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- 欢迎卡片 -->
      <div class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
        <div class="absolute inset-0 bg-grid-white/10"></div>
        <div class="relative">
          <div class="flex items-center gap-3 mb-4">
            <Sparkles :size="32" class="text-yellow-300" />
            <h2 class="text-3xl font-bold">欢迎回来，{{ user?.full_name || user?.username }}！</h2>
          </div>
          <p class="text-blue-100 flex items-center gap-2">
            <Zap :size="16" />
            这是你的个人智能体控制台
          </p>
        </div>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-xl p-6 hover:border-gray-700 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <Activity :size="14" />
                账户状态
              </p>
              <p class="text-2xl font-bold text-white">
                {{ user?.is_active ? '已激活' : '未激活' }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle :size="24" class="text-green-400" />
            </div>
          </div>
        </div>

        <div class="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-xl p-6 hover:border-gray-700 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <Shield :size="14" />
                用户权限
              </p>
              <p class="text-2xl font-bold text-white">
                {{ user?.is_superuser ? '管理员' : '普通用户' }}
              </p>
            </div>
            <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
              <Crown v-if="user?.is_superuser" :size="24" class="text-yellow-400" />
              <User v-else :size="24" class="text-blue-400" />
            </div>
          </div>
        </div>

        <div class="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-xl p-6 hover:border-gray-700 transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <Calendar :size="14" />
                注册时间
              </p>
              <p class="text-2xl font-bold text-white">
                {{ formatDate(user?.created_at) }}
              </p>
            </div>
            <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Clock :size="24" class="text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- 用户信息详情 -->
      <div class="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-xl shadow-xl p-6">
        <div class="flex items-center gap-2 mb-4">
          <UserCircle :size="20" class="text-blue-400" />
          <h3 class="text-lg font-semibold text-white">个人信息</h3>
        </div>
        <div class="space-y-3">
          <div class="flex items-center justify-between py-3 border-b border-gray-800">
            <span class="text-gray-400 flex items-center gap-2">
              <User :size="16" />
              用户名
            </span>
            <span class="font-medium text-gray-200">{{ user?.username }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-gray-800">
            <span class="text-gray-400 flex items-center gap-2">
              <Mail :size="16" />
              邮箱
            </span>
            <span class="font-medium text-gray-200">{{ user?.email }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-gray-800">
            <span class="text-gray-400 flex items-center gap-2">
              <UserCircle :size="16" />
              全名
            </span>
            <span class="font-medium text-gray-200">{{ user?.full_name || '未设置' }}</span>
          </div>
          <div class="flex items-center justify-between py-3 border-b border-gray-800">
            <span class="text-gray-400 flex items-center gap-2">
              <Hash :size="16" />
              用户 ID
            </span>
            <span class="font-medium text-gray-200">{{ user?.id }}</span>
          </div>
          <div class="flex items-center justify-between py-3">
            <span class="text-gray-400 flex items-center gap-2">
              <Clock :size="16" />
              最后更新
            </span>
            <span class="font-medium text-gray-200">{{ formatDateTime(user?.updated_at) }}</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Bot, User, Mail, UserCircle, LogOut, Sparkles, Zap, 
  Activity, CheckCircle, Shield, Crown, Calendar, Clock, Hash
} from 'lucide-vue-next'
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

