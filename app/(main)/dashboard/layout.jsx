import Header from '@/components/customs/Header'
import React from 'react'

export default function DashboardLayout({children}) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

