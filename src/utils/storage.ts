const TOKEN_KEY = 'access_token'
const USER_KEY = 'user_info'

export const storage = {
  // Token 相关
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY)
  },

  // 用户信息相关
  setUser(user: any) {
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  getUser(): any | null {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user) : null
  },

  removeUser() {
    localStorage.removeItem(USER_KEY)
  },

  // 清空所有
  clear() {
    this.removeToken()
    this.removeUser()
  }
}

