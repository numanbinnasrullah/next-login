
import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from 'jwt-decode';
const CustomerToken = typeof localStorage !== 'undefined' ? localStorage.getItem('userToken') : null;

function verifyToken(keyName){
    const Storage = typeof localStorage !== 'undefined' ? localStorage.getItem(keyName) : null;
    if(Storage){
        const decodeToken = jwtDecode(Storage);
        const expiresIn = new Date(decodeToken.exp * 1000);
        if(new Date() > expiresIn){
            localStorage.removeItem(keyName);
            return null
        } else {
            return Storage
        } 
    }
}

const authReducer = createSlice({
    name: 'authReducer',
    initialState: {
        adminToken: verifyToken('admin-token'),
        userToken: verifyToken('userToken'),
        user: CustomerToken ? jwtDecode(CustomerToken) : null ,
    },
    reducers:{
        setAdminToken: (state, action) => {
            state.adminToken = action.payload
        },
        setUserToken: (state, action) => {
            state.userToken = action.payload;
            state.user = jwtDecode(action.payload)
        },
        logout: (state, action) => {
            localStorage.removeItem(action.payload);
            if(action.payload === 'admin-token'){
                state.adminToken = null
            } else if(action.payload === 'userToken'){
                 state.userToken = null;
                 state.user = null
            }
        }
    }
})
export const {setAdminToken, setUserToken, logout} = authReducer.actions;
export default authReducer.reducer;