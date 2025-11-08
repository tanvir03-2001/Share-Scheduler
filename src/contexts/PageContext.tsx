'use client'

import { FacebookPage } from '@/lib/api'
import { createContext, ReactNode, useContext, useState } from 'react'

interface PageContextType {
  selectedPage: FacebookPage | null
  setSelectedPage: (page: FacebookPage | null) => void
}

const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageProvider({ children }: { children: ReactNode }) {
  const [selectedPage, setSelectedPage] = useState<FacebookPage | null>(null)

  return (
    <PageContext.Provider value={{ selectedPage, setSelectedPage }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  const context = useContext(PageContext)
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider')
  }
  return context
}
