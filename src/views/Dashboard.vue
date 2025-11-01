<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col">
    <!-- 顶部导航栏 -->
    <nav class="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-3">
            <div class="bg-gray-800 p-2 rounded-lg border border-gray-700">
              <svg class="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
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
              <div class="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-300 font-semibold">
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

    <!-- 主内容区 - 聊天界面 -->
    <div class="flex-1 flex overflow-hidden">
      <!-- 左侧边栏 -->
      <aside class="w-80 bg-gray-900/30 border-r border-gray-800 flex flex-col hidden lg:flex">
        <!-- 新对话按钮 -->
        <div class="p-4 border-b border-gray-800">
          <button
            @click="createNewChat"
            class="w-full bg-gray-800 hover:bg-gray-700 text-gray-200 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 border border-gray-700"
          >
            <Plus :size="20" />
            新建对话
          </button>
        </div>

        <!-- 对话历史 -->
        <div class="flex-1 overflow-y-auto p-4">
          <h3 class="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <MessageSquare :size="16" />
            对话历史
          </h3>
          
          <div class="space-y-2">
            <div
              v-for="chat in chatHistory"
              :key="chat.id"
              @click="selectChat(chat.id)"
              :class="[
                'p-3 rounded-lg cursor-pointer transition group',
                currentChatId === chat.id
                  ? 'bg-gray-800 border border-gray-700'
                  : 'hover:bg-gray-800/50 border border-transparent'
              ]"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-200 truncate">{{ chat.title }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ chat.time }}</p>
                </div>
                <button
                  @click.stop="deleteChat(chat.id)"
                  class="opacity-0 group-hover:opacity-100 transition text-gray-400 hover:text-red-400"
                >
                  <Trash2 :size="16" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 已上传文件 -->
        <div class="p-4 border-t border-gray-800">
          <h3 class="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <FileText :size="16" />
            已上传文件 ({{ uploadedFiles.length }})
          </h3>
          <div class="space-y-2 max-h-40 overflow-y-auto">
            <div
              v-for="file in uploadedFiles"
              :key="file.id"
              class="flex items-center gap-2 p-2 rounded-lg bg-gray-800/50 text-sm text-gray-300"
            >
              <FileText :size="14" class="text-gray-400 flex-shrink-0" />
              <span class="flex-1 truncate">{{ file.name }}</span>
              <button
                @click="removeFile(file.id)"
                class="text-gray-400 hover:text-red-400 transition"
              >
                <X :size="14" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- 主聊天区域 -->
      <main class="flex-1 flex flex-col">
        <!-- 消息列表 -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-6 space-y-4">
          <!-- 欢迎消息 -->
          <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center">
            <div class="mb-6">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-xl mb-4 border border-gray-700">
                <Bot :size="32" class="text-gray-400" />
              </div>
              <h2 class="text-2xl font-bold text-white mb-2">你好，{{ user?.full_name || user?.username }}！</h2>
              <p class="text-gray-400 max-w-md">我是你的个人智能助手，可以帮你分析文档、回答问题。上传文件或直接向我提问吧！</p>
            </div>

            <!-- 快捷操作 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <button
                @click="handleQuickAction('分析文档')"
                class="p-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg text-left transition group"
              >
                <FileSearch :size="20" class="text-gray-400 mb-2" />
                <p class="text-white font-medium mb-1">分析文档</p>
                <p class="text-sm text-gray-500">上传 PDF 或 TXT 文件进行分析</p>
              </button>
              
              <button
                @click="handleQuickAction('智能问答')"
                class="p-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 rounded-lg text-left transition group"
              >
                <MessageCircle :size="20" class="text-gray-400 mb-2" />
                <p class="text-white font-medium mb-1">智能问答</p>
                <p class="text-sm text-gray-500">提出任何问题，我来帮你解答</p>
              </button>
            </div>
          </div>

          <!-- 消息列表 -->
          <div
            v-for="message in messages"
            :key="message.id"
            :class="[
              'flex gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            ]"
          >
            <!-- AI 头像 -->
            <div v-if="message.role === 'assistant'" class="flex-shrink-0">
              <div class="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                <Bot :size="16" class="text-gray-400" />
              </div>
            </div>

            <!-- 消息内容 -->
            <div
              :class="[
                'max-w-[70%] rounded-lg px-4 py-3',
                message.role === 'user'
                  ? 'bg-gray-800 text-gray-100 border border-gray-700'
                  : 'bg-gray-800/50 text-gray-200 border border-gray-700/50'
              ]"
            >
              <p class="text-sm whitespace-pre-wrap">{{ message.content }}</p>
              <span class="text-xs text-gray-500 mt-1 block">{{ message.time }}</span>
            </div>

            <!-- 用户头像 -->
            <div v-if="message.role === 'user'" class="flex-shrink-0">
              <div class="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 text-xs font-semibold">
                {{ getInitials(user?.username || '') }}
              </div>
            </div>
          </div>

          <!-- 正在输入 -->
          <div v-if="isTyping" class="flex gap-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center">
                <Bot :size="16" class="text-gray-400" />
              </div>
            </div>
            <div class="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="border-t border-gray-800 bg-gray-900/50 backdrop-blur-xl p-4">
          <div class="max-w-4xl mx-auto">
            <!-- 文件上传提示 -->
            <div v-if="isDragging" class="mb-4 p-4 border-2 border-dashed border-gray-600 rounded-lg bg-gray-800/50 text-center">
              <Upload :size="24" class="text-gray-400 mx-auto mb-2" />
              <p class="text-sm text-gray-400">释放以上传文件</p>
            </div>

            <!-- 输入框 -->
            <div class="relative">
              <textarea
                v-model="inputMessage"
                @keydown.enter.exact.prevent="sendMessage"
                @keydown.meta.enter="inputMessage += '\n'"
                placeholder="输入消息... (Enter 发送, ⌘+Enter 换行)"
                class="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 pr-32 text-white placeholder-gray-500 focus:ring-1 focus:ring-gray-600 focus:border-gray-600 outline-none resize-none transition"
                rows="1"
                style="max-height: 200px"
              ></textarea>

              <!-- 工具按钮 -->
              <div class="absolute right-2 bottom-2 flex items-center gap-2">
                <!-- 文件上传 -->
                <label class="cursor-pointer p-2 hover:bg-gray-700 rounded-lg transition">
                  <input
                    type="file"
                    @change="handleFileUpload"
                    accept=".pdf,.txt,.doc,.docx"
                    multiple
                    class="hidden"
                  />
                  <Paperclip :size="20" class="text-gray-400 hover:text-gray-200" />
                </label>

                <!-- 发送按钮 -->
                <button
                  @click="sendMessage"
                  :disabled="!inputMessage.trim()"
                  class="p-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition border border-gray-600"
                >
                  <Send :size="20" class="text-gray-300" />
                </button>
              </div>
            </div>

            <!-- 提示文字 -->
            <p class="text-xs text-gray-500 mt-2 text-center">
              智能体可能会产生错误，请验证重要信息
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { 
  LogOut, Bot, Plus, MessageSquare, Trash2, FileText, X,
  FileSearch, MessageCircle, Paperclip, Send, Upload
} from 'lucide-vue-next'
import { storage } from '@/utils/storage'
import type { UserResponse } from '@/api/auth'
import { agentAPI } from '@/api/agent'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const user = ref<UserResponse | null>(null)
const messagesContainer = ref<HTMLElement | null>(null)
const { showToast } = useToast()

// 聊天相关状态
const inputMessage = ref('')
const isTyping = ref(false)
const isDragging = ref(false)
const currentChatId = ref(1)

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
}

interface Chat {
  id: number
  title: string
  time: string
}

interface UploadedFile {
  id: number
  name: string
  type: string
}

const messages = ref<Message[]>([])
const chatHistory = ref<Chat[]>([
  { id: 1, title: '新对话', time: '刚刚' }
])
const uploadedFiles = ref<UploadedFile[]>([])

// 获取用户首字母
const getInitials = (name: string): string => {
  if (!name) return '?'
  return name.charAt(0).toUpperCase()
}

// 获取当前时间
const getCurrentTime = (): string => {
  const now = new Date()
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  const userMessage: Message = {
    id: Date.now(),
    role: 'user',
    content: inputMessage.value,
    time: getCurrentTime()
  }

  messages.value.push(userMessage)
  const userInput = inputMessage.value
  inputMessage.value = ''
  scrollToBottom()

  // 调用后端 AI 接口
  isTyping.value = true
  try {
    const response = await agentAPI.chat({
      message: userInput,
      conversation_id: currentChatId.value.toString()
    })

    const aiMessage: Message = {
      id: Date.now(),
      role: 'assistant',
      content: response.message,
      time: getCurrentTime()
    }
    messages.value.push(aiMessage)
    scrollToBottom()
  } catch (error: any) {
    console.error('发送消息失败:', error)
    showToast(error.message || '发送消息失败，请稍后重试', 'error')
    
    // 显示错误消息
    const errorMessage: Message = {
      id: Date.now(),
      role: 'assistant',
      content: '抱歉，我遇到了一些问题。请检查网络连接或稍后再试。',
      time: getCurrentTime()
    }
    messages.value.push(errorMessage)
    scrollToBottom()
  } finally {
    isTyping.value = false
  }
}

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return

  Array.from(files).forEach(file => {
    const newFile: UploadedFile = {
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type
    }
    uploadedFiles.value.push(newFile)

    // 模拟文件上传成功消息
    const systemMessage: Message = {
      id: Date.now(),
      role: 'assistant',
      content: `✅ 文件 "${file.name}" 上传成功！文件大小：${(file.size / 1024).toFixed(2)} KB`,
      time: getCurrentTime()
    }
    messages.value.push(systemMessage)
  })

  scrollToBottom()
  target.value = ''
}

// 移除文件
const removeFile = (id: number) => {
  uploadedFiles.value = uploadedFiles.value.filter(f => f.id !== id)
}

// 创建新对话
const createNewChat = () => {
  const newChat: Chat = {
    id: Date.now(),
    title: `对话 ${chatHistory.value.length + 1}`,
    time: '刚刚'
  }
  chatHistory.value.unshift(newChat)
  currentChatId.value = newChat.id
  messages.value = []
  uploadedFiles.value = []
}

// 选择对话
const selectChat = (id: number) => {
  currentChatId.value = id
  // 这里可以加载对应对话的消息
  messages.value = []
}

// 删除对话
const deleteChat = (id: number) => {
  chatHistory.value = chatHistory.value.filter(c => c.id !== id)
  if (currentChatId.value === id && chatHistory.value.length > 0) {
    currentChatId.value = chatHistory.value[0].id
  }
}

// 快捷操作
const handleQuickAction = (action: string) => {
  const message: Message = {
    id: Date.now(),
    role: 'assistant',
    content: `你选择了"${action}"功能。这是一个演示界面，后端对接后将提供完整功能。`,
    time: getCurrentTime()
  }
  messages.value.push(message)
  scrollToBottom()
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
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.7);
}
</style>

