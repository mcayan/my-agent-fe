<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="visible"
        class="fixed top-4 right-4 z-50 min-w-[320px] max-w-md"
      >
        <div
          :class="[
            'bg-gray-900/95 backdrop-blur-xl border rounded-lg shadow-2xl p-4',
            typeClass
          ]"
        >
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-0.5">
              <CheckCircle v-if="type === 'success'" :size="20" class="text-green-400" />
              <XCircle v-if="type === 'error'" :size="20" class="text-red-400" />
              <AlertCircle v-if="type === 'warning'" :size="20" class="text-yellow-400" />
              <Info v-if="type === 'info'" :size="20" class="text-blue-400" />
            </div>
            
            <div class="flex-1 min-w-0">
              <p v-if="title" class="text-sm font-semibold text-white mb-1">
                {{ title }}
              </p>
              <p class="text-sm text-gray-300">
                {{ message }}
              </p>
            </div>
            
            <button
              @click="close"
              class="flex-shrink-0 text-gray-400 hover:text-white transition"
            >
              <X :size="18" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-vue-next'

interface Props {
  message: string
  title?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  show?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 3000,
  show: false
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(props.show)
let timer: number | null = null

const typeClass = {
  success: 'border-green-500/30',
  error: 'border-red-500/30',
  warning: 'border-yellow-500/30',
  info: 'border-blue-500/30'
}[props.type]

const close = () => {
  visible.value = false
  emit('close')
}

watch(() => props.show, (newVal) => {
  visible.value = newVal
  
  if (newVal) {
    if (timer) {
      clearTimeout(timer)
    }
    
    if (props.duration > 0) {
      timer = window.setTimeout(() => {
        close()
      }, props.duration)
    }
  }
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

