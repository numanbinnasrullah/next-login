
'use client'
import { useState } from "react";

export const useForm = (initState) => {
    const [state, setState] = useState(initState)
    const onHandleChange = (e) => {
        setState({...state, [e.target.name]: e.target.value})
    }

    return {
        state,
        onHandleChange
    }
}