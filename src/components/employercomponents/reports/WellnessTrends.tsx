import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Emoji mapping based on mood scores
const EMOJI_MAPPING = [
  { score: 0, emoji: '😭', label: 'Very Low' },
  { score: 25, emoji: '😔', label: 'Low' },
  { score: 50, emoji: '😐', label: 'Neutral' },
  { score: 75, emoji: '🙂', label: 'Good' },
  { score: 100, emoji: '😄', label: 'Excellent' },
];

// Dummy data - replace with actual API call later
const dummyMoodData = [
  { date: 'Mon', score: 85, emoji: '😄' },
  { date: 'Tue', score: 65, emoji: '🙂' },
  { date: 'Wed', score: 45, emoji: '😐' },
  { date: 'Thur', score: 70, emoji: '🙂' },
  { date: 'Fri', score: 90, emoji: '😄' },
  { date: 'Mon', score: 80, emoji: '🙂' },
  { date: 'Tue', score: 55, emoji: '😐' },
  { date: 'Wed', score: 75, emoji: '🙂' },
  { date: 'Thur', score: 85, emoji: '😄' },
  { date: 'Fri', score: 60, emoji: '🙂' },
];

const WellnessTrends: React.FC = () => {
  const [moodData, setMoodData] = useState(dummyMoodData);

  // In the future, replace this with actual API call
  useEffect(() => {
    // Example of how to fetch from backend:
    /*
    fetch('/api/wellness/mood-trends')
      .then(response => response.json())
      .then(data => {
        // Transform backend data to match our format
        const transformedData = data.map((item: any) => ({
          date: item.date,
          score: item.moodScore,
          emoji: getEmojiFromScore(item.moodScore),
        }));
        setMoodData(transformedData);
      });
    */
  }, []);

  // Helper function to get emoji based on score
  const getEmojiFromScore = (score: number): string => {
    const emoji = EMOJI_MAPPING.find(
      (item, index) => 
        score <= item.score || 
        (index === EMOJI_MAPPING.length - 1 && score > item.score)
    );
    return emoji?.emoji || '😐';
  };

  // Custom YAxis tick with emojis
  const renderEmojiTick = ({ x, y, payload }: any) => {
    const emoji = EMOJI_MAPPING.find(e => e.score === payload.value)?.emoji;
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#666"
          fontSize={20}
        >
          {emoji}
        </text>
      </g>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const emojiInfo = EMOJI_MAPPING.find(e => e.emoji === data.emoji);
      
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${label}`}</p>
          <p className="intro">{`Score: ${data.score}`}</p>
          <p className="emoji" style={{ fontSize: '24px' }}>{data.emoji}</p>
          <p className="desc">{`Mood: ${emojiInfo?.label || 'Unknown'}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="m-0 mb-2 text-gray-800">Mood Trend</h2>
      <p className="m-0 mb-5 text-gray-600 text-sm">Automated from aggregated data</p>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={moodData}
            margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {/* XAxis with dates */}
            <XAxis
              dataKey="date"
              tick={{ fill: '#666' }}
              axisLine={{ stroke: '#ccc' }}
            />

            {/* YAxis with emojis */}
            <YAxis
              tick={renderEmojiTick}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              axisLine={{ stroke: '#ccc' }}
              tickLine={false}
              label={{
                value: 'Mood',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                style: { fill: '#666' }
              }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Mood line */}
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WellnessTrends;

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   Legend,
// } from "recharts";

// const WellnessTrends = () => {
//   // TODO: Replace with API data
//   const wellnessTrends = [
//     { month: "Jan", wellness: 65, stress: 35, engagement: 70 },
//     { month: "Feb", wellness: 68, stress: 32, engagement: 72 },
//     { month: "Mar", wellness: 72, stress: 28, engagement: 75 },
//     { month: "Apr", wellness: 70, stress: 30, engagement: 73 },
//     { month: "May", wellness: 75, stress: 25, engagement: 78 },
//     { month: "Jun", wellness: 78, stress: 22, engagement: 80 },
//   ];

//   return (
//     <div className="row mb-5">
//       <div className="col-12">
//         <div className="card border-0 shadow-sm">
//           <div className="card-body p-4">
//             <h3 className="h5 fw-semibold mb-4">Wellness Trends</h3>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={wellnessTrends}>
//                 <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="wellness" stroke="#77e7c2ff" strokeWidth={2} />
//                 <Line type="monotone" dataKey="stress" stroke="#22C55E" strokeWidth={2} />
//                 <Line type="monotone" dataKey="engagement" stroke="#606968ff" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WellnessTrends;