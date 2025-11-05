const KeyMetrics = () => {
  return (
    <div className="row mt-5">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h3 className="h5 fw-semibold mb-4">Key Metrics Summary</h3>
            <div className="row text-center">
              <div className="col-6 col-md-3 mb-3">
                <div className="p-3">
                  <div className="h4 fw-bold text-primary">78%</div>
                  <div className="text-muted small">Overall Wellness</div>
                </div>
              </div>
              <div className="col-6 col-md-3 mb-3">
                <div className="p-3">
                  <div className="h4 fw-bold text-success">92%</div>
                  <div className="text-muted small">Participation Rate</div>
                </div>
              </div>
              <div className="col-6 col-md-3 mb-3">
                <div className="p-3">
                  <div className="h4 fw-bold text-warning">12%</div>
                  <div className="text-muted small">At Risk</div>
                </div>
              </div>
              <div className="col-6 col-md-3 mb-3">
                <div className="p-3">
                  <div className="h4 fw-bold text-info">85%</div>
                  <div className="text-muted small">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;