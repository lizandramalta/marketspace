import { AuthContext } from '@contexts/authContext'
import { useContext } from 'react'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("auth provider must be used within it's provider")
  }

  return context
}
