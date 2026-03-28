import { RegisterBody } from '../types/serviceTypes.ts'
import { userService } from '../service/userService.ts'
import { useDispatch } from 'react-redux'
import { login } from '../../../store/appSlice.ts'
import { message } from 'antd'
import { kamanoteUserToken } from '../../../base/constants'
import { setUser } from '../../../store/userSlice.ts'
import type { UserState } from '../types/types.ts'

export function useRegister() {
  // Sign Up请求函数
  const dispatch = useDispatch()

  async function registerHandle(registerBody: RegisterBody) {
    try {
      const resp = await userService.registerService(registerBody)
      if (resp) {
        const { token, data } = resp
        if (!token) {
          message.error('token is null')
          throw new Error('token is null')
        }
        // 将 token 存储到 localStorage
        localStorage.setItem(kamanoteUserToken, token)
        // 存储用户信息
        dispatch(
          setUser({
            userId: data.userId,
            username: registerBody.username,
            account: registerBody.account,
            email: registerBody.email,
            avatarUrl: '',
            gender: 3,
            school: '',
            signature: '',
            birthday: '',
            isAdmin: 0,
          } as UserState),
        )
        // 设置Login状态
        dispatch(login())
      }
    } catch (e: any) {
      throw new Error(e.message)
    }
  }

  return {
    registerHandle,
  }
}
