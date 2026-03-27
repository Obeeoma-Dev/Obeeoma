import React, { useState, useEffect } from "react";
import { Button, Card, Form, Modal, Row, Col, Alert } from "react-bootstrap";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

export interface SubscriptionPlan {
  id: string;
  name: string;
  organization: string;
  monthlyPrice?: number;
  annualPrice?: number;
  employeeLimit?: number;
  features: string[];
  isPopular?: boolean;
}

// Default subscription plans
// Format price in Naira
const formatPrice = (price: number): string => {
  if (price === 0) return "Free";
  return `₦${price.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const defaultPlans: SubscriptionPlan[] = [
  {
    id: "1",
    name: "Freemium",
    organization: "Obeema",
    features: [
      "Access to basic resources",
      "Monthly check-ins",
      "Email support",
    ],
    monthlyPrice: 0,
    annualPrice: 0,
    employeeLimit: 10,
    isPopular: false,
  },
  {
    id: "2",
    name: "Premium",
    organization: "Obeema",
    features: [
      "Access to basic resources",
      "Monthly check-ins",
      "Email support",
      "Access to live webinars",
      "Client engagement tools",
      "Advanced analytics",
      "Custom integrations",
      "Priority support",
    ],
    monthlyPrice: 24990,
    annualPrice: 249900,
    employeeLimit: 0,
    isPopular: true,
  },
  {
    id: "3",
    name: "Enterprise",
    organization: "Obeema",
    features: [
      "All Premium features",
      "Dedicated account manager",
      "Custom branding",
      "API access",
      "SLA guarantee",
      "24/7 phone support",
    ],
    monthlyPrice: 99990,
    annualPrice: 999900,
    employeeLimit: 0,
    isPopular: false,
  },
];

const SubscriptionSettingsComp: React.FC = () => {
  // State for plans
  const [plans, setPlans] = useState<SubscriptionPlan[]>(() => {
    const stored = localStorage.getItem("subscriptionPlans");
    return stored ? JSON.parse(stored) : defaultPlans;
  });

  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  // Form state
  const [formData, setFormData] = useState<SubscriptionPlan>({
    id: "",
    name: "",
    organization: "Obeema",
    monthlyPrice: 0,
    annualPrice: 0,
    employeeLimit: 10,
    features: [],
    isPopular: false,
  });

  // Feature input
  const [featureInput, setFeatureInput] = useState("");

  // Feedback state
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Save to localStorage when plans change
  useEffect(() => {
    localStorage.setItem("subscriptionPlans", JSON.stringify(plans));
  }, [plans]);

  // Open modal for new plan
  const handleAddNew = () => {
    setEditingPlan(null);
    setFormData({
      id: Date.now().toString(),
      name: "",
      organization: "Obeema",
      monthlyPrice: 0,
      annualPrice: 0,
      employeeLimit: 10,
      features: [],
      isPopular: false,
    });
    setShowModal(true);
  };

  // Open modal for editing
  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setFormData({ ...plan });
    setShowModal(true);
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? parseFloat(value) || 0
            : value,
    }));
  };

  // Add feature
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  // Remove feature
  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  // Save plan
  const handleSave = () => {
    if (!formData.name.trim()) {
      return;
    }

    setPlans((prev) => {
      if (editingPlan) {
        return prev.map((p) => (p.id === editingPlan.id ? formData : p));
      }
      return [...prev, formData];
    });

    setShowModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Delete plan
  const handleDelete = (id: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    setDeleteSuccess(true);
    setTimeout(() => setDeleteSuccess(false), 3000);
  };

  return (
    <>
      <Card className="settings-card-compact shadow-sm border-0">
        <Card.Header className="fw-semibold mb-2 ps-0">
          Subscription Tiers
        </Card.Header>

        {/* Success messages */}
        {saveSuccess && (
          <Alert
            variant="success"
            className="d-flex align-items-center py-2 px-3 mb-3"
          >
            <Save size={16} className="me-2" />
            Plan saved successfully!
          </Alert>
        )}

        {deleteSuccess && (
          <Alert
            variant="danger"
            className="d-flex align-items-center py-2 px-3 mb-3"
          >
            <Trash2 size={16} className="me-2" />
            Plan deleted successfully!
          </Alert>
        )}

        {/* Plans Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
            padding: "0.75rem 0",
          }}
        >
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`position-relative bg-white rounded shadow-sm border-2 h-100 ${
                plan.isPopular ? "border-success" : "border-secondary"
              }`}
              style={{ transition: "all 0.3s ease" }}
            >
              {plan.isPopular && (
                <div
                  className="position-absolute start-50 translate-middle-x"
                  style={{ top: "-12px", zIndex: 1 }}
                >
                  <span className="badge bg-success px-3 py-1 text-sm fw-semibold rounded-pill">
                    Most Popular
                  </span>
                </div>
              )}

              <Card.Body className="p-3 d-flex flex-column">
                {/* Organization */}
                <div className="mb-2">
                  <span className="badge bg-success px-2 py-1 text-xs rounded-pill">
                    {plan.organization}
                  </span>
                </div>

                {/* Name */}
                <h5 className="fw-bold text-dark mb-2">{plan.name}</h5>

                {/* Pricing */}
                <div className="mb-3">
                  <span
                    className="fw-bold text-dark"
                    style={{ fontSize: "1.5rem" }}
                  >
                    {formatPrice(plan.monthlyPrice || 0)}
                  </span>
                  {plan.monthlyPrice !== 0 && (
                    <span className="text-muted ms-1">/month</span>
                  )}
                </div>

                {/* Employee Limit */}
                <div className="mb-3 pb-2 border-bottom">
                  <small className="text-muted">
                    {plan.employeeLimit === 0
                      ? "Unlimited employees"
                      : `Up to ${plan.employeeLimit} employees`}
                  </small>
                </div>

                {/* Features */}
                <ul className="list-unstyled mb-3 flex-grow-1" role="list">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="d-flex align-items-start mb-1">
                      <span className="text-success me-2">✓</span>
                      <small className="text-dark">{feature}</small>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-muted small">
                      +{plan.features.length - 4} more
                    </li>
                  )}
                </ul>

                {/* Action Buttons */}
                <div className="d-flex gap-2 mt-auto">
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                    onClick={() => handleEdit(plan)}
                  >
                    <Pencil size={14} />
                    Edit
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => handleDelete(plan.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Card>

      {/* Add New Plan Button */}
      <div className="d-flex justify-content-end mt-3">
        <Button
          variant="success"
          onClick={handleAddNew}
          className="d-flex align-items-center gap-2"
        >
          <Plus size={18} />
          Add New Tier
        </Button>
      </div>

      {/* Edit/Create Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingPlan ? "Edit Plan" : "Add New Plan"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Premium"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Organization</Form.Label>
                  <Form.Control
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder="e.g., Obeema"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Monthly Price (₦)</Form.Label>
                  <Form.Control
                    type="number"
                    name="monthlyPrice"
                    value={formData.monthlyPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Annual Price (₦)</Form.Label>
                  <Form.Control
                    type="number"
                    name="annualPrice"
                    value={formData.annualPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Employee Limit (0 = Unlimited)</Form.Label>
                  <Form.Control
                    type="number"
                    name="employeeLimit"
                    value={formData.employeeLimit}
                    onChange={handleChange}
                    min="0"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="d-flex align-items-center h-100">
                  <Form.Check
                    type="checkbox"
                    name="isPopular"
                    label="Mark as Most Popular"
                    checked={formData.isPopular}
                    onChange={handleChange}
                    className="mt-4"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Features</Form.Label>
              <div className="d-flex gap-2 mb-2">
                <Form.Control
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddFeature())
                  }
                />
                <Button variant="outline-success" onClick={handleAddFeature}>
                  <Plus size={18} />
                </Button>
              </div>
              <ul className="list-group">
                {formData.features.map((feature, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>{feature}</span>
                    <Button
                      variant="link"
                      className="text-danger p-0"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <X size={16} />
                    </Button>
                  </li>
                ))}
              </ul>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSave}>
            <Save size={16} className="me-2" />
            Save Plan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SubscriptionSettingsComp;
