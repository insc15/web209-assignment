import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type CartItem = {
    _id: string,
    quantity: number
}

const initialState: CartItem[] = window.localStorage.getItem('cart') ? JSON.parse(window.localStorage.getItem('cart') as string) as CartItem[] : []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action: PayloadAction<CartItem>) => {
            const item = state.find(item => item._id === action.payload._id)
            if(item) {
                item.quantity += action.payload.quantity
            } else {
                state.push(action.payload)
            }
        },
        removeCartItem: (state, action: PayloadAction<string>) => {
            return state.filter(item => item._id !== action.payload)
        },
    }
})

export const { addCartItem, removeCartItem } = cartSlice.actions

export default cartSlice.reducer