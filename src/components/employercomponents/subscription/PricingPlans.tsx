import { Check, Star } from "lucide-react";

const PricingPlans = () => {
  // TODO: Replace with API data
  const plans = [
    {
      name: "Basic",
      price: "$0",
      period: "per month",
      description: "Perfect for small teams",
      features: [
        "Up to 10 employees",
        "Basic wellness assessments",
        "Email support",
        "Monthly reports",
      ],
      current: false,
      recommended: false,
    },
    {
      name: "Premium",
      price: "$99",
      period: "per month",
      description: "Ideal for growing organizations",
      features: [
        "Up to 50 employees",
        "Advanced analytics",
        "Priority support",
        "Custom assessments",
        "Weekly reports",
        "API access",
      ],
      current: true,
      recommended: true,
    },
  ];

  return (
    <div className="row mb-5">
      <div className="col-12">
        <h3 className="h4 fw-semibold mb-4">Available Plans</h3>
        <div className="row g-4">
          {plans.map((plan, index) => (
            <div key={index} className="col-12 col-md-4">
              <div className={`card h-100 border-0 shadow-sm ${plan.recommended ? 'border-success' : ''}`}>
                {plan.recommended && (
                  <div className="card-header bg-success text-white text-center py-2">
                    <Star size={16} className="me-1" />
                    Recommended
                  </div>
                )}
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="card-title fw-bold">{plan.name}</h5>
                  <div className="my-3">
                    <span className="h2 fw-bold">{plan.price}</span>
                    <span className="text-muted">/{plan.period}</span>
                  </div>
                  <p className="text-muted mb-4">{plan.description}</p>
                  
                  <ul className="list-unstyled mb-4 flex-grow-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="mb-2">
                        <Check size={16} className="text-success me-2" />
                        <span className="small">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {plan.current ? (
                      <button className="btn btn-outline-success w-100" disabled>
                        Current Plan
                      </button>
                    ) : (
                      <button className={`btn w-100 ${plan.recommended ? 'btn-success' : 'btn-outline-success'}`}>
                        Select Plan
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;