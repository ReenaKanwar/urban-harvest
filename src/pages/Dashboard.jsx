import React from 'react';
import { useSelector } from 'react-redux';
import { ShoppingBag, DollarSign, Users, Truck, ShieldCheck, Activity, Clock, Mail } from 'lucide-react';
import StatCard from '../components/StatCard';
import LineChart from '../components/LineChart';
import OrderTable from '../components/OrderTable';
import './Dashboard.css';

const Dashboard = () => {
  const orders = useSelector((state) => state.orders.orders);
  const user = useSelector((state) => state.auth.user);

  // Dynamic calculations based on Redux orders state
  const totalOrdersCount = orders.length;
  
  const completedRevenue = orders
    .filter((o) => o.status === 'Delivered')
    .reduce((sum, o) => sum + o.total, 0);
  const totalRevenue = 1452.80 + completedRevenue; // Base rate + live delivered orders

  const uniqueCustomers = new Set(orders.map((o) => o.email)).size;
  const activeUsersCount = 245 + uniqueCustomers; // Base rate + live customers

  const pendingDeliveriesCount = orders.filter((o) => o.status === 'Pending').length;

  return (
    <div className="dashboard-page animate-fade-in">
      {/* Metrics Row */}
      <div className="stats-grid">
        <StatCard
          title="Total Orders"
          value={totalOrdersCount}
          icon={ShoppingBag}
          trend={{ direction: 'up', value: '+14%' }}
          trendText="vs last week"
          colorClass="emerald"
        />
        <StatCard
          title="Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={DollarSign}
          trend={{ direction: 'up', value: '+8.2%' }}
          trendText="vs last week"
          colorClass="blue"
        />
        <StatCard
          title="Active Users"
          value={activeUsersCount}
          icon={Users}
          trend={{ direction: 'up', value: '+24 new' }}
          trendText="today"
          colorClass="amber"
        />
        <StatCard
          title="Pending Deliveries"
          value={pendingDeliveriesCount}
          icon={Truck}
          trend={{ 
            direction: pendingDeliveriesCount > 3 ? 'up' : 'down', 
            value: pendingDeliveriesCount.toString() 
          }}
          trendText="orders in queue"
          colorClass="rose"
        />
      </div>

      {/* Main Layout Grid */}
      <div className="dashboard-content-grid">
        
        {/* Left Column: Chart and Table */}
        <div className="left-column">
          <LineChart />
          <OrderTable />
        </div>

        {/* Right Column: User Profile & System Status */}
        <div className="right-column">
          
          {/* User Profile Section */}
          <div className="glass-panel profile-card animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <div className="profile-card-header">
              <div 
                className="user-avatar" 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  fontSize: '1.4rem' 
                }}
              >
                {user ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AD'}
              </div>
              <div>
                <h4 className="profile-card-title">{user ? user.name : 'Admin User'}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>System Administrator</p>
              </div>
            </div>
            
            <div className="profile-details">
              <div className="profile-detail-row">
                <span className="profile-detail-label">Email Address</span>
                <span className="profile-detail-value">{user ? user.email : 'admin@urbanharvest.com'}</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Access Role</span>
                <span className="profile-detail-value">Super Admin</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Status</span>
                <span className="profile-detail-value" style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> Active
                </span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Last Login</span>
                <span className="profile-detail-value">Just now (IP Verified)</span>
              </div>
            </div>
          </div>

          {/* System Metrics Card */}
          <div className="glass-panel profile-card animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <h4 className="profile-card-title" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#10b981" />
              Delivery Efficiency
            </h4>
            
            <div className="profile-details">
              <div className="profile-detail-row">
                <span className="profile-detail-label">On-Time Rate</span>
                <span className="profile-detail-value" style={{ color: 'var(--secondary)', fontWeight: 700 }}>98.4%</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Avg. Cook & Pack Time</span>
                <span className="profile-detail-value">12.5 mins</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Avg. Transit Time</span>
                <span className="profile-detail-value">18.2 mins</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-label">Rating</span>
                <span className="profile-detail-value" style={{ color: 'var(--accent)', fontWeight: 700 }}>★ 4.92 / 5</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
