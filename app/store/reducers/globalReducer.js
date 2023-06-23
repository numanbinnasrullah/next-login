import { createSlice } from "@reduxjs/toolkit";


const globalReducer = createSlice({
    name: 'globalReducer',
    initialState: {
        success: "",
        // searchBar : false
    },
    reducers:{
        setSuccess: (state, action) => {
            state.success = action.payload
        },
        clearMessage: (state) => {
            state.success = ""
        },
        // toogleSearchBar: (state) => {
        //     state.searchBar = !state.searchBar
        // }
    }
})
export const {setSuccess, clearMessage} = globalReducer.actions;
export default globalReducer.reducer;