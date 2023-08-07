
import { configureStore } from '@reduxjs/toolkit';
import { category } from './services/category';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { product } from './services/product';
import { cartSlice } from './slices/cart';
import { authApi } from './services/authApi';
import { authSlice } from './slices/authSlices';
import { order } from './services/order';
import userApi from './services/account';
const store = configureStore({
  reducer: {
    "account":userApi.reducer,
    auth:authSlice.reducer,
    [category.reducerPath]: category.reducer,
    [product.reducerPath]: product.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [order.reducerPath]: order.reducer,
    cart: cartSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(category.middleware, product.middleware,authApi.middleware, order.middleware,userApi.middleware),
}); 

setupListeners(store.dispatch);

store.subscribe(() => {
  localStorage.setItem('cart', JSON.stringify(store.getState().cart));
  localStorage.setItem('user', JSON.stringify(store.getState().auth));
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch =typeof store.dispatch;
export default store;