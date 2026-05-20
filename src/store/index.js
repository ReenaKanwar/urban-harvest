import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import navReducer from './navSlice';
import productReducer from './productSlice';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    nav: navReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

export default store;
