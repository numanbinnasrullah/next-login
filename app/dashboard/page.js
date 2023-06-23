'use client'
import React from 'react'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector(state => state.authReducer);
  return (
    <>
   <h2 className="text-2xl font-bold text-center mt-5">User Dashboard</h2>
    <h4  className="text-2xl font-bold text-center mt-5">Welcome to { user?.name }'s Dashboard</h4>
    <div className="max-w-6xl mx-auto my-5">
        <img src="/dashboard.png" alt="Banner" className="w-full h-auto" />
      </div>
    </>
  )
}

export default Dashboard