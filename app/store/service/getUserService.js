import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const getUsersService = createApi({
    reducerPath : 'gettingUsers',
    baseQuery : fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/'
        
    }),
    
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query : () => {
                console.log("Console to chal rha hy ")
                return {
                    url:'get-users',
                    method: 'GET'
                }
            }
        }),
    })
})
export const {useGetAllUsersQuery} = getUsersService
export default getUsersService;