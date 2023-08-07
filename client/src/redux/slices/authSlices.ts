import IOrder from '@/interfaces/IOrder';
import { RootState } from '@/redux/store';
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    _id: string
    name: string
    email: string
    role: string
    orders: IOrder[]
    createdAt: string
    updatedAt: string
}

const initialState: AuthState | null = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) as AuthState : null

export const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<AuthState|null>) => {
            localStorage.setItem(
                "user",
                JSON.stringify(action.payload)
            );
            return action.payload;
        },
        removeUser: () => {
            return null;
        }
    },
        
})
export const selectAuth = (state:RootState) => state.auth;
export const {setUser, removeUser}=authSlice.actions;
export default authSlice.reducer;