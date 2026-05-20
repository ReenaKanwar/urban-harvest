import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Plus, Trash2, ShieldAlert } from 'lucide-react';
import { 
  addProduct, 
  toggleProductStatus, 
  updateProductStock, 
  deleteProduct, 
  setSearchQuery, 
  setSelectedCategory 
} from '../store/productSlice';
import Modal from '../components/Modal';
import './Products.css';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const searchQuery = useSelector((state) => state.products.searchQuery);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Fruits');
  const [formPrice, setFormPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formError, setFormError] = useState('');

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery'];

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleStatusToggle = (productId) => {
    dispatch(toggleProductStatus(productId));
  };

  const handleStockChange = (productId, newStock) => {
    dispatch(updateProductStock({ id: productId, stock: newStock }));
  };

  const handleDelete = (productId, productName) => {
    if (window.confirm(`Are you sure you want to delete "${productName}" from inventory?`)) {
      dispatch(deleteProduct(productId));
    }
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formName.trim()) {
      setFormError('Product Name is required.');
      return;
    }
    
    const priceNum = parseFloat(formPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      setFormError('Please enter a valid price greater than $0.');
      return;
    }

    const stockNum = parseInt(formStock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      setFormError('Please enter a valid non-negative stock quantity.');
      return;
    }

    // Success: dispatch product info
    dispatch(addProduct({
      name: formName.trim(),
      category: formCategory,
      price: priceNum,
      stock: stockNum,
      image: formImage.trim() || undefined,
    }));

    // Reset Form
    setFormName('');
    setFormCategory('Fruits');
    setFormPrice('');
    setFormStock('');
    setFormImage('');
    setFormError('');
    setIsModalOpen(false);
  };

  // Filter products based on search term & category selection
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page animate-fade-in">
      
      {/* Search & Actions Bar */}
      <div className="products-toolbar">
        {/* Search */}
        <div className="products-actions">
          <div className="orders-search-wrapper" style={{ minWidth: '260px' }}>
            <Search size={16} className="orders-search-icon" />
            <input
              type="text"
              placeholder="Search catalog by name..."
              className="glass-input orders-search-input"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {/* Add Product Trigger */}
        <button 
          className="btn-primary" 
          onClick={() => {
            setFormError('');
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Categories chips selection */}
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Product Cards */}
      {filteredProducts.length === 0 ? (
        <div 
          className="glass-panel" 
          style={{ 
            padding: '60px', 
            textAlign: 'center', 
            color: 'var(--text-muted)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '12px' 
          }}
        >
          <ShieldAlert size={40} color="var(--text-dark)" />
          <span>No products found matching filters.</span>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="glass-panel product-card animate-fade-in"
              style={{ animationDelay: '0.05s' }}
            >
              <div className="product-img-wrapper">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-img" 
                  onError={(e) => {
                    // Fallback to organic placeholder image if link fails
                    e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=60';
                  }}
                />
                <span className="product-category-tag">{product.category}</span>
                
                {/* Floating delete button */}
                <button 
                  className="delete-product-btn-overlay" 
                  onClick={() => handleDelete(product.id, product.name)}
                  title="Remove Product"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="product-info">
                <div className="product-title-row">
                  <h4 className="product-name">{product.name}</h4>
                  <span className="product-price">${product.price.toFixed(2)}</span>
                </div>

                <div className="product-stock-status">
                  <span>Stock Available:</span>
                  <div className="stock-input-wrapper">
                    <input
                      type="number"
                      min="0"
                      className="glass-input stock-input-field"
                      value={product.stock}
                      onChange={(e) => handleStockChange(product.id, e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '4px' }}>
                  <span className={`badge ${product.status === 'Available' ? 'badge-success' : 'badge-danger'}`}>
                    {product.status}
                  </span>
                </div>
              </div>

              {/* Status Switcher in card footer */}
              <div className="product-card-footer">
                <div 
                  className={`status-toggle-wrapper ${product.status === 'Available' ? 'active' : ''}`}
                  onClick={() => handleStatusToggle(product.id)}
                >
                  <div className="toggle-switch" />
                  <span>{product.status === 'Available' ? 'In Stock (Active)' : 'Out of Stock (Inactive)'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal Form */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Register New Food Item"
      >
        <form onSubmit={handleAddProductSubmit} className="add-product-form">
          {formError && (
            <div className="error-alert animate-fade-in" style={{ margin: 0 }}>
              <ShieldAlert size={16} />
              <span>{formError}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="prod-name">Product Name</label>
            <input
              id="prod-name"
              type="text"
              placeholder="e.g. Organic Blueberries"
              className="glass-input"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="prod-cat">Category</label>
              <select
                id="prod-cat"
                className="glass-input"
                style={{ padding: '11px 16px', background: 'var(--bg-dark-900)', color: 'var(--text-primary)' }}
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
              >
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Bakery">Bakery</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prod-price">Price ($)</label>
              <input
                id="prod-price"
                type="number"
                step="0.01"
                min="0"
                placeholder="4.99"
                className="glass-input"
                value={formPrice}
                onChange={(e) => setFormPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="prod-stock">Initial Stock</label>
              <input
                id="prod-stock"
                type="number"
                min="0"
                placeholder="50"
                className="glass-input"
                value={formStock}
                onChange={(e) => setFormStock(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="prod-image">Image URL (Optional)</label>
              <input
                id="prod-image"
                type="url"
                placeholder="https://..."
                className="glass-input"
                value={formImage}
                onChange={(e) => setFormImage(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions-row">
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </Modal>
      
    </div>
  );
};

export default Products;
