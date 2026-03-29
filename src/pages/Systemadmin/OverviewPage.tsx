import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  Modal,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  Users,
  Building2,
  CreditCard,
  PhoneCall,
  Upload,
  Download,
  FileText,
  Calendar,
  Filter,
  Plus,
} from "lucide-react";
import { adminAPI } from "../../api/apiConfig";

interface DashboardStats {
  totalOrganizations: number;
  totalClients: number;
  monthlyRevenue: number;
  hotlineCallsToday: number;
}

interface PlatformUsageData {
  week: string;
  value: number;
}

interface SubscriptionData {
  month: string;
  value: number;
}

const OverviewPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrganizations: 0,
    totalClients: 0,
    monthlyRevenue: 0,
    hotlineCallsToday: 0,
  });
  const [platformUsage, setPlatformUsage] = useState<PlatformUsageData[]>([]);
  const [subscriptionRevenue, setSubscriptionRevenue] = useState<
    SubscriptionData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Report upload state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Report generation form state
  const [reportForm, setReportForm] = useState({
    reportType: "Platform Usage",
    dateRange: "Last 30 Days",
    format: "PDF",
    customStartDate: "",
    customEndDate: "",
  });

  // Fetch dashboard data
  React.useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dashboard summary
        const dashboardResponse = await adminAPI.getDashboardSummary();
        const data = dashboardResponse.data || dashboardResponse;

        // Transform stats
        setStats({
          totalOrganizations: data.total_organizations || 0,
          totalClients: data.total_clients || 0,
          monthlyRevenue: data.monthly_revenue || 0,
          hotlineCallsToday: data.hotline_calls_today || 0,
        });

        // Transform platform usage data
        const usage = data.platform_usage || [];
        setPlatformUsage(
          usage.map((u: { week_number: number; usage_count: number }) => ({
            week: `Week ${u.week_number}`,
            value: u.usage_count,
          })),
        );

        // Transform subscription revenue data
        const revenue = data.subscription_revenue || [];
        setSubscriptionRevenue(
          revenue.map((r: { month: string; revenue: number }) => ({
            month: r.month,
            value: r.revenue,
          })),
        );
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle file upload
  const handleFileUpload = async () => {
    if (!uploadFile) {
      alert("Please select a file to upload");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("reportType", reportForm.reportType);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Here you would make actual API call
      // await adminAPI.uploadReport(formData);

      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadProgress(100);
        setTimeout(() => {
          setUploading(false);
          setShowUploadModal(false);
          setUploadFile(null);
          setUploadProgress(0);
          alert("Report uploaded successfully!");
        }, 500);
      }, 2000);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload report");
      setUploading(false);
    }
  };

  // Handle report generation
  const handleGenerateReport = async () => {
    try {
      // Here you would make actual API call
      // await adminAPI.generateReport(reportForm);
      alert(
        `Generating ${reportForm.reportType} report for ${reportForm.dateRange} in ${reportForm.format} format`,
      );
      setShowGenerateModal(false);
    } catch (err) {
      console.error("Generation error:", err);
      alert("Failed to generate report");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Spinner animation="border" variant="success" />
        <span className="ms-3">Loading overview...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* Header with Actions */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h3 mb-1 fw-bold" style={{ fontFamily: "heading" }}>
                System Overview
              </h1>
              <p className="text-muted mb-0">
                Real-time platform metrics and analytics
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button
                variant="outline-success"
                className="d-flex align-items-center gap-2"
                onClick={() => setShowUploadModal(true)}
              >
                <Upload size={18} />
                Upload Report
              </Button>
              <Button
                variant="success"
                className="d-flex align-items-center gap-2"
                onClick={() => setShowGenerateModal(true)}
              >
                <FileText size={18} />
                Generate Report
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 small">Total Organizations</p>
                  <h3 className="mb-0 fw-bold">{stats.totalOrganizations}</h3>
                  <Badge bg="success" className="mt-2">
                    <TrendingUp size={12} className="me-1" />
                    +12% this month
                  </Badge>
                </div>
                <div className="text-success">
                  <Building2 size={32} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 small">Total Clients</p>
                  <h3 className="mb-0 fw-bold">
                    {stats.totalClients.toLocaleString()}
                  </h3>
                  <Badge bg="success" className="mt-2">
                    <TrendingUp size={12} className="me-1" />
                    +8% this week
                  </Badge>
                </div>
                <div className="text-primary">
                  <Users size={32} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 small">Monthly Revenue</p>
                  <h3 className="mb-0 fw-bold">
                    ${stats.monthlyRevenue.toLocaleString()}
                  </h3>
                  <Badge bg="success" className="mt-2">
                    <TrendingUp size={12} className="me-1" />
                    +15% growth
                  </Badge>
                </div>
                <div className="text-warning">
                  <CreditCard size={32} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-muted mb-1 small">Hotline Calls Today</p>
                  <h3 className="mb-0 fw-bold">{stats.hotlineCallsToday}</h3>
                  <Badge bg="info" className="mt-2">
                    <PhoneCall size={12} className="me-1" />
                    Active now
                  </Badge>
                </div>
                <div className="text-info">
                  <PhoneCall size={32} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row className="g-4">
        {/* Platform Usage Chart */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 pt-4 pb-0">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1 fw-semibold">Platform Usage Overview</h5>
                  <p className="text-muted mb-0 small">
                    Weekly active users and engagement
                  </p>
                </div>
                <Button variant="outline-light" size="sm">
                  <Filter size={16} />
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                {platformUsage.length > 0 ? (
                  <AreaChart
                    data={platformUsage}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorUsage"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3CB371"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3CB371"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="week"
                      tick={{ fill: "#6c757d", fontSize: 12 }}
                      axisLine={{ stroke: "#e9ecef" }}
                      tickLine={{ stroke: "#e9ecef" }}
                    />
                    <YAxis
                      tick={{ fill: "#6c757d", fontSize: 12 }}
                      axisLine={{ stroke: "#e9ecef" }}
                      tickLine={{ stroke: "#e9ecef" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e9ecef",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3CB371"
                      strokeWidth={2}
                      fill="url(#colorUsage)"
                    />
                  </AreaChart>
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                    <div className="text-center">
                      <div className="mb-3">
                        <TrendingUp size={48} className="text-muted" />
                      </div>
                      <h6 className="text-muted mb-2">
                        No Platform Activity Yet
                      </h6>
                      <p className="text-muted small mb-0">
                        Platform usage data will be displayed here as users
                        begin engaging with the system
                      </p>
                    </div>
                  </div>
                )}
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Subscription Revenue Chart */}
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 pt-4 pb-0">
              <div>
                <h5 className="mb-1 fw-semibold">Revenue Trends</h5>
                <p className="text-muted mb-0 small">
                  Monthly subscription revenue
                </p>
              </div>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                {subscriptionRevenue.length > 0 ? (
                  <BarChart
                    data={subscriptionRevenue}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "#6c757d", fontSize: 12 }}
                      axisLine={{ stroke: "#e9ecef" }}
                      tickLine={{ stroke: "#e9ecef" }}
                    />
                    <YAxis
                      tick={{ fill: "#6c757d", fontSize: 12 }}
                      axisLine={{ stroke: "#e9ecef" }}
                      tickLine={{ stroke: "#e9ecef" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e9ecef",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="value" fill="#3CB371" radius={[8, 8, 0, 0]} />
                  </BarChart>
                ) : (
                  <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                    <div className="text-center">
                      <div className="mb-3">
                        <CreditCard size={48} className="text-muted" />
                      </div>
                      <h6 className="text-muted mb-2">
                        No Revenue Data Available
                      </h6>
                      <p className="text-muted small mb-0">
                        Subscription revenue information will appear here as
                        organizations subscribe to services
                      </p>
                    </div>
                  </div>
                )}
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Upload Report Modal */}
      <Modal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Report Type</Form.Label>
              <Form.Select
                value={reportForm.reportType}
                onChange={(e) =>
                  setReportForm({ ...reportForm, reportType: e.target.value })
                }
              >
                <option value="Platform Usage">Platform Usage</option>
                <option value="Health Conditions">Health Conditions</option>
                <option value="Treatment Outcomes">Treatment Outcomes</option>
                <option value="Organization Performance">
                  Organization Performance
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select File</Form.Label>
              <Form.Control
                type="file"
                ref={fileInputRef}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUploadFile(e.target.files?.[0] || null)
                }
                accept=".pdf,.xlsx,.csv"
              />
              <Form.Text className="text-muted">
                Supported formats: PDF, Excel, CSV (Max 10MB)
              </Form.Text>
            </Form.Group>
            {uploading && (
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <ProgressBar now={uploadProgress} variant="success" />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleFileUpload}
            disabled={uploading || !uploadFile}
          >
            {uploading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={16} className="me-2" />
                Upload
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Generate Report Modal */}
      <Modal
        show={showGenerateModal}
        onHide={() => setShowGenerateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Generate Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Report Type</Form.Label>
              <Form.Select
                value={reportForm.reportType}
                onChange={(e) =>
                  setReportForm({ ...reportForm, reportType: e.target.value })
                }
              >
                <option value="Platform Usage">Platform Usage</option>
                <option value="Health Conditions">Health Conditions</option>
                <option value="Treatment Outcomes">Treatment Outcomes</option>
                <option value="Organization Performance">
                  Organization Performance
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Range</Form.Label>
              <Form.Select
                value={reportForm.dateRange}
                onChange={(e) =>
                  setReportForm({ ...reportForm, dateRange: e.target.value })
                }
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="Last Year">Last Year</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Format</Form.Label>
              <Form.Select
                value={reportForm.format}
                onChange={(e) =>
                  setReportForm({ ...reportForm, format: e.target.value })
                }
              >
                <option value="PDF">PDF</option>
                <option value="Excel">Excel</option>
                <option value="CSV">CSV</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowGenerateModal(false)}
          >
            Cancel
          </Button>
          <Button variant="success" onClick={handleGenerateReport}>
            <Download size={16} className="me-2" />
            Generate Report
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OverviewPage;
