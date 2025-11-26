import Layout from "../../components/employercomponents/shared/Layout";
import CurrentPlan from "../../components/employercomponents/subscription/CurrentPlan";
import PricingPlans from "../../components/employercomponents/subscription/PricingPlans";
import BillingHistory from "../../components/employercomponents/subscription/BillingHistory";
import UsageView from "@/components/employercomponents/subscription/UsageView";
// import PaymentUpdateModal from '../../components/employercomponents/subscription/PaymentUpdateModal';
const EmployerSubscription = () => {
  return (
    <Layout title="Subscription Management">
      <div className="container-fluid py-4">
        <CurrentPlan />
        <UsageView />
        <PricingPlans />
        <BillingHistory />
        {/* <PaymentUpdateModal /> */}
      </div>
    </Layout>
  );
};

export default EmployerSubscription;