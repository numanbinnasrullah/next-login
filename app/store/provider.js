'use client'

import { Provider } from 'react-redux';
import store from './index';
import React from 'react'
export function ReduxProvider({children}){
    return<Provider store={store}>{children}</Provider>
}