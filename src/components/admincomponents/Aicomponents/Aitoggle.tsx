import React from 'react'
import { motion } from 'framer-motion'
import { Container, Row, Col } from 'react-bootstrap'
import './Aitoggle.css'

type AIStatusToggleProps = {
  isActive: boolean
  onToggle: (value: boolean) => void
  label: string
  description: string
  icon: React.ReactNode
  lastActive?: string
}

export function AIStatusToggle({
  isActive,
  onToggle,
  label,
  description,
  icon,
  lastActive = 'Today at 2:34 PM',
}: AIStatusToggleProps) {
  return (
    <div className={`ai-toggle-enhanced ${isActive ? 'ai-toggle-enhanced-active' : 'ai-toggle-enhanced-inactive'}`}>
      {/* Icon + Toggle row */}
      <div className="ai-toggle-header">
        <div className={`ai-toggle-icon-wrapper ${isActive ? 'ai-toggle-icon-wrapper-active' : 'ai-toggle-icon-wrapper-inactive'}`}>
          <span className={isActive ? 'ai-toggle-icon-active' : 'ai-toggle-icon-inactive'}>
            {icon}
          </span>
        </div>

        {/* Toggle */}
        <div className="ai-toggle-switch-wrapper">
          <button
            onClick={() => onToggle(!isActive)}
            className={`ai-toggle-switch ${isActive ? 'ai-toggle-switch-active' : 'ai-toggle-switch-inactive'}`}
            aria-label={isActive ? `Turn ${label} off` : `Turn ${label} on`}
            role="switch"
            aria-checked={isActive}
          >
            <motion.div
              className="ai-toggle-switch-thumb"
              animate={{
                left: isActive ? '30px' : '2px',
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          </button>
          <span className={`ai-toggle-switch-label ${isActive ? 'ai-toggle-switch-label-active' : 'ai-toggle-switch-label-inactive'}`}>
            {isActive ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>

      {/* Label + Description */}
      <h3 className="ai-toggle-label">{label}</h3>
      <p className="ai-toggle-description">
        {description}
      </p>

      {/* Status */}
      <div className="ai-toggle-status-row">
        <div className={`ai-toggle-status-indicator ${isActive ? 'ai-toggle-status-indicator-active' : 'ai-toggle-status-indicator-inactive'}`} />
        <span className={`ai-toggle-status-text ${isActive ? 'ai-toggle-status-text-active' : 'ai-toggle-status-text-inactive'}`}>
          {isActive ? 'Active' : 'Paused'}
        </span>
        <span className="ai-toggle-last-active">
          Last active: {lastActive}
        </span>
      </div>
    </div>
  )
}
