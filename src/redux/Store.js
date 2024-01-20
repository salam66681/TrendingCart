import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import { ProductApi } from './queries/ProductApi';
import { CartSlice } from './slice/Cart.slice';

export const Store = configureStore({
    reducer:{
        [ProductApi.reducerPath]:ProductApi.reducer,
        [CartSlice.name]:CartSlice.reducer
    },
    middleware:(d)=>d().concat(ProductApi.middleware)
})

setupListeners(Store.dispatch)