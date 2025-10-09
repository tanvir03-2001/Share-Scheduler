'use client'

import { useSidebar } from '@/contexts/SidebarContext'
import { Facebook, Menu } from 'lucide-react'

export default function MobileHeader() {
  const { isMobile, toggleMobileMenu } = useSidebar()

  if (!isMobile) return null

  return (
    <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-100 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        
         <div className="flex items-center space-x-2">
           <div className="flex items-center justify-center w-6 h-6 bg-facebook-500 rounded-lg">
             <Facebook className="w-4 h-4 text-white" />
           </div>
           <span className="text-sm font-bold text-gray-900">AutoPost</span>
         </div>
        
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
    </div>
  )
}
