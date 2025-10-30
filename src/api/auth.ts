import { config } from '@/config'

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  full_name?: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export interface UserResponse {
  id: number
  username: string
  email: string
  full_name: string | null
  is_active: boolean
  is_superuser: boolean
  created_at: string
  updated_at: string
}

class AuthAPI {
  private baseUrl: string

  constructor() {
    this.baseUrl = config.apiBaseUrl
  }

  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '登录失败')
    }

    return response.json()
  }

  async register(data: RegisterData): Promise<UserResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || '注册失败')
    }

    return response.json()
  }

  async getCurrentUser(token: string): Promise<UserResponse> {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('获取用户信息失败')
    }

    return response.json()
  }
}

export const authAPI = new AuthAPI()

