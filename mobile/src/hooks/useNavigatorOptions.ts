import { NavigatorOptionsContext } from '@contexts/navigatorOptionsContext'
import { useContext } from 'react'

export function useNavigatorOptions() {
  const context = useContext(NavigatorOptionsContext)

  if (!context) {
    throw new Error(
      "navigator options provider must be used within it's provider"
    )
  }

  return context
}
