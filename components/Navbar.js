'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { logout } from "../app/store/reducers/authReducer";
import { useRouter, usePathname } from 'next/navigation'



const Navbar = () => {
  const {userToken, user, adminToken} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname()
  console.log("Admin token : ",adminToken)



  useEffect(() => {
    if (!adminToken && pathname === '/admin') {
      router.push('/admin/login');
    } else if (adminToken && pathname === '/admin/register') {
      router.push('/admin/login');
    }
  }, [adminToken, pathname, router]);
  
  useEffect(() => {
    if (!userToken && pathname === '/dashboard') {
      router.push('/login');
    } else if (userToken && ( pathname === '/register')) {
      router.push('/login');
    } else if (userToken && ( pathname === '/login')) {
      router.push('/dashboard');
    }
  }, [userToken, pathname, router]);



  return (
    <>
    {adminToken ? (pathname !== "/admin/login" && pathname !== "/admin") &&   <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-white text-lg font-bold">My Website</Link>
        <Link href="/admin" className="text-white text-lg font-bold ml-5">Go to Admin</Link>
      </div>
    </div>
  </nav> : 
   pathname !== "/admin" && pathname !== "/admin/register" && pathname !== "/admin/login"  ?  <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
   <div className="flex items-center justify-between">
     <div className="flex items-center">
       <Link href="/" className="text-white text-lg font-bold">My Website</Link>
       <Link href="/admin" className="text-white text-lg font-bold ml-5">Go to Admin</Link>
     </div>
     <div>
       {userToken ?<> 
        <Link href="/dashboard" className="bg-white text-blue-500 font-semibold px-3 py-2 rounded-full text-sm mr-2 ">Dashboard</Link> 
       <span className="bg-white text-blue-500 font-semibold px-3 py-2 rounded-full text-sm mr-2 ">{ user?.name }</span> 
       <button className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-full text-sm" onClick={() => dispatch(logout('userToken'))}>Logout</button> </>
       : 
       <>
       <Link href="/login" className="bg-white text-blue-500 font-semibold px-3 py-2 rounded-full text-sm mr-2 ">Login</Link>
       <Link href="/register" className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-full text-sm">Register</Link></> }
       
       
     </div>
   </div>
 </nav> : null  
 }
   
  </>
  )
}

export default Navbar