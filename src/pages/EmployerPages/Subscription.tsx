import Layout from "../../components/employercomponents/shared/Layout";
import CurrentPlan from "../../components/employercomponents/subscription/CurrentPlan";
import PricingPlans from "../../components/employercomponents/subscription/PricingPlans";
import BillingHistory from "../../components/employercomponents/subscription/BillingHistory";

const EmployerSubscription = () => {
  return (
    <Layout title="Subscription Management">
      <div className="container-fluid py-4">
        <CurrentPlan />
        <PricingPlans />
        <BillingHistory />
      </div>
    </Layout>
  );
};

export default EmployerSubscription;
