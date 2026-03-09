import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from "chart.js";

import { fetchEmployeeMoodDistribution } from "../../../store/slices/EmployerSlice";
import type { AppDispatch, RootState } from "../../../store/store";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define the shape of your mood data
interface MoodItem {
  mood: string;
  count: number;
}

const BarGraph: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Destructure state with types from RootState
  const { employeeMoodDistribution, status, error } = useSelector(
    (state: RootState) => state.employer
  );

  // 1. AJAX Polling (The Heartbeat)
  useEffect(() => {
    dispatch(fetchEmployeeMoodDistribution());

    const interval = setInterval(() => {
      dispatch(fetchEmployeeMoodDistribution());
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  // 2. Memoized Chart Data with TypeScript safety
  const chartData: ChartData<"bar"> = useMemo(() => {
    // Fallback to default data if undefined or empty to prevent the chart from falling off
    const defaultData: MoodItem[] = [
      { mood: "Ecstatic", count: 20 },
      { mood: "Happy", count: 35 },
      { mood: "Neutral", count: 15},
      { mood: "Sad", count: 3 },
      { mood: "Angry", count: 2 },
    ];
    
    const dataArray: MoodItem[] = (employeeMoodDistribution && employeeMoodDistribution.length > 0) 
      ? employeeMoodDistribution 
      : defaultData;

    return {
      labels: dataArray.map((item) => item.mood),
      datasets: [
        {
          label: "Number of Employees",
          data: dataArray.map((item) => item.count),
          backgroundColor: dataArray.map((item) => {
            const mood = item.mood?.toLowerCase() || "";
            if (["angry", "sad", "stressed", "frustrated"].includes(mood)) return "#7a7474";
            if (["ecstatic", "happy", "excited"].includes(mood)) return "#22C55E";
            return "#bdbfc2";
          }),
          borderRadius: 4,
        },
      ],
    };
  }, [employeeMoodDistribution]);

  // 3. Chart Options with Type
  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Real-Time Specific Mood Distribution",
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: { stepSize: 5 },
        title: { display: true, text: "Employee Count" },
      },
      x: {
        title: { display: true, text: "Specific Emotions" },
      },
    },
  };

  // Error State Handling
  if (status === "failed") {
    return <div className="alert alert-danger">{error || "Failed to load data"}</div>;
  }

  return (
    <div style={{ height: "400px", width: "100%", padding: "20px" }}>
      {/* Background sync indicator */}
      {status === "loading" && employeeMoodDistribution?.length > 0 && (
        <small className="text-muted float-end">Refreshing...</small>
      )}

      {/* Always show chart with default or actual data */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;



// // import React, { useEffect, useRef, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Bar } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // import { fetchEmployeeMoodDistribution, updateMoodCount } from "../../../store/slices/EmployerSlice";
// // import type { AppDispatch, RootState } from "../../../store/store";

// // ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// // const BarGraph: React.FC = () => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const { employeeMoodDistribution } = useSelector(
// //     (state: RootState) => state.employer
// //   );
  
// //   // Start loading as false if we already have data in Redux to prevent flickering
// //   const [localLoading, setLocalLoading] = useState(!employeeMoodDistribution?.length);
// //   const [localError, setLocalError] = useState<string | null>(null);
// //   const socket = useRef<WebSocket | null>(null);

// //   // 1. DATA FETCHING EFFECT
// //   // Only runs once on mount
// //   useEffect(() => {
// //     let isMounted = true;

// //     const loadData = async () => {
// //       try {
// //         await dispatch(fetchEmployeeMoodDistribution()).unwrap();
// //       } catch (err: any) {
// //         if (isMounted) setLocalError(err?.message || "Failed to fetch data");
// //       } finally {
// //         if (isMounted) setLocalLoading(false);
// //       }
// //     };

// //     loadData();
// //     return () => { isMounted = false; };
// //   }, [dispatch]);

// //   // 2. WEBSOCKET EFFECT
// //   // Separated so that UI state changes (loading/error) don't restart the socket
// //   useEffect(() => {
// //     const socketUrl = 'ws://127.0.0.1:8000/ws/mood_updates/'; 
// //     socket.current = new WebSocket(socketUrl);

// //     socket.current.onopen = () => console.log("[WS] Connected");
    
// //     socket.current.onmessage = (event) => {
// //       try {
// //         const data = JSON.parse(event.data);
// //         dispatch(updateMoodCount(data)); 
// //       } catch (e) {
// //         console.error("[WS] Parse error:", e);
// //       }
// //     };

// //     socket.current.onerror = () => setLocalError("WebSocket connection lost");

// //     return () => {
// //       console.log("[WS] Cleaning up...");
// //       socket.current?.close();
// //     };
// //   }, [dispatch]);

// //   // 3. STABLE UI RENDERING
// //   // We return a consistent container div so React doesn't unmount/remount the whole tree
// //   const renderContent = () => {
// //     if (localLoading && !employeeMoodDistribution?.length) {
// //       return (
// //         <div className="d-flex flex-column align-items-center justify-content-center h-100">
// //           <div className="spinner-border text-success" role="status" />
// //           <p className="mt-2">Loading mood data...</p>
// //         </div>
// //       );
// //     }

// //     if (localError && !employeeMoodDistribution?.length) {
// //       return (
// //         <div className="alert alert-danger m-3">{localError}</div>
// //       );
// //     }

// //     if (!employeeMoodDistribution || employeeMoodDistribution.length === 0) {
// //       return <p className="text-muted text-center pt-5">No mood data available</p>;
// //     }

// //     const chartData = {
// //       labels: employeeMoodDistribution.map((item) => item.mood),
// //       datasets: [
// //         {
// //           label: "Number of Employees",
// //           data: employeeMoodDistribution.map((item) => item.count),
// //           backgroundColor: "#22C55E",
// //           borderRadius: 5,
// //         },
// //       ],
// //     };

// //     return <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />;
// //   };

// //   return (
// //     <div style={{ height: "350px", width: "100%", position: "relative" }}>
// //       {renderContent()}
// //     </div>
// //   );
// // };

// // export default BarGraph;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import { fetchEmployeeMoodDistribution } from "../../../store/slices/EmployerSlice";
// import type { AppDispatch, RootState } from "../../../store/store";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarGraph: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { employeeMoodDistribution, status, error } = useSelector(
//     (state: RootState) => state.employer
//   );

//   // 1. AJAX Polling (The Heartbeat)
//   useEffect(() => {
//     dispatch(fetchEmployeeMoodDistribution());

//     const interval = setInterval(() => {
//       dispatch(fetchEmployeeMoodDistribution());
//     }, 30000); // Sync every 30 seconds

//     return () => clearInterval(interval);
//   }, [dispatch]);

//   // 2. Map specific moods to Chart.js
//   const chartData = {
//     labels: employeeMoodDistribution.map((item) => item.mood), // e.g., ["Angry", "Sad", "Happy"]
//     datasets: [
//       {
//         label: "Number of Employees",
//         data: employeeMoodDistribution.map((item) => item.count),
//         backgroundColor: employeeMoodDistribution.map((item) => {
//             // Logic to color individual bars based on the mood name
//             const mood = item.mood.toLowerCase();
//             if (['angry', 'sad', 'stressed', 'frustrated'].includes(mood)) return "#EF4444"; // Red
//             if (['ecstatic', 'happy', 'excited'].includes(mood)) return "#22C55E"; // Green
//             return "#94A3B8"; // Gray for neutral
//         }),
//         borderRadius: 4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: "Real-Time Specific Mood Distribution",
//         font: { size: 16 }
//       },
//     },
//     scales: {
//       y: { 
//         beginAtZero: true,
//         ticks: { stepSize: 1 },
//         title: { display: true, text: "Employee Count" }
//       },
//       x: {
//         title: { display: true, text: "Specific Emotions" }
//       }
//     },
//   };

//   if (status === 'failed') return <div className="alert alert-danger">{error}</div>;

//   return (
//     <div style={{ height: "400px", width: "100%", padding: "20px" }}>
//       {/* Background sync indicator */}
//       {status === 'loading' && employeeMoodDistribution.length > 0 && (
//         <small className="text-muted float-end">Refreshing...</small>
//       )}

//       {employeeMoodDistribution.length > 0 ? (
//         <Bar data={chartData} options={options} />
//       ) : (
//         <div className="text-center pt-5">
//            {status === 'loading' ? <p>Loading data...</p> : <p>No mood data recorded yet.</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BarGraph;