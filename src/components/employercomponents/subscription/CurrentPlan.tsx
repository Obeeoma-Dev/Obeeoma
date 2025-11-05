const CurrentPlan = () => {
  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h3 className="h5 fw-semibold mb-3">Current Plan</h3>
            <div className="row align-items-center">
              <div className="col-md-6">
                <h4 className="h4 fw-bold text-success mb-1">Professional Plan</h4>
                <p className="text-muted mb-2">$79 per month • Billed monthly</p>
                <p className="text-muted small">Next billing date: Dec 15, 2023</p>
              </div>
              <div className="col-md-6 text-md-end">
                <button className="btn btn-outline-success me-2">Change Plan</button>
                <button className="btn btn-success">Update Payment Method</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlan;