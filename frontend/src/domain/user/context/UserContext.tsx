import React, { createContext, useState, useEffect } from 'react'
import type { UserState } from '../types/types'
import { userService } from '../service/userService'
import { TOKEN_KEY } from '../../../base/constants'

interface UserContextType {
  currentUser: UserState | null
  setCurrentUser: (user: UserState | null) => void
  reloadUser: () => Promise<void>
}

export const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  reloadUser: async () => {},
})

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserState | null>(() => {
    // 尝试从 localStorage 获取用户信息
    const savedUser = localStorage.getItem('currentUser')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const reloadUser = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY)

      if (!token) {
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
        return
      }

      const resp = await userService.whoamiService()

      if (resp && resp.data) {
        setCurrentUser(resp.data)
        localStorage.setItem('currentUser', JSON.stringify(resp.data))
      } else {
        setCurrentUser(null)
        localStorage.removeItem('currentUser')
        localStorage.removeItem(TOKEN_KEY)
      }
    } catch (error) {
      console.error('Failed to load user information:', error)
      setCurrentUser(null)
      localStorage.removeItem('currentUser')
      localStorage.removeItem(TOKEN_KEY)
    }
  }

  // 组件挂载时，如果有 token 就自动加载用户信息
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token && !currentUser) {
      reloadUser()
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  const contextValue = {
    currentUser,
    setCurrentUser: (user: UserState | null) => {
      setCurrentUser(user)
      if (!user) {
        localStorage.removeItem('currentUser')
        localStorage.removeItem(TOKEN_KEY)
      } else {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
    },
    reloadUser,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}
