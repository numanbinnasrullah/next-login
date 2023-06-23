import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const authService = createApi({
    reducerPath : 'auth',
    baseQuery : fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/'
        
    }),
    
    endpoints: (builder) => ({
        authLogin: builder.mutation({
            query : (loginData) => ({
                url:'login',
                method: 'POST',
                body: loginData
            })
        }), 
        userRegister: builder.mutation({
            query : (registerData) => ({
                url:'register',
                method: 'POST',
                body: registerData
            })
        }),
        userLogin: builder.mutation({
            query : (loginData) => ({
                url:'login',
                method: 'POST',
                body: loginData
            })
        }) 
    })
})
export const {useAuthLoginMutation, useUserRegisterMutation, useUserLoginMutation} = authService
export default authService;