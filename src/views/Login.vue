<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-md w-full relative z-10">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <Logo />
        <h1 class="text-4xl font-bold text-white mb-2 mt-6">个人智能体</h1>
        <p class="text-gray-400">{{ isLogin ? '登录到你的账户' : '创建新账户' }}</p>
      </div>

      <!-- Form Card -->
      <div class="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-8">
        <form @submit.prevent="handleSubmit">
          <!-- Username -->
          <div class="mb-4">
            <label class="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <User :size="16" />
              {{ isLogin ? '用户名/邮箱' : '用户名' }}
            </label>
            <input
              v-model="formData.username"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              :placeholder="isLogin ? '请输入用户名或邮箱' : '请输入用户名'"
            />
          </div>

          <!-- Email (Register only) -->
          <div v-if="!isLogin" class="mb-4">
            <label class="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Mail :size="16" />
              邮箱
            </label>
            <input
              v-model="formData.email"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="请输入邮箱"
            />
          </div>

          <!-- Full Name (Register only) -->
          <div v-if="!isLogin" class="mb-4">
            <label class="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <UserCircle :size="16" />
              全名 (可选)
            </label>
            <input
              v-model="formData.full_name"
              type="text"
              class="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="请输入全名"
            />
          </div>

          <!-- Password -->
          <div class="mb-6">
            <label class="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <Lock :size="16" />
              密码
            </label>
            <input
              v-model="formData.password"
              type="password"
              class="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="请输入密码"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-gray-700/50 hover:bg-gray-700 text-gray-100 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-gray-600/50"
          >
            <component :is="loading ? Loader2 : (isLogin ? LogIn : UserPlus)" :size="20" :class="{ 'animate-spin': loading }" />
            {{ loading ? '处理中...' : (isLogin ? '登录' : '注册') }}
          </button>
        </form>

        <!-- Toggle Login/Register -->
        <div class="mt-6 text-center">
          <button
            @click="toggleMode"
            class="text-gray-400 hover:text-gray-300 text-sm font-medium transition flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeftRight :size="16" />
            {{ isLogin ? '还没有账户？立即注册' : '已有账户？立即登录' }}
          </button>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-500 mt-8">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>

    <!-- Toast 提示框 -->
    <Toast
      :message="toastState.message"
      :title="toastState.title"
      :type="toastState.type"
      :duration="toastState.duration"
      :show="toastState.show"
      @close="close"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Mail, UserCircle, Lock, LogIn, UserPlus, Loader2, ArrowLeftRight } from 'lucide-vue-next'
import Logo from '@/components/Logo.vue'
import Toast from '@/components/Toast.vue'
import { useToast } from '@/composables/useToast'
import { authAPI } from '@/api/auth'
import { storage } from '@/utils/storage'

const router = useRouter()
const { toastState, success, error, close } = useToast()

const isLogin = ref(true)
const loading = ref(false)

const formData = reactive({
  username: '',
  email: '',
  password: '',
  full_name: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  // 清空表单
  formData.username = ''
  formData.email = ''
  formData.password = ''
  formData.full_name = ''
}

// 表单验证
const validateForm = (): boolean => {
  if (!formData.username.trim()) {
    error('请输入用户名' + (isLogin.value ? '或邮箱' : ''))
    return false
  }

  if (!isLogin.value) {
    if (!formData.email.trim()) {
      error('请输入邮箱')
      return false
    }
    
    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      error('请输入有效的邮箱地址')
      return false
    }
  }

  if (!formData.password.trim()) {
    error('请输入密码')
    return false
  }

  if (!isLogin.value && formData.password.length < 6) {
    error('密码长度不能少于 6 位')
    return false
  }

  return true
}

const handleSubmit = async () => {
  // 验证表单
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    if (isLogin.value) {
      // 登录
      const response = await authAPI.login({
        username: formData.username,
        password: formData.password
      })

      // 保存 token
      storage.setToken(response.access_token)

      // 获取用户信息
      const user = await authAPI.getCurrentUser(response.access_token)
      storage.setUser(user)

      success('登录成功！', '欢迎回来')
      
      // 跳转到首页
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      // 注册
      await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name || undefined
      })

      success('注册成功！', '请使用新账户登录')
      
      // 切换到登录模式
      setTimeout(() => {
        const savedUsername = formData.username
        toggleMode()
        formData.username = savedUsername // 保留用户名
      }, 1500)
    }
  } catch (err: any) {
    error(err.message || '操作失败，请重试', '错误')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 如果需要额外的样式，可以在这里添加 */
</style>

