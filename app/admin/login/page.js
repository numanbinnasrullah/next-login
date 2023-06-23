'use client'
import React, { useEffect, useState } from 'react'
import { useAuthLoginMutation } from '../../store/service/authService';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'
import { setAdminToken } from '../../store/reducers/authReducer';
import { ShowError } from '../../utils/showErrors';
import { useForm } from '@/components/hooks';
import Link from 'next/link';


  const AdminLogin = () =>  {
    const [errors, setErrors] = useState([]);
    const {userToken, user} = useSelector(state => state.authReducer);
    const {state, onHandleChange} = useForm({
      email: "",
      password: ""
  });

  const [userLogin, response] = useAuthLoginMutation();
  console.log("Admin Login Wala Response response",response)
  const SubmitHandler = (e) => {
      e.preventDefault();
      userLogin(state)
  }

  useEffect( ()=>{
    if(response?.isError){
        setErrors(response?.error?.data?.errors)
    } 
  },[response?.error?.data] );

  const dispatch = useDispatch();
  const router = useRouter()
  useEffect( ()=>{
    if (response.isSuccess) {
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem('admin-token', token);
        dispatch(setAdminToken(token));
        router.push('/admin');
      } else {
        // Handle case when token is missing or undefined
        router.push('/admin/login');
      }
    }
  },[response.isSuccess] )

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
    <div className="w-84 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={SubmitHandler}>
        <div className="mb-4">
        {errors?.map( (err)=> <span className='text-red-800' >{err.msg}</span> )}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email 
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
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
              value={response.isLoading ? 'Loading...!' : 'Login'}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-full"
              disabled={response.isLoading ? true : false}
            />
        </div>
        <div className='mb-4'>
           I don't have an Account : <Link href="/admin/register" className="text-blue-500 hover:text-blue-700 underline font-bold"> Register </Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default AdminLogin;