import React, { useEffect, useState } from "react";
import { BarChart3, Users, MessageSquare, FileText } from "lucide-react";
import { employerAPI } from "../../../api/apiConfig";

// --- Types & Interfaces ---
interface RawFeatureData {
  id: number;
  user_email: string;
  feature: string;
  use_count: number;
  first_used_at: string;
  last_used_at: string;
}

interface FeatureDisplayData {
  feature: string;
  usage: number;
  displayCount: number;
  icon: React.ReactNode;
  color: string;
}

// --- Static Configuration ---
// Defined outside the component to prevent re-creation on every render
// and to resolve the react-hooks/exhaustive-deps warning.
const FEATURE_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; color: string }
> = {
  sana_ai: {
    label: "Sana AI",
    icon: <MessageSquare size={20} />,
    color: "#22C55E",
  },
  journalling: {
    label: "Journaling",
    icon: <BarChart3 size={20} />,
    color: "#22C55E",
  },
  educational_resources: {
    label: "Educational Resources",
    icon: <FileText size={20} />,
    color: "#22C55E",
  },
  self_assessment: {
    label: "Self Assessment",
    icon: <Users size={20} />,
    color: "#22C55E",
  },
};

const FeatureUsageBreakdown: React.FC = () => {
  const [features, setFeatures] = useState<FeatureDisplayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await employerAPI.getbreakdownusage();
        const rawData: RawFeatureData[] = response.data;

        // Aggregate use_count by feature
        const aggregated: Record<string, number> = {};
        rawData.forEach((item) => {
          if (aggregated[item.feature]) {
            aggregated[item.feature] += item.use_count;
          } else {
            aggregated[item.feature] = item.use_count;
          }
        });

        const mappedData = Object.entries(aggregated).map(
          ([featureKey, totalUseCount]) => {
            const config = FEATURE_CONFIG[featureKey] || {
              label: featureKey,
              icon: <FileText size={20} />,
              color: "#22C55E",
            };

            // Calculating percentage (Assuming 100 is the goal/max for the bar)
            const maxGoal = 100;
            const percentage = Math.min((totalUseCount / maxGoal) * 100, 100);

            return {
              feature: config.label,
              usage: percentage,
              displayCount: totalUseCount,
              icon: config.icon,
              color: config.color,
            };
          },
        );

        setFeatures(mappedData);
      } catch (error) {
        console.error("Error fetching feature usage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // dependency array is now safely empty

  if (loading)
    return <div className="p-4 text-center">Loading Usage Data...</div>;

  const overallUsage = features.length
    ? Math.round(
        features.reduce((acc, f) => acc + f.usage, 0) / features.length,
      )
    : 0;

  return (
    <div className="feature-usage-breakdown">
      <div className="d-flex align-items-center mb-4">
        <h6
          className="card-title fw-semibold mb-0"
          style={{ fontFamily: "heading" }}
        >
          Feature Usage
        </h6>
      </div>

      <div className="feature-list" style={{ fontFamily: "body" }}>
        {features.map((feature, index) => (
          <div key={index} className="feature-item mb-3">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <div
                  className="feature-icon me-2 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: `${feature.color}20`,
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>
                <span className="fw-medium small text-dark">
                  {feature.feature}
                </span>
              </div>
              <span className="small fw-semibold text-muted">
                {Math.round(feature.usage)}%
              </span>
            </div>

            <div className="progress" style={{ height: "6px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${feature.usage}%`,
                  backgroundColor: feature.color,
                  borderRadius: "3px",
                  transition: "width 0.5s ease-in-out",
                }}
                aria-valuenow={feature.usage}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-top">
        <div className="d-flex align-items-center justify-content-between">
          <h6
            className="fw-bold mb-3 text-center"
            style={{ color: "#000000", fontSize: "0.9rem" }}
          >
            Overall Usage
          </h6>
          <span className="small fw-semibold text-dark">{overallUsage}%</span>
        </div>
        <div className="progress mt-2" style={{ height: "8px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${overallUsage}%`,
              borderRadius: "4px",
              backgroundColor: "#22C55E",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureUsageBreakdown;

// import React, { useEffect, useState } from "react";
// import {
//   BarChart3,
//   Users,
//   MessageSquare,
//   FileText,
//   TrendingUp,
// } from "lucide-react";
// import { employerAPI } from "../../../api/apiConfig";

// // Matches your provided JSON structure
// interface RawFeatureData {
//   id: number;
//   user_email: string;
//   feature: string;
//   use_count: number;
//   first_used_at: string;
//   last_used_at: string;
// }

// interface FeatureDisplayData {
//   feature: string;
//   usage: number;
//   displayCount: number;
//   icon: React.ReactNode;
//   color: string;
// }

// const FeatureUsageBreakdown: React.FC = () => {
//   // Configuration to map raw 'feature' strings to UI icons and labels
//   const featureConfig: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
//     sana_ai: { label: "Sana AI", icon: <MessageSquare size={20} />, color: "#22C55E" },
//     journalling: { label: "Journaling", icon: <BarChart3 size={20} />, color: "#22C55E" },
//     educational_resources: { label: "Educational Resources", icon: <FileText size={20} />, color: "#22C55E" },
//     self_assessment: { label: "Self Assessment", icon: <Users size={20} />, color: "#22C55E" },
//   };

//   // Initialize all features with 0% usage
//   const getDefaultFeatures = (): FeatureDisplayData[] => {
//     return Object.entries(featureConfig).map(([, config]) => ({
//       feature: config.label,
//       usage: 0,
//       displayCount: 0,
//       icon: config.icon,
//       color: config.color,
//     }));
//   };

//   const [features, setFeatures] = useState<FeatureDisplayData[]>(getDefaultFeatures());
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await employerAPI.getbreakdownusage();
//         const rawData: RawFeatureData[] = response.data;

//         // Aggregate use_count by feature
//         const aggregated: Record<string, number> = {};
//         rawData.forEach((item) => {
//           if (aggregated[item.feature]) {
//             aggregated[item.feature] += item.use_count;
//           } else {
//             aggregated[item.feature] = item.use_count;
//           }
//         });

//         // Start with all features at 0% and update with actual data
//         const mappedData = Object.entries(featureConfig).map(([featureKey, config]) => {
//           const totalUseCount = aggregated[featureKey] || 0;

//           // Calculating percentage (Assuming 100 is the goal/max for the bar)
//           const maxGoal = 100;
//           const percentage = Math.min((totalUseCount / maxGoal) * 100, 100);

//           return {
//             feature: config.label,
//             usage: percentage,
//             displayCount: totalUseCount,
//             icon: config.icon,
//             color: config.color,
//           };
//         });

//         setFeatures(mappedData);
//       } catch (error) {
//         console.error("Error fetching feature usage:", error);
//         // On error, keep showing all features with 0%
//         setFeatures(getDefaultFeatures());
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div className="p-4 text-center">Loading Usage Data...</div>;

//   const overallUsage = features.length
//     ? Math.round(features.reduce((acc, f) => acc + f.usage, 0) / features.length)
//     : 0;
//   return (
//     <div className="feature-usage-breakdown">
//       <div className="d-flex align-items-center mb-4">
//         {/* <TrendingUp size={20} className="text-primary me-2" /> */}
//         <h6 className="card-title fw-semibold mb-0" style={{ fontFamily: "heading" }}>
//           Feature Usage
//         </h6>
//       </div>

//       <div className="feature-list" style={{ fontFamily: "body" }}>
//         {features.map((feature, index) => (
//           <div key={index} className="feature-item mb-3">
//             <div className="d-flex align-items-center justify-content-between mb-2">
//               <div className="d-flex align-items-center">
//                 <div
//                   className="feature-icon me-2 rounded-circle d-flex align-items-center justify-content-center"
//                   style={{
//                     width: "32px",
//                     height: "32px",
//                     backgroundColor: `${feature.color}20`,
//                     color: feature.color,
//                   }}
//                 >
//                   {feature.icon}
//                 </div>
//                 <span className="fw-medium small text-dark">{feature.feature}</span>
//               </div>
//               <span className="small fw-semibold text-muted">
//                 {Math.round(feature.usage)}%
//               </span>
//             </div>

//             <div className="progress" style={{ height: "6px" }}>
//               <div
//                 className="progress-bar"
//                 role="progressbar"
//                 style={{
//                   width: `${feature.usage}%`,
//                   backgroundColor: feature.color,
//                   borderRadius: "3px",
//                   transition: "width 0.5s ease-in-out"
//                 }}
//                 aria-valuenow={feature.usage}
//                 aria-valuemin={0}
//                 aria-valuemax={100}
//               />
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-3 pt-3 border-top">
//         <div className="d-flex align-items-center justify-content-between">
//           <h6 className="fw-bold mb-3 text-center" style={{ color: "#000000", fontSize: "0.9rem" }}>
//             Overall Usage
//           </h6>
//           <span className="small fw-semibold text-dark">{overallUsage}%</span>
//         </div>
//         <div className="progress mt-2" style={{ height: "8px" }}>
//           <div
//             className="progress-bar"
//             role="progressbar"
//             style={{
//               width: `${overallUsage}%`,
//               borderRadius: "4px",
//               backgroundColor: "#22C55E",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureUsageBreakdown;
