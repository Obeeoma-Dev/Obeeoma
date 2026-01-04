import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeatureUsageBreakdown from '../components/employercomponents/employerdashboard/FeatureUsageBreakdown';

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  BarChart3: jest.fn(() => <div data-testid="barchart-icon">BarChart3</div>),
  Users: jest.fn(() => <div data-testid="users-icon">Users</div>),
  MessageSquare: jest.fn(() => <div data-testid="messagesquare-icon">MessageSquare</div>),
  FileText: jest.fn(() => <div data-testid="filetext-icon">FileText</div>),
  TrendingUp: jest.fn(() => <div data-testid="trendingup-icon">TrendingUp</div>),
}));

describe('FeatureUsageBreakdown', () => {
  it('renders the feature usage breakdown', () => {
    render(<FeatureUsageBreakdown />);

    expect(screen.getByText('Feature Usage')).toBeInTheDocument();
    expect(screen.getByText('Overall Usage')).toBeInTheDocument();
  });

  it('renders all features', () => {
    render(<FeatureUsageBreakdown />);

    expect(screen.getByText('Sana AI')).toBeInTheDocument();
    expect(screen.getByText('Journalling')).toBeInTheDocument();
    expect(screen.getByText('Educational Resources')).toBeInTheDocument();
    expect(screen.getByText('Self assessment')).toBeInTheDocument();
  });

  it('renders usage percentages', () => {
    render(<FeatureUsageBreakdown />);

    expect(screen.getByText('85%')).toBeInTheDocument();
    expect(screen.getByText('67%')).toBeInTheDocument();
    expect(screen.getByText('43%')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
  });

  it('renders overall usage', () => {
    render(<FeatureUsageBreakdown />);

    // Average of 85, 67, 43, 92 = 287 / 4 = 71.75, rounded to 72
    expect(screen.getByText('72%')).toBeInTheDocument();
  });

  it('renders progress bars', () => {
    render(<FeatureUsageBreakdown />);

    const progressBars = document.querySelectorAll('.progress-bar');
    expect(progressBars.length).toBeGreaterThan(0);
  });
});