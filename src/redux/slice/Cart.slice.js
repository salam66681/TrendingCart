import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: 'cartSlice',
    initialState: {
        cart: JSON.parse(localStorage.getItem('cart')) || []
    },
    reducers: {
        addToCart: (state, action) => {
            const exist = state.cart.find((cur) => cur.id === action.payload.id);
            if (exist) {
                const newArray = state.cart.map((cur) => {
                    if (cur.id === action.payload.id) {
                        cur.qty = cur.qty + 1
                    }
                    return cur
                })

                state.cart = newArray;
                localStorage.setItem('cart', JSON.stringify(newArray))
                return
            }

            state.cart = [...state.cart, action.payload];
            localStorage.setItem('cart', JSON.stringify(state.cart))
            return
        },

        incrementReducer:(state, action) => {
            const newArray = state.cart.map((cur) => {
                if (cur.id === action.payload) {
                    cur.qty = cur.qty + 1
                }
                return cur
            })

            state.cart = newArray;
            localStorage.setItem('cart', JSON.stringify(newArray))
            return
        },

        decrementReducer: (state, action) => {
            const exist = state.cart.find((cur) => cur.id === action.payload);

            if (exist) {

                const copy = JSON.parse(JSON.stringify(exist))

                if (copy.qty===1){

                    const newArray = state.cart.filter((cur) => cur.id !== action.payload)
    
                    state.cart = newArray;
                    localStorage.setItem('cart', JSON.stringify(newArray))
                    return

                }
                const newArray = state.cart.map((cur) => {
                    if (cur.id === action.payload) {
                        cur.qty = cur.qty - 1
                    }
                    return cur
                })

                state.cart = newArray;
                localStorage.setItem('cart', JSON.stringify(newArray))
                return
            }
        },

        deleteItemReducer: (state, action) => {

            const newArray = state.cart.filter((cur) => cur.id !== action.payload)
    
            state.cart = newArray;
            localStorage.setItem('cart', JSON.stringify(newArray))
            return
        }

    }
})

export const { addToCart, incrementReducer, decrementReducer, deleteItemReducer } = CartSlice.actions