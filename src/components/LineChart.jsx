import React, { useState } from 'react';
import './LineChart.css';

const LineChart = () => {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data = [1240, 1890, 1520, 2580, 2210, 3120, 2850];
  
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, value: '' });

  // SVG parameters
  const svgWidth = 600;
  const svgHeight = 200;
  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = svgWidth - paddingLeft - paddingRight;
  const chartHeight = svgHeight - paddingTop - paddingBottom;

  const maxValue = Math.max(...data) * 1.1; // 10% breathing room
  const minValue = 0;

  // Compute SVG coordinates
  const points = data.map((val, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((val - minValue) / (maxValue - minValue)) * chartHeight;
    return { x, y, value: val, label: labels[index] };
  });

  // Create path 'd' attribute
  const linePath = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  // Create closed area path 'd' attribute
  const areaPath = points.length > 0 
    ? `${linePath} L ${points[points.length - 1].x} ${svgHeight - paddingBottom} L ${points[0].x} ${svgHeight - paddingBottom} Z` 
    : '';

  const handlePointHover = (e, point) => {
    const rect = e.target.getBoundingClientRect();
    const parentRect = e.target.offsetParent.getBoundingClientRect();
    
    setTooltip({
      visible: true,
      x: rect.left - parentRect.left + rect.width / 2,
      y: rect.top - parentRect.top,
      value: `$${point.value.toLocaleString()}`,
      label: point.label
    });
  };

  const handlePointLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  // Generate grid values (e.g. 4 horizontal lines)
  const gridLines = Array.from({ length: 4 }).map((_, i) => {
    const val = minValue + (i / 3) * (maxValue - minValue);
    const y = paddingTop + chartHeight - (i / 3) * chartHeight;
    return { y, label: Math.round(val) };
  });

  return (
    <div className="glass-panel chart-container animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="chart-header">
        <h4 className="chart-title">Revenue Progress (Weekly)</h4>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-color revenue" />
            <span>Weekly Revenue</span>
          </div>
        </div>
      </div>
      
      <div className="chart-svg-wrapper">
        {/* Tooltip element */}
        <div 
          className={`chart-tooltip ${tooltip.visible ? 'visible' : ''}`}
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginBottom: '2px' }}>{tooltip.label}</div>
          <div>{tooltip.value}</div>
        </div>

        <svg className="chart-svg" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Linear gradient for line stroke */}
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            
            {/* Linear gradient for area fill */}
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Horizontal Gridlines & Y-axis labels */}
          {gridLines.map((line, i) => (
            <g key={i}>
              <line 
                x1={paddingLeft} 
                y1={line.y} 
                x2={svgWidth - paddingRight} 
                y2={line.y} 
                className="chart-grid-line" 
              />
              <text 
                x={paddingLeft - 10} 
                y={line.y + 4} 
                textAnchor="end" 
                className="chart-axis-text"
              >
                ${line.label}
              </text>
            </g>
          ))}
          
          {/* Area Fill */}
          <path d={areaPath} fill="url(#areaGradient)" className="chart-area" />
          
          {/* Line Stroke */}
          <path 
            d={linePath} 
            fill="none" 
            stroke="url(#lineGradient)" 
            strokeWidth="3.5" 
            strokeLinecap="round"
            className="chart-line" 
          />
          
          {/* Interactive circles */}
          {points.map((p, i) => (
            <circle 
              key={i} 
              cx={p.x} 
              cy={p.y} 
              r="4.5" 
              fill="#10b981" 
              stroke="#0e1626" 
              strokeWidth="2"
              className="chart-point"
              onMouseEnter={(e) => handlePointHover(e, p)}
              onMouseLeave={handlePointLeave}
            />
          ))}
          
          {/* X-axis labels */}
          {points.map((p, i) => (
            <text 
              key={i} 
              x={p.x} 
              y={svgHeight - 10} 
              textAnchor="middle" 
              className="chart-axis-text"
              style={{ fontWeight: 600 }}
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default LineChart;
