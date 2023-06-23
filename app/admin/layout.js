import AdminNavbar from '@/components/adminNav'
import React from 'react'

const Layout = ({children}) => {
  return (
    <>
   <AdminNavbar />
   {children}
   </>
  )
}

export default Layout