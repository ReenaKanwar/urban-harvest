import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sprout, LayoutDashboard, ShoppingBag, LogOut, X } from 'lucide-react';
import { navigateTo, toggleSidebar } from '../store/navSlice';
import { logout } from '../store/authSlice';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.nav.currentPage);
  const sidebarOpen = useSelector((state) => state.nav.sidebarOpen);
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Product Inventory', icon: ShoppingBag },
  ];

  const handleNavClick = (pageId) => {
    dispatch(navigateTo(pageId));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* Backdrop for mobile to click away */}
      <div 
        className={`sidebar-backdrop ${sidebarOpen ? 'visible' : ''}`} 
        onClick={() => dispatch(toggleSidebar())}
      />
      
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div>
          <div className="sidebar-logo">
            <Sprout size={32} color="#10b981" />
            <span className="logo-text">Urban Harvest</span>
            {sidebarOpen && (
              <button 
                className="close-mobile-nav" 
                onClick={() => dispatch(toggleSidebar())}
                style={{ 
                  marginLeft: 'auto', 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-muted)', 
                  cursor: 'pointer' 
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          <nav className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  className={`sidebar-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="sidebar-footer">
          {user && (
            <div className="user-profile">
              <div className="user-avatar">
                {getInitials(user.name)}
              </div>
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          )}
          
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
