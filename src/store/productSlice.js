import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  {
    id: 'prod-1',
    name: 'Organic Fuji Apples',
    category: 'Fruits',
    price: 4.99,
    stock: 120,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 'prod-2',
    name: 'Fresh Organic Spinach',
    category: 'Vegetables',
    price: 2.49,
    stock: 85,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 'prod-3',
    name: 'Whole Grain Sourdough',
    category: 'Bakery',
    price: 5.99,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 'prod-4',
    name: 'Grass-Fed Whole Milk',
    category: 'Dairy',
    price: 6.49,
    stock: 45,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 'prod-5',
    name: 'Heirloom Tomatoes',
    category: 'Vegetables',
    price: 3.99,
    stock: 75,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 'prod-6',
    name: 'Sweet Strawberries',
    category: 'Fruits',
    price: 5.49,
    stock: 0,
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 'prod-7',
    name: 'Artisanal Goat Cheese',
    category: 'Dairy',
    price: 8.99,
    stock: 32,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1486887396153-fa416525c108?w=150&auto=format&fit=crop&q=60',
  },
  {
    id: 'prod-8',
    name: 'Butter Croissants (4-pack)',
    category: 'Bakery',
    price: 4.50,
    stock: 18,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&auto=format&fit=crop&q=60',
  }
];

const initialState = {
  products: initialProducts,
  searchQuery: '',
  selectedCategory: 'All',
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        id: `prod-${Date.now()}`,
        ...action.payload,
        status: action.payload.stock > 0 ? 'Available' : 'Out of Stock',
        image: action.payload.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60', // Default fresh basket image
      };
      state.products.unshift(newProduct); // Add to the beginning of the list
    },
    toggleProductStatus: (state, action) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        if (product.status === 'Available') {
          product.status = 'Out of Stock';
          product.stock = 0;
        } else {
          product.status = 'Available';
          product.stock = 15; // Set a default stock when turning Available
        }
      }
    },
    updateProductStock: (state, action) => {
      const { id, stock } = action.payload;
      const product = state.products.find(p => p.id === id);
      if (product) {
        product.stock = parseInt(stock, 10);
        product.status = product.stock > 0 ? 'Available' : 'Out of Stock';
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  }
});

export const { 
  addProduct, 
  toggleProductStatus, 
  updateProductStock, 
  deleteProduct, 
  setSearchQuery, 
  setSelectedCategory 
} = productSlice.actions;

export default productSlice.reducer;
