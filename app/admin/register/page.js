'use client'
import React, { useEffect, useState } from 'react'
import { useForm } from '../../../components/hooks';
import { useUserRegisterMutation } from '../../store/service/authService';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'
import { setAdminToken } from '../../store/reducers/authReducer';
import { setSuccess } from '../../store/reducers/globalReducer';
import { ShowError } from '../../utils/showErrors';
import Link from 'next/link';

const AdminRegister = () => {
  const [errors, setErrors] = useState([]);
  const {state, onHandleChange} = useForm({
    name: "",
    email: "",
    password: ""
});

  const [userRegister, response] = useUserRegisterMutation();
  console.log("Admin Register ka Response AAA Geaa  ",response)
  const SubmitHandler = (e) => {
    e.preventDefault();
    userRegister(state)
  }

  useEffect( ()=>{
    if(response?.isError){
        setErrors(response?.error?.data?.errors)
    }
  },[response?.error?.data] )

  const dispatch = useDispatch();
  const router = useRouter()
  useEffect( ()=>{
      if(response.isSuccess){
          localStorage.setItem('admin-token', response?.data?.token)
          dispatch(setAdminToken(response?.data?.token))
          dispatch(setSuccess(response?.data?.msg))
          router.push('/admin/login')
      }
  },[response.isSuccess] )

 
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-blue-500">
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={SubmitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name" 
              type="text"
              placeholder="Enter your name"
              value={state.name} onChange={onHandleChange}
            />
            {ShowError(errors, 'name') && <span className='error'>{ShowError(errors, 'name')}</span>}
           
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email" 
              placeholder="Enter your email"
              value={state.email} onChange={onHandleChange}
            />
            {ShowError(errors, 'email') && <span className='error'>{ShowError(errors, 'email')}</span>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password" 
              type="password"
              placeholder="Enter your password"
              value={state.password} onChange={onHandleChange}
            />
            {ShowError(errors, 'password') && <span className='error'>{ShowError(errors, 'password')}</span>}
          </div>
          <div className='mb-4'>
          <input
              type="submit"
              value={response.isLoading ? 'Loading...!' : 'Sign Up'}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
              disabled={response.isLoading ? true : false}
            />
           </div>

           <div className='mb-4'>
           I already have an Account : <Link href="/admin/login" className="text-blue-500 hover:text-blue-700 underline font-bold"> Login </Link>
        </div>
        </form>
      </div>
    </div>
  )
}

export default AdminRegister