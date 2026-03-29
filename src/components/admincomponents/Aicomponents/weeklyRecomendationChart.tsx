import React from "react";
import { Card } from "react-bootstrap";
import { FileTextIcon, VideoIcon, HeadphonesIcon, ZapIcon } from "lucide-react";
import "./weeklyRecommendationChart.css";

type ResourceType = "Article" | "Video" | "Audio" | "Interactive";

type Resource = {
  name: string;
  type: ResourceType;
  timesThisWeek: number;
};

const typeConfig: Record<
  ResourceType,
  {
    icon: React.ReactNode;
    badgeClass: string;
  }
> = {
  Article: {
    icon: <FileTextIcon size={16} />,
    badgeClass: "resource-type-badge article",
  },
  Video: {
    icon: <VideoIcon size={16} />,
    badgeClass: "resource-type-badge video",
  },
  Audio: {
    icon: <HeadphonesIcon size={16} />,
    badgeClass: "resource-type-badge audio",
  },
  Interactive: {
    icon: <ZapIcon size={16} />,
    badgeClass: "resource-type-badge interactive",
  },
};

const resources: Resource[] = [
  {
    name: "Anxiety Management Techniques",
    type: "Article",
    timesThisWeek: 156,
  },
  {
    name: "Breathing Exercises for Anxiety",
    type: "Video",
    timesThisWeek: 243,
  },
  {
    name: "Understanding Panic Attacks",
    type: "Article",
    timesThisWeek: 124,
  },
  {
    name: "Guided Meditation for Relief",
    type: "Audio",
    timesThisWeek: 198,
  },
  {
    name: "Social Anxiety Coping Strategies",
    type: "Interactive",
    timesThisWeek: 87,
  },
];

export function ResourceRecommendations() {
  return (
    <div className="resource-recommendations-container">
      <div className="resource-recommendations-header">
        <h3 className="resource-recommendations-title">
          Recommended Resources
        </h3>
        <p className="resource-recommendations-subtitle">
          Uploaded resources the AI is sharing with users
        </p>
      </div>

      <div className="resource-recommendations-list">
        {resources.map((resource) => {
          const config = typeConfig[resource.type];
          return (
            <div key={resource.name} className="resource-item">
              {/* Icon */}
              <div className="resource-icon-container">{config.icon}</div>

              {/* Name + Badge */}
              <div className="resource-content">
                <p className="resource-name">{resource.name}</p>
                <span className={config.badgeClass}>{resource.type}</span>
              </div>

              {/* Times */}
              <div className="resource-stats">
                <span className="resource-count">
                  {resource.timesThisWeek.toLocaleString()}
                </span>
                <p className="resource-label">this week</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResourceRecommendations;
