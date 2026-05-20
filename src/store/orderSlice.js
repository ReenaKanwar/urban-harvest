import { createSlice } from '@reduxjs/toolkit';

const initialOrders = [
  {
    id: 'UH-1092',
    customerName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    items: '3x Organic Fuji Apples, 1x Grass-Fed Milk',
    total: 21.46,
    status: 'Delivered',
    date: 'May 19, 2026',
  },
  {
    id: 'UH-1093',
    customerName: 'Michael Chen',
    email: 'mchen92@example.com',
    items: '2x Butter Croissants, 2x Fresh Spinach Bunch',
    total: 13.98,
    status: 'Pending',
    date: 'May 19, 2026',
  },
  {
    id: 'UH-1094',
    customerName: 'Elena Rostova',
    email: 'elena.r@example.com',
    items: '1x Artisanal Goat Cheese, 1x Whole Grain Sourdough',
    total: 14.98,
    status: 'Pending',
    date: 'May 18, 2026',
  },
  {
    id: 'UH-1095',
    customerName: 'Marcus Aurelius',
    email: 'marcus.philosophy@gmail.com',
    items: '5x Organic Fuji Apples, 3x Heirloom Tomatoes',
    total: 36.92,
    status: 'Delivered',
    date: 'May 18, 2026',
  },
  {
    id: 'UH-1096',
    customerName: 'Olivia Wilde',
    email: 'olivia.w@example.com',
    items: '2x Grass-Fed Whole Milk',
    total: 12.98,
    status: 'Cancelled',
    date: 'May 17, 2026',
  },
  {
    id: 'UH-1097',
    customerName: 'David Miller',
    email: 'david.m@example.com',
    items: '1x Whole Grain Sourdough, 2x Fresh Organic Spinach',
    total: 10.97,
    status: 'Delivered',
    date: 'May 17, 2026',
  },
  {
    id: 'UH-1098',
    customerName: 'Sophia Loren',
    email: 'sophia@example.com',
    items: '2x Artisanal Goat Cheese, 4x Heirloom Tomatoes',
    total: 33.94,
    status: 'Pending',
    date: 'May 16, 2026',
  }
];

const initialState = {
  orders: initialOrders,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: `UH-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pending',
        ...action.payload,
      };
      state.orders.unshift(newOrder);
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      const order = state.orders.find(o => o.id === id);
      if (order) {
        order.status = status;
      }
    },
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(o => o.id !== action.payload);
    }
  }
});

export const { addOrder, updateOrderStatus, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
