import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WellnessGraph from '../components/employercomponents/employerdashboard/WellnessGraph';

describe('WellnessGraph', () => {
  const mockData = [
    { date: '2023-01-01', avg_score: 4.2, mood_counts: { 'Great': 10, 'Good': 5, 'Neutral': 0, 'Bad': 0, 'Terrible': 0 } },
    { date: '2023-01-02', avg_score: 3.8, mood_counts: { 'Great': 0, 'Good': 8, 'Neutral': 2, 'Bad': 0, 'Terrible': 0 } },
    { date: '2023-01-03', avg_score: 4.5, mood_counts: { 'Great': 12, 'Good': 3, 'Neutral': 0, 'Bad': 0, 'Terrible': 0 } },
  ];

  it('renders the wellness graph with data', () => {
    render(<WellnessGraph data={mockData} />);

    expect(screen.getByText('Employee Wellness Trend')).toBeInTheDocument();
    expect(screen.getByText('Daily mood average based on surveys')).toBeInTheDocument();
  });

  it('renders SVG chart', () => {
    render(<WellnessGraph data={mockData} />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders with empty data', () => {
    render(<WellnessGraph data={[]} />);

    expect(screen.getByText('No mood data available for this period')).toBeInTheDocument();
  });

  it('renders footer with legend', () => {
    render(<WellnessGraph data={mockData} />);

    expect(screen.getByText('Avg Mood')).toBeInTheDocument();
  });
});