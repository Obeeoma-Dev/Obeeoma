import React from "react";

const EngagementTrend: React.FC = () => {
  const engagementData = {
    total: 345,
    active: 289,
    pending: 56,
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <h5 className="card-title fw-semibold mb-4">Engagement Trend</h5>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-medium">Total</span>
            <span className="fw-bold text-primary">{engagementData.total}</span>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="text-center p-3 bg-success bg-opacity-10 rounded">
              <div className="h5 fw-bold text-success mb-1">
                {engagementData.active}
              </div>
              <div className="text-muted small">Active</div>
            </div>
          </div>
          <div className="col-6">
            <div className="text-center p-3 bg-warning bg-opacity-10 rounded">
              <div className="h5 fw-bold text-warning mb-1">
                {engagementData.pending}
              </div>
              <div className="text-muted small">Pending</div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="progress" style={{ height: "6px" }}>
            <div
              className="progress-bar bg-success"
              style={{
                width: `${(engagementData.active / engagementData.total) * 100}%`,
              }}
            ></div>
            <div
              className="progress-bar bg-warning"
              style={{
                width: `${(engagementData.pending / engagementData.total) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementTrend;
