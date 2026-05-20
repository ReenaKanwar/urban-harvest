import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Bell, Calendar, CheckSquare } from 'lucide-react';
import { toggleSidebar } from '../store/navSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.nav.currentPage);
  const user = useSelector((state) => state.auth.user);
  
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);

  // Mock notifications array
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New order #UH-1093 placed by Michael Chen",
      time: "5 minutes ago",
      unread: true
    },
    {
      id: 2,
      text: "Stock warning: 'Butter Croissants' is low (18 left)",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 3,
      text: "Out of Stock alert: 'Sweet Strawberries' is unavailable",
      time: "4 hours ago",
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'products':
        return 'Product Inventory';
      default:
        return 'Urban Harvest';
    }
  };

  const getFormattedDate = () => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const toggleDropdown = () => {
    setShowNotifications(prev => !prev);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle-btn" 
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle Sidebar Menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="header-title">{getPageTitle()}</h1>
      </div>
      
      <div className="header-right">
        <div className="header-date-badge">
          <Calendar size={15} color="#10b981" />
          <span>{getFormattedDate()}</span>
        </div>
        
        <div className="notification-container" ref={dropdownRef}>
          <button 
            className="icon-btn" 
            onClick={toggleDropdown}
            aria-label="Toggle Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="badge-dot" />}
          </button>

          {showNotifications && (
            <div className="notification-dropdown animate-scale-up">
              <div className="notification-header">
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    <CheckSquare size={12} />
                    Mark all read
                  </button>
                )}
              </div>
              
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    No notifications
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`notification-item ${notif.unread ? 'unread' : ''}`}
                    >
                      <p className="notification-text">{notif.text}</p>
                      <span className="notification-time">{notif.time}</span>
                    </div>
                  ))
                )}
              </div>
              
              {notifications.length > 0 && (
                <div className="notification-footer">
                  <button onClick={clearNotifications}>Clear All</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
