'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import MobileHeader from '@/components/dashboard/MobileHeader'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <MobileHeader />
          {children}
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
