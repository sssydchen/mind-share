import { useSelector } from 'react-redux'
import { RootState } from '@/store/store.ts'

// 返回 Redux 中的Profile Settings
// 针对于当前Login用户
export function useUser() {
  return useSelector((state: RootState) => state.user)
}
