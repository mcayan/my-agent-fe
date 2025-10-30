<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
    <div class="max-w-md w-full">
      <!-- Logo and Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">个人智能体</h1>
        <p class="text-gray-600">{{ isLogin ? '登录到你的账户' : '创建新账户' }}</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <form @submit.prevent="handleSubmit">
          <!-- Username -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ isLogin ? '用户名/邮箱' : '用户名' }}
            </label>
            <input
              v-model="formData.username"
              type="text"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              :placeholder="isLogin ? '请输入用户名或邮箱' : '请输入用户名'"
            />
          </div>

          <!-- Email (Register only) -->
          <div v-if="!isLogin" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              邮箱
            </label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="请输入邮箱"
            />
          </div>

          <!-- Full Name (Register only) -->
          <div v-if="!isLogin" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              全名 (可选)
            </label>
            <input
              v-model="formData.full_name"
              type="text"
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="请输入全名"
            />
          </div>

          <!-- Password -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              密码
            </label>
            <input
              v-model="formData.password"
              type="password"
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="请输入密码"
            />
          </div>

          <!-- Error Message -->
          <div v-if="error" class="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <!-- Success Message -->
          <div v-if="success" class="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
            <p class="text-sm text-green-600">{{ success }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? '处理中...' : (isLogin ? '登录' : '注册') }}
          </button>
        </form>

        <!-- Toggle Login/Register -->
        <div class="mt-6 text-center">
          <button
            @click="toggleMode"
            class="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {{ isLogin ? '还没有账户？立即注册' : '已有账户？立即登录' }}
          </button>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm text-gray-600 mt-8">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { authAPI } from '@/api/auth'
import { storage } from '@/utils/storage'

const router = useRouter()

const isLogin = ref(true)
const loading = ref(false)
const error = ref('')
const success = ref('')

const formData = reactive({
  username: '',
  email: '',
  password: '',
  full_name: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  success.value = ''
  // 清空表单
  formData.username = ''
  formData.email = ''
  formData.password = ''
  formData.full_name = ''
}

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
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

      success.value = '登录成功！'
      
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

      success.value = '注册成功！请登录'
      
      // 切换到登录模式
      setTimeout(() => {
        toggleMode()
        formData.username = formData.username // 保留用户名
      }, 1500)
    }
  } catch (err: any) {
    error.value = err.message || '操作失败，请重试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* 如果需要额外的样式，可以在这里添加 */
</style>

