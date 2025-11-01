import { config } from '@/config'
import { storage } from '@/utils/storage'

export interface ChatRequest {
  message: string
  conversation_id?: string
}

export interface ChatResponse {
  message: string
  conversation_id: string
}

class AgentAPI {
  private baseUrl: string

  constructor() {
    this.baseUrl = config.apiBaseUrl
  }

  private getAuthHeader(): Record<string, string> {
    const token = storage.getToken()
    if (!token) {
      throw new Error('未登录')
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  async chat(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/agent/chat`, {
      method: 'POST',
      headers: this.getAuthHeader(),
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: '请求失败' }))
      throw new Error(error.detail || '聊天请求失败')
    }

    return response.json()
  }
}

export const agentAPI = new AgentAPI()


