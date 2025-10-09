'use client'

import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  isMobile: boolean
  isMobileMenuOpen: boolean
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  setCollapsed: (collapsed: boolean) => void
  closeMobileMenu: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check if screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const setCollapsed = (collapsed: boolean) => {
    setIsCollapsed(collapsed)
  }

  const value: SidebarContextType = {
    isCollapsed,
    isMobile,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    setCollapsed,
    closeMobileMenu,
  }

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}
