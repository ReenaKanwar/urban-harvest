import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ title, value, icon: Icon, trend, trendText, colorClass = 'emerald' }) => {
  
  // Decide icon container coloring based on theme color class
  const getIconStyles = () => {
    switch (colorClass) {
      case 'rose':
        return { background: 'rgba(248, 113, 113, 0.1)', color: 'var(--danger)' };
      case 'amber':
        return { background: 'rgba(251, 191, 36, 0.1)', color: 'var(--accent)' };
      case 'blue':
        return { background: 'rgba(56, 189, 248, 0.1)', color: 'var(--info)' };
      case 'emerald':
      default:
        return { background: 'var(--primary-light)', color: 'var(--primary)' };
    }
  };

  return (
    <div className={`glass-panel stat-card ${colorClass} animate-fade-in`}>
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <div className="stat-card-icon-container" style={getIconStyles()}>
          <Icon size={22} />
        </div>
      </div>
      
      <div className="stat-card-body">
        <h3 className="stat-card-value">{value}</h3>
      </div>
      
      {trend && (
        <div className="stat-card-footer">
          <span className={`trend-badge ${trend.direction}`}>
            {trend.direction === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {trend.value}
          </span>
          <span className="stat-card-trend-text">{trendText}</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
