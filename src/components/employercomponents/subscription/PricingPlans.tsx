import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

//  the structure for a Plan
interface Plan {
  name: string;
  price: string; // Keep as string to handle "$0"
  amount: number; // Numerical amount for processing
  currency: string; //
  period: string;
  description: string;
  features: string[];
  current: boolean;
  recommended: boolean;
}

const PricingPlans = () => {
  const navigate = useNavigate();

  // TODO: Replace with API data
  const plans: Plan[] = [
    {
      name: "Basic",
      price: "$0",
      amount: 0,
      currency: "USD",
      period: "per month",
      description: "Perfect for small teams",
      features: [
        "Basic wellness assessments",
        "Email support",
        "Monthly reports",
      ],
      current: false,
      recommended: false,
    },
  
  ];

  /**
   * Handles plan selection and redirects to the checkout page.
   * @param plan The selected plan object.
   */
  const handleSelectPlan = (plan: Plan) => {
    // Only navigate for paid plans
    if (plan.amount > 0) {
      navigate('/checkout', { 
        state: { 
          planName: plan.name, 
          amount: plan.amount, 
          currency: plan.currency 
        } 
      });
    } else {
       // Handle navigation/activation for $0 plan if necessary
      alert(`You have selected the free ${plan.name} plan.`);
    }
  };

  return (
    <div className="row mb-5">
      <div className="col-12">
        <h3 className="h4 fw-semibold mb-4">Available Plans</h3>
        <div className="row g-4">
          {plans.map((plan, index) => (
            <div key={index} className="col-12 col-md-6"> 
              <div className={`card h-100 border-0 shadow-sm ${plan.recommended ? 'border-success border-2' : ''}`}>
                {plan.recommended && (
                  <div className="card-header bg-success text-white text-center small py-1 rounded-top-0">
                    <Star size={14} className="me-1" /> Most Popular
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
                      <button 
                        onClick={() => handleSelectPlan(plan)} 
                        className={`btn w-100 ${plan.recommended ? 'btn-success' : 'btn-outline-success'}`}
                        disabled={plan.amount === 0} 
                      >
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