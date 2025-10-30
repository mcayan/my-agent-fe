import { ref } from 'vue'

interface ToastOptions {
  message: string
  title?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

interface ToastState extends ToastOptions {
  show: boolean
}

const toastState = ref<ToastState>({
  message: '',
  title: '',
  type: 'info',
  duration: 3000,
  show: false
})

export function useToast() {
  const showToast = (options: ToastOptions) => {
    toastState.value = {
      ...options,
      show: true
    }
  }

  const success = (message: string, title?: string) => {
    showToast({ message, title, type: 'success' })
  }

  const error = (message: string, title?: string) => {
    showToast({ message, title, type: 'error' })
  }

  const warning = (message: string, title?: string) => {
    showToast({ message, title, type: 'warning' })
  }

  const info = (message: string, title?: string) => {
    showToast({ message, title, type: 'info' })
  }

  const close = () => {
    toastState.value.show = false
  }

  return {
    toastState,
    showToast,
    success,
    error,
    warning,
    info,
    close
  }
}

