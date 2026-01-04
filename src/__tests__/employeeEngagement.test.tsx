import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EngagementTrend from '../components/employercomponents/employerdashboard/EngagementTrend';

describe('EngagementTrend', () => {
  it('renders the engagement trend card', () => {
    render(<EngagementTrend />);

    expect(screen.getByText('Engagement Trend')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('345')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('289')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
  });

  it('displays the correct progress bar', () => {
    render(<EngagementTrend />);

    const progressBar = document.querySelector('.progress-bar.bg-success');
    expect(progressBar).toBeInTheDocument();
    // The progress bar should have the correct width based on active/total ratio
    // 289 / 345 ≈ 0.838, so width should be around 83.8%
    expect(progressBar).toHaveStyle('width: 83.76811594202899%');
  });

  it('has the correct card structure', () => {
    render(<EngagementTrend />);

    const card = screen.getByText('Engagement Trend').closest('.card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('border-0', 'shadow-sm');
  });

  it('displays active and pending sections with correct styling', () => {
    render(<EngagementTrend />);

    const activeSection = screen.getByText('Active').parentElement;
    const pendingSection = screen.getByText('Pending').parentElement;

    expect(activeSection).toHaveClass('bg-success', 'bg-opacity-10', 'rounded');
    expect(pendingSection).toHaveClass('bg-warning', 'bg-opacity-10', 'rounded');
  });
});