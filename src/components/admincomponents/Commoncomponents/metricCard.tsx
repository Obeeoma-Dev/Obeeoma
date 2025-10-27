// Import React and required Bootstrap components
import React from "react";
import { Card, Button } from "react-bootstrap";

// Import all icons from lucide-react as a dynamic map
import * as Icons from "lucide-react";

/**
 * Shared type definition for dashboard metric cards.
 * Used by both OrganizationStats and BottomMetrics.
 */
export type StatCard = {
    id: string; // Unique identifier for React keys
    title: string; // Metric title 
    value: string | number; // Display value 
    subtitle?: string; // Optional description
    linkText?: string; // Optional CTA link
    icon?: string | keyof typeof Icons; // Optional icon name from lucide-react
    color?: string; // Optional color key
    change?: number; // Optional percentage change
};

/**
 * MetricCard component displays a single metric block.
 * Can be reused across multiple dashboard sections.
 */
const MetricCard: React.FC<StatCard> = ({
    title,
    value,
    subtitle,
    linkText,
    icon,
    color = "emerald",
    change,
}) => {
    // Dynamically select icon from lucide-react
    const IconComponent =
        (Icons[icon as keyof typeof Icons] ?? Icons.Activity) as React.FC<{
            size?: number;
            color?: string;
        }>;

    // Define color palette for icons
    const colorMap: Record<string, string> = {
        emerald: "#3CB371",
        blue: "#3CB371",
        purple: "#3CB371",
        pink: "#3CB371",
    };

    // Fallback to emerald if color key is missing
    const iconColor = colorMap[color] || colorMap.emerald;

    return (
        // Bootstrap card container
        <Card className="shadow-sm border-0 h-100">
            <Card.Body>
                {/* Top section: icon and title */}
                <div className="d-flex align-items-start gap-2 mb-2">
                    {/* Icon container */}
                    <div
                        className="rounded d-flex align-items-center justify-content-center"
                        style={{ width: "24px", height: "24px" }}
                    >
                        <IconComponent size={20} color={iconColor} />
                    </div>

                    {/* Metric title */}
                    <h6 className="text-muted fw-semibold mb-0">{title}</h6>
                </div>

                {/* Main value */}
                <h3 className="fw-bold mb-2">{value}</h3>

                {/* Optional subtitle */}
                {subtitle && <p className="text-muted small mb-2">{subtitle}</p>}

                {/* Optional percentage change */}
                {change !== undefined && (
                    <p className="text-muted small mb-2">
                        <span className="text-success">+{change}%</span> this month
                    </p>
                )}

                {/* Optional link CTA */}
                {linkText && (
                    <Button
                        variant="link"
                        className="p-0 text-success d-flex align-items-center gap-2"
                    >
                        <span>{linkText}</span>
                        <Icons.ArrowRight size={16} />
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default MetricCard;