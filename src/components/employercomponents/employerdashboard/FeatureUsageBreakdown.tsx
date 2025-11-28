import React from 'react';
import { BarChart3, Users, MessageSquare, FileText, TrendingUp } from 'lucide-react';

interface FeatureUsageData {
  feature: string;
  usage: number;
  maxUsage: number;
  icon: React.ReactNode;
  color: string;
  
}

const FeatureUsageBreakdown: React.FC = () => {
  // Mock data - in a real app, this would come from props or API
  const features: FeatureUsageData[] = [
    {
      feature: 'Employee Surveys',
      usage: 85,
      maxUsage: 100,
      icon: <MessageSquare size={20} />,
      color: '#3CB371',
    },
    {
      feature: 'Team Analytics',
      usage: 67,
      maxUsage: 100,
      icon: <BarChart3 size={20} />,
      color: '#3CB371'
    },
    {
      feature: 'Reports Generated',
      usage: 43,
      maxUsage: 100,
      icon: <FileText size={20} />,
      color: '#3CB371'
    },
    {
      feature: 'Active Users',
      usage: 92,
      maxUsage: 100,
      icon: <Users size={20} />,
      color: '#3CB371'
    }
  ];

  return (
    <div className="feature-usage-breakdown">
      <div className="d-flex align-items-center mb-4">
        <TrendingUp size={20} className="text-primary me-2" />
        <h6 className="card-title fw-semibold mb-0" style={{fontFamily: 'heading'}}>Feature Usage</h6>
      </div>

      <div className="feature-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-item mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <div
                  className="feature-icon me-2 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: `${feature.color}20`,
                    color: feature.color,
                    fontFamily: 'heading',
                    
                  }}
                >
                  {feature.icon}
                </div>
                <span className="fw-medium small text-dark">{feature.feature}</span>
              </div>
              <span className="small fw-semibold text-muted" style={{fontFamily:'body'}}>
                {feature.usage}%
              </span>
            </div>

            <div className="progress" style={{ height: '6px' }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${feature.usage}%`,
                  backgroundColor: feature.color,
                  borderRadius: '3px',
                  fontFamily:'body'
                }}
                aria-valuenow={feature.usage}
                aria-valuemin={0}
                aria-valuemax={feature.maxUsage}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-top">
        <div className="d-flex align-items-center justify-content-between">
          <span className="small text-muted" style={{fontFamily: 'heading'}}>Overall Usage</span>
          <span className="small fw-semibold text-dark">
            {Math.round(features.reduce((acc, f) => acc + f.usage, 0) / features.length)}%
          </span>
        </div>
        <div className="progress mt-2" style={{ height: '8px' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{
              width: `${Math.round(features.reduce((acc, f) => acc + f.usage, 0) / features.length)}%`,
              borderRadius: '4px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureUsageBreakdown;