'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { logout } from "../app/store/reducers/authReducer";
import { useRouter, usePathname } from 'next/navigation'



const AdminNavbar = () => {
  const {userToken, user, adminToken} = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname()
//   console.log("Admin token : ",adminToken)
  // useEffect(() => {
  //   if (!userToken) {
  //     router.push('/');
  //   } else if (!userToken) {
  //     router.push('/login');
  //   } else if (!adminToken && pathname === '/admin') {
  //     router.push('/admin-register');
  //   }
  // }, [userToken, adminToken, router]);

//     useEffect(() => {
//     if (adminToken && pathname === '/admin/login') {
//       router.push('/admin');
//     } else if (!adminToken && pathname === '/admin') {
//       router.push('/admin/register');
//     }
//   }, [adminToken, router]);

  // useEffect(() => {
  //   if (adminToken) {
  //     router.push('/admin');
  //   }
  // }, [adminToken, router]);

  // useEffect(() => {
  //   if (!userToken) {
  //     router.push('/login');
  //   }
  // }, [userToken, router]);

  // useEffect(() => {
  //   if (!adminToken) {
  //     router.push('/admin-login');
  //   }
  // }, [adminToken, router]);

  // useEffect(() => {
  //   if (adminToken) {
  //     router.push('/admin');
  //   }
  // }, [userToken, router]);

  // useEffect(() => {
  //   if (userToken) {
  //     router.push('/dashboard');
  //   }
  // }, [userToken, router]);


  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-500 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {/* <img src="/logo.png" alt="Logo" className="h-8 mr-2" /> */}
        <Link href="/" className="text-white text-lg font-bold">My Website</Link>
      </div>
      <div>
        {adminToken ? pathname !== "/admin/login" && pathname !== "/admin/register" && <>  <button className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-full text-sm" onClick={() => dispatch(logout('admin-token'))}>Logout</button> </> :"" }
        
         {/* <>
         <Link href="/login" className="bg-white text-blue-500 font-semibold px-3 py-2 rounded-full text-sm mr-2 ">Login</Link>
         <Link href="/register" className="bg-blue-500 text-white font-semibold px-3 py-2 rounded-full text-sm">Register</Link></>  */}
        
        
      </div>
    </div>
  </nav>
  )
}

export default AdminNavbar