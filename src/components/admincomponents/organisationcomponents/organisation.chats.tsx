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
} from "chart.js";
import { adminAPI } from "../../../api/apiConfig";
import OrganizationListPopup from "./OrganizationListPopup";

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
    const [viewMode, setViewMode] = useState<'category' | 'individual'>('category');
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

    const [categorizedDistributionData, setCategorizedDistributionData] = useState({
        labels: ["Sports Organizations", "Creative Arts", "Performing Arts", "Corporate Offices", "Healthcare", "Education"],
        datasets: [
            {
                label: "Clients",
                data: [0, 0, 0, 0, 0, 0],
                backgroundColor: ["#00A859", "#00A859", "#00A859", "#00A859", "#00A859", "#00A859"],
                borderRadius: 4,
            },
        ],
    });

    const toggleViewMode = () => {
        setViewMode((prevMode) => (prevMode === 'category' ? 'individual' : 'category'));
    };

    // Enhanced organization categorization logic
    const categorizeOrganizations = (orgData: { labels: string[], data: number[] }) => {
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
                "football", "boxing", "racing", "sports", "athletic", "fitness",
                "gym", "soccer", "basketball", "tennis", "golf", "swimming",
                "baseball", "hockey", "volleyball", "track", "field"
            ],
            "Creative Arts": [
                "fashion", "design", "art", "creative", "studio", "gallery",
                "photography", "graphic", "interior", "architecture", "sculpture",
                "painting", "digital", "animation", "illustration"
            ],
            "Performing Arts": [
                "music", "singing", "dance", "theater", "performance", "concert",
                "orchestra", "band", "opera", "ballet", "drama", "acting",
                "musical", "entertainment", "production"
            ],
            "Corporate Offices": [
                "corporate", "office", "business", "company", "enterprise", "firm",
                "consulting", "services", "solutions", "technology", "tech", "software",
                "startup", "venture", "holding", "group", "associates"
            ],
            "Healthcare": [
                "health", "medical", "hospital", "clinic", "wellness", "therapy",
                "pharmacy", "dental", "rehab", "nursing", "care", "treatment",
                "diagnostic", "surgical", "physician", "healthcare"
            ],
            "Education": [
                "school", "university", "college", "academy", "education", "learning",
                "institute", "training", "center", "tutorial", "course", "program",
                "educational", "teaching", "student", "academic"
            ]
        };

        const categorizedData: { [key: string]: number } = {
            "Sports Organizations": 0,
            "Creative Arts": 0,
            "Performing Arts": 0,
            "Corporate Offices": 0,
            "Healthcare": 0,
            "Education": 0
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
                if (keywords.some(keyword => lowerOrgName.includes(keyword))) {
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
            data: Object.values(categorizedData)
        };
    };

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                // Fetch growth chart data
                const growthResponse = await adminAPI.getOrganizationsGrowthChart();
                if (growthResponse.data && growthResponse.data.labels && growthResponse.data.data) {
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
                const distributionResponse = await adminAPI.getOrganizationsClientDistribution();
                if (distributionResponse.data && distributionResponse.data.labels && distributionResponse.data.data) {
                    // Create an array of the same color for each organization
                    const colors = Array(distributionResponse.data.data.length).fill("#00A859");

                    // Set individual organization data
                    setDistributionData({
                        labels: distributionResponse.data.labels,
                        datasets: [
                            {
                                label: "Clients",
                                data: distributionResponse.data.data,
                                backgroundColor: colors,
                                borderRadius: 4,
                            },
                        ],
                    });

                    // Process and categorize the data
                    const categorizedData = categorizeOrganizations({
                        labels: distributionResponse.data.labels,
                        data: distributionResponse.data.data
                    });

                    // Create colors for categories
                    const categoryColors: string[] = Array(categorizedData.data.length).fill("#00A859");

                    setCategorizedDistributionData({
                        labels: categorizedData.labels,
                        datasets: [
                            {
                                label: "Clients",
                                data: categorizedData.data,
                                backgroundColor: categoryColors,
                                borderRadius: 4,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error("Error fetching chart data:", error);
                // Keep using default data if API calls fail
            }
        };

        fetchChartData();
    }, []);

    const chartOptions = {
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
                ticks: {
                    color: "#6c757d",
                },
                grid: {
                    color: "#e9ecef",
                },
            },
        },
        onClick: () => {
            setShowOrganizationPopup(true);
        },
        onHover: (event: any, activeElements: any[]) => {
            event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
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
                            <Line data={growthData} options={chartOptions} />
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
                                    {viewMode === 'category' ? 'Client Distribution by Category' : 'Client Distribution by Organization'}
                                </Card.Title>

                                {/* Toggle Button Group */}
                                <div className="btn-group" role="group" style={{ fontSize: '0.75rem' }}>
                                    <button
                                        type="button"
                                        className={`btn ${viewMode === 'category' ? 'btn-success' : 'btn-outline-success'}`}
                                        onClick={() => setViewMode('category')}
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                                    >
                                        Categories
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn ${viewMode === 'individual' ? 'btn-success' : 'btn-outline-success'}`}
                                        onClick={() => setViewMode('individual')}
                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}
                                    >
                                        Individual
                                    </button>
                                </div>
                            </div>

                            {/* Chart based on view mode */}
                            <Bar
                                data={viewMode === 'category' ? categorizedDistributionData : distributionData}
                                options={chartOptions}
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
