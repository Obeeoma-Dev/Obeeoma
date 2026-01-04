import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoodGaugeChart from '../components/employercomponents/employerdashboard/MoodgaugeChart';

describe('MoodGaugeChart', () => {
  it('renders the mood tracker title', () => {
    render(<MoodGaugeChart moodLabel="Good" />);

    expect(screen.getByText('Mood Tracker')).toBeInTheDocument();
  });

  it('renders the mood label', () => {
    render(<MoodGaugeChart moodLabel="Good" />);

    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('renders with different mood labels', () => {
    render(<MoodGaugeChart moodLabel="Great" />);

    expect(screen.getByText('Great')).toBeInTheDocument();
  });

  it('handles mood label with "Needs Attention"', () => {
    render(<MoodGaugeChart moodLabel="Bad Needs Attention" />);

    expect(screen.getByText('Bad')).toBeInTheDocument();
  });

  it('renders SVG gauge', () => {
    render(<MoodGaugeChart moodLabel="Neutral" />);

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});