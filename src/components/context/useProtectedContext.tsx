import { setAccessToken } from '@api/protected/instance'
import { useAuth0 } from '@auth0/auth0-react'
import { ReactNode, useEffect } from 'react'
import { create } from 'zustand'

export type ProtectedContext = {
  isLoading: boolean
  isAuthenticated: boolean
  set: any
}

export const useProtectedContext = create<ProtectedContext>((set: any) => ({
  isLoading: true,
  isAuthenticated: false,
  set,
}))

const ProtectedProvider = ({ children }: { children: ReactNode }) => {
  const { getAccessTokenSilently } = useAuth0()
  const { set } = useProtectedContext()

  const onAccesTokenSuccess = (accessToken: string) => {
    setAccessToken(accessToken)
    set({ isAuthenticated: true })
  }

  const onAccesTokenFailure = () => {
    setAccessToken(null)
    set({ isAuthenticated: false })
    window.location.href = '/'
  }

  const onAccesTokenCompleted = () => {
    set({ isLoading: false })
  }

  useEffect(() => {
    getAccessTokenSilently()
    .then(onAccesTokenSuccess)
    .catch(onAccesTokenFailure)
    .finally(onAccesTokenCompleted)
  }, [])

  return <>{children}</>
}

export default ProtectedProvider
