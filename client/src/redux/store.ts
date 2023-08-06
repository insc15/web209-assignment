
import { configureStore } from '@reduxjs/toolkit';
import { category } from './services/category';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { product } from './services/product';
import { cartSlice } from './slices/cart';
import { authApi } from './slices/authApi';
import { authSlice } from './slices/authSlices';
import userApi from './slices/accountAdmin';
const store = configureStore({
  reducer: {
    "account":userApi.reducer,
    auth:authSlice.reducer,
    [category.reducerPath]: category.reducer,
    [product.reducerPath]: product.reducer,
    [authApi.reducerPath]: authApi.reducer,
    cart: cartSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(category.middleware, product.middleware,authApi.middleware,userApi.middleware),
}); 

setupListeners(store.dispatch);

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch;
export default store;