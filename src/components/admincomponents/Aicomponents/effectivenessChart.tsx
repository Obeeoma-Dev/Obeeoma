import React from 'react'
import { PhoneIcon } from 'lucide-react'
import { Card } from 'react-bootstrap'
import './HotlineRecommendations.css'

type Hotline = {
  name: string
  number: string
  category: 'Crisis' | 'Anxiety' | 'Youth' | 'General'
  timesRecommended: number
  status: 'Active' | 'Paused'
}

type HotlineRecommendationsProps = {
  hotlines?: Hotline[]
}

const categoryStyles: Record<Hotline['category'], string> = {
  Crisis: 'hotline-category-crisis',
  Anxiety: 'hotline-category-anxiety',
  Youth: 'hotline-category-youth',
  General: 'hotline-category-general',
}

const defaultHotlines: Hotline[] = [
  {
    name: 'National Suicide Prevention Lifeline',
    number: '988',
    category: 'Crisis',
    timesRecommended: 34,
    status: 'Active',
  },
  {
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    category: 'Crisis',
    timesRecommended: 28,
    status: 'Active',
  },
  {
    name: 'Anxiety & Depression Helpline',
    number: '1-800-950-6264',
    category: 'Anxiety',
    timesRecommended: 19,
    status: 'Active',
  },
  {
    name: 'Teen Line',
    number: '1-800-852-8336',
    category: 'Youth',
    timesRecommended: 15,
    status: 'Active',
  },
  {
    name: 'SAMHSA Helpline',
    number: '1-800-662-4357',
    category: 'General',
    timesRecommended: 11,
    status: 'Active',
  },
  {
    name: 'Domestic Violence Hotline',
    number: '1-800-799-7233',
    category: 'Crisis',
    timesRecommended: 8,
    status: 'Paused',
  },
]

export function HotlineRecommendations({ hotlines = defaultHotlines }: HotlineRecommendationsProps) {
  return (
    <Card className="hotline-recommendations-card">
      <Card.Body className="hotline-recommendations-body">
        <div className="hotline-recommendations-header">
          <h3 className="hotline-recommendations-title">
            Hotline Recommendations
          </h3>
          <p className="hotline-recommendations-subtitle">
            Numbers the AI is currently recommending to users in crisis
          </p>
        </div>

        <div className="hotline-recommendations-content">
          {/* Header */}
          <div className="hotline-recommendations-grid-header">
            <span className="hotline-recommendations-header-cell hotline-recommendations-header-name">
              Hotline
            </span>
            <span className="hotline-recommendations-header-cell hotline-recommendations-header-category">
              Category
            </span>
            <span className="hotline-recommendations-header-cell hotline-recommendations-header-times">
              Times
            </span>
            <span className="hotline-recommendations-header-cell hotline-recommendations-header-status">
              Status
            </span>
          </div>

          <div className="hotline-recommendations-list">
            {hotlines.map((hotline) => (
              <div
                key={hotline.name}
                className="hotline-recommendations-row"
              >
                {/* Name + Number */}
                <div className="hotline-recommendations-cell hotline-recommendations-cell-name">
                  <p className="hotline-recommendations-name">
                    {hotline.name}
                  </p>
                  <div className="hotline-recommendations-number-wrapper">
                    <PhoneIcon
                      size={11}
                      className="hotline-recommendations-phone-icon"
                    />
                    <span className="hotline-recommendations-number">
                      {hotline.number}
                    </span>
                  </div>
                </div>

                {/* Category */}
                <div className="hotline-recommendations-cell hotline-recommendations-cell-category">
                  <span
                    className={`hotline-recommendations-category ${categoryStyles[hotline.category]}`}
                  >
                    {hotline.category}
                  </span>
                </div>

                {/* Times */}
                <div className="hotline-recommendations-cell hotline-recommendations-cell-times">
                  <span className="hotline-recommendations-times-count">
                    {hotline.timesRecommended}
                  </span>
                  <span className="hotline-recommendations-times-multiply">
                    ×
                  </span>
                </div>

                {/* Status */}
                <div className="hotline-recommendations-cell hotline-recommendations-cell-status">
                  <span
                    className={`hotline-recommendations-status ${hotline.status === 'Active' ? 'hotline-recommendations-status-active' : 'hotline-recommendations-status-paused'}`}
                  >
                    <span
                      className={`hotline-recommendations-status-indicator ${hotline.status === 'Active' ? 'hotline-recommendations-indicator-active' : 'hotline-recommendations-indicator-paused'}`}
                    />
                    {hotline.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default HotlineRecommendations
