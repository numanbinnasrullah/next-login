'use client'
import React, { useState } from 'react'
import { useGetAllUsersQuery } from '../store/service/getUserService';
import Link from 'next/link';

const page = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const {data, isLoading} = useGetAllUsersQuery();
  return (
    <>
    <h2 className="text-2xl font-bold text-center mt-5">Admin Panel</h2>
    {/* <div className="flex justify-center items-center ">
      <div className="relative">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={toggleDropdown}>
          Toggle Dropdown
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-full max-w-sm md:max-w-lg lg:max-w-xl bg-white border border-gray-300 rounded shadow z-10">
            <ul className="divide-y divide-gray-300 w-full">
              {data?.users.map((user) => (
                <li className=" w-full" key={user.id} className="p-4">
                  <span>{user.name}</span>
                  <span className="ml-4">{user.email}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div> */}
{
  isLoading ? <h2 className='text-center text-lg'>Loading ...</h2>
  :
  <div className="max-w-3xl mx-auto">
  <table className="w-full max-w-1400 mx-auto divide-y divide-gray-200">
    <thead className="bg-gray-100">
      <tr>
        <th className="py-3 px-6 text-center">User name</th>
        <th className="py-3 px-6 text-center">Email</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data?.users.map((user, index) => (
        <tr className={index % 2 === 0 ? "bg-gray-50" : ""} key={user._id}>
          <td className="py-4 px-6 text-center">{user.name}</td>
          <td className="py-4 px-6 text-center">{user.email}</td>
         
        </tr>
      ))}
    </tbody>
  </table>
</div> 
}


{/* 
     <div className="max-w-8xl mx-auto my-5">
         <img src="/admin.jpg" alt="Banner" className="w-full h-auto" />
       </div> */}
     </>
  )
}

export default page