import React from 'react';
import { Card, Table, Badge, ProgressBar, Button } from 'react-bootstrap';
import { CheckCircleFill, ExclamationTriangleFill } from 'react-bootstrap-icons';
import { ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';



export interface ResourceRow {
  id: number;
  name: string;
  type: string;
  icon: LucideIcon;
  recommended: string;
  engagement: number;
  effectiveness: 'High' | 'Medium' | 'Low';
  lastUpdated: string;
  status: string;
}

interface ResourcesTableProps {
  resources: ResourceRow[]
}

const ResourcesTable: React.FC<ResourcesTableProps> = ({ resources }) => {
  return (
    <Card className="shadow-sm mb-4">
      <Card.Header className="fw-semibold">Resources Overview</Card.Header>
      <Card.Body className="p-0">
        <Table responsive hover borderless className="mb-0">
          {/* Preserve all original headers */}
          <thead className="table-light text-uppercase small text-muted">
            <tr>
              <th className="pl-2">Resource</th>
              <th>Recommended</th>
              <th style={{ width: '120px' }}>Engagement</th>
              <th>Effectiveness</th>
              <th>Last Updated</th>
              <th className="text-end pr-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {resources.map((resource) => {
              const IconComponent = resource.icon
              return (
                <tr key={resource.id}>
                  {/* Resource Name + Icon */}
                  <td className="align-middle">
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className="d-flex align-items-center justify-content-center rounded"
                        style={{ width: 36, height: 36, backgroundColor: '#f1f3f5' }}
                      >
                        <IconComponent
                          size={18}
                          color={
                            resource.type === 'Article' ? '#0d6efd' :
                              resource.type === 'Video' ? '#dc3545' :
                                resource.type === 'Audio' ? '#198754' :
                                  resource.type === 'Interactive' ? '#fd7e14' :
                                    '#6c757d'
                          }
                        />
                      </div>
                      <div>
                        <div className="fw-medium">{resource.name}</div>
                        <div className="text-muted small">{resource.type}</div>
                      </div>
                    </div>
                  </td>

                  {/* Recommended */}
                  <td className="align-middle text-muted">{resource.recommended}</td>

                  {/* Engagement */}
                  <td className="align-middle">
                    <div className="d-flex align-items-center gap-2">
                      <span className="small fw-medium" style={{ width: 30 }}>
                        {resource.engagement}%
                      </span>
                      <ProgressBar
                        now={resource.engagement}
                        variant={
                          resource.engagement > 75
                            ? 'success'
                            : resource.engagement > 60
                              ? 'warning'
                              : 'danger'
                        }
                        style={{ height: 6, flex: 1 }}
                      />
                    </div>
                  </td>

                  {/* Effectiveness */}
                  <td className="align-middle">
                    <Badge
                      bg={
                        resource.effectiveness === 'High'
                          ? 'success'
                          : resource.effectiveness === 'Medium'
                            ? 'warning'
                            : 'danger'
                      }
                      className="d-inline-flex align-items-center gap-2 px-3 py-2"
                    >
                      {resource.effectiveness === 'High' ? (
                        <CheckCircleFill size={14} />
                      ) : (
                        <ExclamationTriangleFill size={14} />
                      )}
                      {resource.effectiveness}
                    </Badge>
                  </td>

                  {/* Last Updated */}
                  <td className="align-middle text-muted">{resource.lastUpdated}</td>

                  {/* Actions */}
                  <td className="align-middle text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <Button variant="link" className="p-1 text-muted">
                        <ThumbsUp size={16} color="#198754" />
                      </Button>
                      <Button variant="link" className="p-1 text-danger">
                        <ThumbsDown size={16} color="#dc3545" />
                      </Button>
                      <Button variant="link" className="p-1 text-muted">
                        <MoreVertical size={16} color="#6c757d" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}

export default ResourcesTable
