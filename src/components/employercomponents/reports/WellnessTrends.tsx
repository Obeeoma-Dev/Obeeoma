import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { employerAPI } from "../../../api/apiConfig";

// Emoji mapping based on mood scores
const EMOJI_MAPPING = [
  { score: 0, emoji: "😭", label: "Very Low" },
  { score: 25, emoji: "😔", label: "Low" },
  { score: 50, emoji: "😐", label: "Neutral" },
  { score: 75, emoji: "🙂", label: "Good" },
  { score: 100, emoji: "😄", label: "Excellent" },
];

// Dummy data - replace with actual API call later
const dummyMoodData = [
  { date: "Mon", score: 85, emoji: "😄" },
  { date: "Tue", score: 65, emoji: "🙂" },
  { date: "Wed", score: 45, emoji: "😐" },
  { date: "Thur", score: 70, emoji: "🙂" },
  { date: "Fri", score: 90, emoji: "😄" },
  { date: "Mon", score: 80, emoji: "🙂" },
  { date: "Tue", score: 55, emoji: "😐" },
  { date: "Wed", score: 75, emoji: "🙂" },
  { date: "Thur", score: 85, emoji: "😄" },
  { date: "Fri", score: 60, emoji: "🙂" },
];

const WellnessTrends: React.FC = () => {
  const [moodData, setMoodData] = useState(dummyMoodData);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await employerAPI.getWellnessMoodTrends();
        const data = response.data;
        if (Array.isArray(data)) {
          const transformedData = data.map((item: { date: string; moodScore: number }) => ({
            date: item.date,
            score: item.moodScore,
            emoji: getEmojiFromScore(item.moodScore),
          }));
          setMoodData(transformedData);
        }
      } catch (error) {
        console.error("Failed to fetch the mood data:", error);
      }
    };

    fetchMoodData();
  }, [setMoodData]);

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
  const renderEmojiTick = ({
    x,
    y,
    payload,
  }: {
    x: number;
    y: number;
    payload: { value: number };
  }) => {
    const emoji = EMOJI_MAPPING.find((e) => e.score === payload.value)?.emoji;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={4} textAnchor="end" fill="#555" fontSize={20}>
          {emoji}
        </text>
      </g>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ payload: (typeof dummyMoodData)[0] }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const emojiInfo = EMOJI_MAPPING.find((e) => e.emoji === data.emoji);

      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${label}`}</p>
          <p className="intro">{`Score: ${data.score}`}</p>
          <p className="emoji" style={{ fontSize: "24px" }}>
            {data.emoji}
          </p>
          <p className="desc">{`Mood: ${emojiInfo?.label || "Unknown"}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md">
      {/* <h2 className="m-0 mb-2 text-gray-800">Mood Trend</h2>
      <p className="m-0 mb-5 text-gray-600 text-sm">Automated from aggregated data</p> */}

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={moodData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            {/* XAxis with dates */}
            <XAxis
              dataKey="date"
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#ccc" }}
            />

            {/* YAxis with emojis */}
            <YAxis
              tick={renderEmojiTick}
              ticks={[0, 25, 50, 75, 100]}
              domain={[0, 100]}
              axisLine={{ stroke: "#ccc" }}
              tickLine={false}
              label={{
                value: "Mood",
                angle: -90,
                position: "insideLeft",
                offset: -10,
                style: { fill: "#555" },
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
