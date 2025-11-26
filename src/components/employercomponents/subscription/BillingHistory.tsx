const BillingHistory = () => {
  // TODO: Replace with API data
  const billingHistory = [
    { id: 1, date: "Nov 15, 2023", amount: "$79.00", status: "Paid" },
    { id: 2, date: "Oct 15, 2023", amount: "$79.00", status: "Paid" },
    { id: 3, date: "Sep 15, 2023", amount: "$79.00", status: "Paid" },
  ];

  return (
    <div className="row">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <h3 className="h5 fw-semibold mb-4">Billing History</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item) => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>
                        <span className="badge bg-success">{item.status}</span>
                      </td>
                      <td>
                        <button className="btn btn-link p-0 text-primary">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;