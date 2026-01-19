import React from "react";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { StatCardData } from "./admindashboard";
import { HoverStatCard } from "../Hotlinecomponents/hoverCard";

interface DashboardStatCardProps {
    data: StatCardData;
}

const colorMap = {
    success: "emerald",
    primary: "blue",
    warning: "amber",
    danger: "rose",
} as const;

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({ data }) => {

    const Icon =
        (Icons[data.icon as keyof typeof Icons] ??
            Icons.Activity) as LucideIcon;


    const color =
        data.iconColor.includes("success") ? "emerald" :
            data.iconColor.includes("primary") ? "blue" :
                data.iconColor.includes("warning") ? "amber" :
                    "rose";

    return (
        <HoverStatCard
            title={data.title}
            value={data.value}
            subtitle="Updated recently"
            trend={data.change}
            icon={Icon}
            color={color}
        />
    );
};

export default DashboardStatCard;
