import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Trash2 } from 'lucide-react';
import { updateOrderStatus, deleteOrder } from '../store/orderSlice';
import './OrderTable.css';

const OrderTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  const handleDelete = (orderId) => {
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      dispatch(deleteOrder(orderId));
    }
  };

  // Filter orders based on search and status select
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'pending';
      case 'Delivered':
        return 'delivered';
      case 'Cancelled':
      default:
        return 'cancelled';
    }
  };

  return (
    <div className="glass-panel orders-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="orders-header">
        <h4 className="orders-title">Recent Delivery Orders</h4>
        
        <div className="orders-controls">
          {/* Search bar */}
          <div className="orders-search-wrapper">
            <Search size={16} className="orders-search-icon" />
            <input
              type="text"
              placeholder="Search orders..."
              className="glass-input orders-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Status filter */}
          <select 
            className="status-filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      <div className="table-container">
        {filteredOrders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dark)' }}>
            No orders found matching search criteria.
          </div>
        ) : (
          <table className="custom-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items Ordered</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th style={{ width: '60px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{order.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.email}</div>
                  </td>
                  <td style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={order.items}>
                    {order.items}
                  </td>
                  <td>{order.date}</td>
                  <td style={{ fontWeight: 700 }}>${order.total.toFixed(2)}</td>
                  <td>
                    <select
                      className={`status-dropdown ${getStatusClass(order.status)}`}
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      className="delete-order-btn"
                      onClick={() => handleDelete(order.id)}
                      title="Delete Order"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
