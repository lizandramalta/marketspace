import { createContext, ReactNode, useState } from 'react'

type NavigatorOptionsContextProps = {
  isShowingTabBar: boolean
  showTabBar: () => void
  hideTabBar: () => void
}

export const NavigatorOptionsContext =
  createContext<NavigatorOptionsContextProps | null>(null)

export function NavigatorOptionsProvider({
  children
}: {
  children: ReactNode
}) {
  const [isShowingTabBar, setIsShowingTabBar] = useState(true)

  function showTabBar() {
    setIsShowingTabBar(true)
  }

  function hideTabBar() {
    setIsShowingTabBar(false)
  }

  return (
    <NavigatorOptionsContext.Provider
      value={{ isShowingTabBar, showTabBar, hideTabBar }}
    >
      {children}
    </NavigatorOptionsContext.Provider>
  )
}
