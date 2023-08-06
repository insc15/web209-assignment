import { RootState } from '@/redux/store';
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    name: string|null;
}
const initialState: AuthState = {
    name:null,
}
export const authSlice=createSlice({
    name: "auth",
    initialState,
    reducers:{
        setUser:(state,action:PayloadAction<{name:string}>
            ) => {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        name:action.payload.name,
                    })
                );
                state.name=action.payload.name;
            }
        }
})
export const selectAuth = (state:RootState) => state.auth;
export const {setUser}=authSlice.actions;
export default authSlice.reducer;