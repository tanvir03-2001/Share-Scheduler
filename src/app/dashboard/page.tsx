'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import Sidebar from '@/components/dashboard/Sidebar'
import { useState } from 'react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('schedule')
  const [selectedPage, setSelectedPage] = useState<any>(null)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          selectedPageId={selectedPage?.id}
          onPageSelect={setSelectedPage}
        />
        
        {/* Main Content Area */}
        <div className="ml-64 md:ml-64 sm:ml-56 flex flex-col min-h-screen">
          
          {/* Content Area */}
          <ContentArea activeTab={activeTab} />
        </div>
      </div>
    </ProtectedRoute>
  )
}
