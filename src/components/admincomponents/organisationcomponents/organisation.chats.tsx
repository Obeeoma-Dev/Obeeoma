import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import { adminAPI } from "../../../api/apiConfig";
import OrganizationListPopup from "./OrganizationListPopup";

// Define interfaces for better type safety
interface OrganizationData {
  name?: string;
  organizationName?: string;
  client_count?: number;
  clients?: number;
}

interface OrganizationWithIndex {
  name: string;
  clients: number;
  index: number;
}

interface ChartCallbackContext {
  chart: ChartJS;
  tick: {
    value: number;
    label: string;
  };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

/**
 * OrganizationCharts component displays two charts:
 * - Line chart for organization growth over time
 * - Bar chart for client distribution across organizations (with category grouping)
 * Now uses real data from backend APIs with intelligent categorization.
 */
const OrganizationCharts: React.FC = () => {
  const [viewMode, setViewMode] = useState<"category" | "individual">(
    "category",
  );
  const [showOrganizationPopup, setShowOrganizationPopup] = useState(false);

  const [growthData, setGrowthData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Organization Growth",
        data: [5, 10, 15, 25, 35, 42],
        borderColor: "#00A859", // Bootstrap green
        backgroundColor: "rgba(40,167,69,0.2)",
        tension: 0.4, // Smooth curve
      },
    ],
  });

  const [distributionData, setDistributionData] = useState({
    labels: ["Wellness Center", "Community Mental Health", "Urban Outreach"],
    datasets: [
      {
        label: "Clients",
        data: [284, 194, 134],
        backgroundColor: ["#00A859", "#00A859", "#00A859"],
        borderRadius: 4,
      },
    ],
  });

  const [categorizedDistributionData, setCategorizedDistributionData] =
    useState({
      labels: [
        "Sports Organizations",
        "Creative Arts",
        "Performing Arts",
        "Corporate Offices",
        "Healthcare",
        "Education",
      ],
      datasets: [
        {
          label: "Clients",
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: [
            "#00A859",
            "#00A859",
            "#00A859",
            "#00A859",
            "#00A859",
            "#00A859",
          ],
          borderRadius: 4,
        },
      ],
    });

  const toggleViewMode = () => {
    setViewMode((prevMode) =>
      prevMode === "category" ? "individual" : "category",
    );
  };

  // Enhanced organization categorization logic
  const categorizeOrganizations = (orgData: {
    labels: string[];
    data: number[];
  }) => {
    // Manual mapping for known organizations (more reliable than keywords)
    const manualMappings: { [key: string]: string } = {
      "Wellness Center Inc.": "Healthcare",
      "Community Mental Health": "Healthcare",
      "Urban Outreach": "Corporate Offices",
      // Add more known organizations as needed
    };

    // Enhanced keyword categories with more comprehensive terms
    const categories = {
      "Sports Organizations": [
        "football",
        "boxing",
        "racing",
        "sports",
        "athletic",
        "fitness",
        "gym",
        "soccer",
        "basketball",
        "tennis",
        "golf",
        "swimming",
        "baseball",
        "hockey",
        "volleyball",
        "track",
        "field",
      ],
      "Creative Arts": [
        "fashion",
        "design",
        "art",
        "creative",
        "studio",
        "gallery",
        "photography",
        "graphic",
        "interior",
        "architecture",
        "sculpture",
        "painting",
        "digital",
        "animation",
        "illustration",
      ],
      "Performing Arts": [
        "music",
        "singing",
        "dance",
        "theater",
        "performance",
        "concert",
        "orchestra",
        "band",
        "opera",
        "ballet",
        "drama",
        "acting",
        "musical",
        "entertainment",
        "production",
      ],
      "Corporate Offices": [
        "corporate",
        "office",
        "business",
        "company",
        "enterprise",
        "firm",
        "consulting",
        "services",
        "solutions",
        "technology",
        "tech",
        "software",
        "startup",
        "venture",
        "holding",
        "group",
        "associates",
      ],
      Healthcare: [
        "health",
        "medical",
        "hospital",
        "clinic",
        "wellness",
        "therapy",
        "pharmacy",
        "dental",
        "rehab",
        "nursing",
        "care",
        "treatment",
        "diagnostic",
        "surgical",
        "physician",
        "healthcare",
      ],
      Education: [
        "school",
        "university",
        "college",
        "academy",
        "education",
        "learning",
        "institute",
        "training",
        "center",
        "tutorial",
        "course",
        "program",
        "educational",
        "teaching",
        "student",
        "academic",
      ],
    };

    const categorizedData: { [key: string]: number } = {
      "Sports Organizations": 0,
      "Creative Arts": 0,
      "Performing Arts": 0,
      "Corporate Offices": 0,
      Healthcare: 0,
      Education: 0,
    };

    // Categorize each organization
    orgData.labels.forEach((orgName, index) => {
      const clientCount = orgData.data[index];
      const lowerOrgName = orgName.toLowerCase();

      // First check manual mapping
      if (manualMappings[orgName]) {
        categorizedData[manualMappings[orgName]] += clientCount;
        return;
      }

      // Then check keyword matching
      let categorized = false;
      for (const [category, keywords] of Object.entries(categories)) {
        if (keywords.some((keyword) => lowerOrgName.includes(keyword))) {
          categorizedData[category] += clientCount;
          categorized = true;
          break;
        }
      }

      // If no category matches, put in Corporate Offices as default
      if (!categorized) {
        categorizedData["Corporate Offices"] += clientCount;
      }
    });

    return {
      labels: Object.keys(categorizedData),
      data: Object.values(categorizedData),
    };
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        // Fetch growth chart data
        const growthResponse = await adminAPI.getOrganizationsGrowthChart();
        if (
          growthResponse.data &&
          growthResponse.data.labels &&
          growthResponse.data.data
        ) {
          setGrowthData({
            labels: growthResponse.data.labels,
            datasets: [
              {
                label: "Organization Growth",
                data: growthResponse.data.data,
                borderColor: "#00A859",
                backgroundColor: "rgba(40,167,69,0.2)",
                tension: 0.4,
              },
            ],
          });
        }

        // Fetch client distribution data
        const distributionResponse =
          await adminAPI.getOrganizationsClientDistribution();
        console.log("Distribution API Response:", distributionResponse);
        console.log("Distribution data structure:", distributionResponse.data);

        // Handle different response structures
        let orgLabels: string[] = [];
        let orgData: number[] = [];

        if (Array.isArray(distributionResponse.data)) {
          // API returns array of objects directly
          console.log("API returns array of organization objects");
          orgLabels = distributionResponse.data.map(
            (org: OrganizationData) =>
              org.name || org.organizationName || "Unknown",
          );
          orgData = distributionResponse.data.map(
            (org: OrganizationData) => org.client_count || org.clients || 0,
          );
        } else if (
          distributionResponse.data &&
          distributionResponse.data.labels &&
          distributionResponse.data.data
        ) {
          // API returns object with labels and data arrays
          console.log("API returns object with labels and data");
          orgLabels = distributionResponse.data.labels;
          orgData = distributionResponse.data.data;
        }

        console.log("Processed labels:", orgLabels);
        console.log("Processed data:", orgData);

        if (orgLabels.length > 0 && orgData.length > 0) {
          console.log("Processing distribution data...");
          // Create arrays with organization data and their indices
          const orgDataWithIndex = orgLabels.map(
            (label: string, index: number) => ({
              name: label,
              clients: orgData[index],
              index: index,
            }),
          );

          // Sort by index (assuming API returns in creation order, latest first)
          // If API doesn't return in order, we'd need to add creation dates
          const latestThreeOrgs = orgDataWithIndex.slice(-3); // Take last 3 (latest organizations)

          console.log(
            "All organizations:",
            orgDataWithIndex.map((o: OrganizationWithIndex) => o.name),
          );
          console.log(
            "Latest 3 organizations:",
            latestThreeOrgs.map((o: OrganizationWithIndex) => o.name),
          );

          const newDistributionData = {
            labels: latestThreeOrgs.map(
              (org: OrganizationWithIndex) => org.name,
            ),
            datasets: [
              {
                label: "Clients",
                data: latestThreeOrgs.map(
                  (org: OrganizationWithIndex) => org.clients,
                ),
                backgroundColor: Array(3).fill("#00A859"),
                borderRadius: 4,
              },
            ],
          };

          console.log("Setting distribution data:", newDistributionData);
          setDistributionData(newDistributionData);

          // Process and categorize the data (use full data for categories)
          const categorizedData = categorizeOrganizations({
            labels: orgLabels,
            data: orgData,
          });

          // Create colors for categories
          const categoryColors: string[] = Array(
            categorizedData.data.length,
          ).fill("#00A859");

          const newCategorizedData = {
            labels: categorizedData.labels,
            datasets: [
              {
                label: "Clients",
                data: categorizedData.data,
                backgroundColor: categoryColors,
                borderRadius: 4,
              },
            ],
          };

          console.log("Setting categorized data:", newCategorizedData);
          setCategorizedDistributionData(newCategorizedData);
        } else {
          console.log("No valid organization data found in API response");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
        // Keep using default data if API calls fail
      }
    };

    fetchChartData();
  }, []);

  // Chart options for growth chart
  const growthChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#6c757d",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6c757d",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 2000,
        ticks: {
          color: "#6c757d",
          stepSize: 500,
          callback: function (value: string | number) {
            return value;
          },
        },
        grid: {
          color: "#e9ecef",
        },
        title: {
          display: true,
          text: "Number of Organizations",
          color: "#6c757d",
          font: {
            size: 12,
          },
        },
      },
    },
    onClick: () => {
      setShowOrganizationPopup(true);
    },
    onHover: (event: ChartEvent, activeElements: ActiveElement[]) => {
      if (event.native && "target" in event.native && event.native.target) {
        (event.native.target as HTMLElement).style.cursor =
          activeElements.length > 0 ? "pointer" : "default";
      }
    },
  };

  // Chart options for distribution chart (individual view)
  const distributionChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#6c757d",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6c757d",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 2000,
        ticks: {
          color: "#6c757d",
          stepSize: 500,
          callback: function (value: string | number) {
            return value;
          },
        },
        grid: {
          color: "#e9ecef",
        },
        title: {
          display: true,
          text: "Number of Clients",
          color: "#6c757d",
          font: {
            size: 12,
          },
        },
      },
    },
    onClick: () => {
      setShowOrganizationPopup(true);
    },
    onHover: (event: ChartEvent, activeElements: ActiveElement[]) => {
      if (event.native && "target" in event.native && event.native.target) {
        (event.native.target as HTMLElement).style.cursor =
          activeElements.length > 0 ? "pointer" : "default";
      }
    },
  };

  // Chart options for categories (vertical bars)
  const categoryChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#6c757d",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6c757d",
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 2000,
        ticks: {
          color: "#6c757d",
          stepSize: 500,
          callback: function (value: string | number) {
            return value;
          },
        },
        grid: {
          color: "#e9ecef",
        },
        title: {
          display: true,
          text: "Number of Clients",
          color: "#6c757d",
          font: {
            size: 12,
          },
        },
      },
    },
    onClick: () => {
      setShowOrganizationPopup(true);
    },
    onHover: (event: ChartEvent, activeElements: ActiveElement[]) => {
      if (event.native && "target" in event.native && event.native.target) {
        (event.native.target as HTMLElement).style.cursor =
          activeElements.length > 0 ? "pointer" : "default";
      }
    },
  };

  return (
    <>
      <Row className="mt-4">
        {/* Line Chart Card */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title
                className="fw-semibold fs-6 mb-3"
                style={{ fontFamily: "body", color: "#00A859" }}
              >
                Organization Growth
              </Card.Title>
              <Line data={growthData} options={growthChartOptions} />
            </Card.Body>
          </Card>
        </Col>

        {/* Bar Chart Card */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Body>
              {/* Header with title and toggle */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Card.Title
                  className="fw-semibold fs-6 mb-0"
                  style={{ fontFamily: "body", color: "#00A859" }}
                >
                  {viewMode === "category"
                    ? "Client Distribution by Category"
                    : "Client Distribution by Organization"}
                </Card.Title>

                {/* Toggle Button Group */}
                <div
                  className="btn-group"
                  role="group"
                  style={{ fontSize: "0.75rem" }}
                >
                  <button
                    type="button"
                    className={`btn ${viewMode === "category" ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setViewMode("category")}
                    style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem" }}
                  >
                    Categories
                  </button>
                  <button
                    type="button"
                    className={`btn ${viewMode === "individual" ? "btn-success" : "btn-outline-success"}`}
                    onClick={() => setViewMode("individual")}
                    style={{ padding: "0.25rem 0.5rem", fontSize: "0.7rem" }}
                  >
                    Individual
                  </button>
                </div>
              </div>

              {/* Chart based on view mode */}
              <Bar
                data={
                  viewMode === "category"
                    ? categorizedDistributionData
                    : distributionData
                }
                options={
                  viewMode === "category"
                    ? categoryChartOptions
                    : distributionChartOptions
                }
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Organization List Popup */}
      <OrganizationListPopup
        show={showOrganizationPopup}
        onHide={() => setShowOrganizationPopup(false)}
      />
    </>
  );
};

export default OrganizationCharts;
