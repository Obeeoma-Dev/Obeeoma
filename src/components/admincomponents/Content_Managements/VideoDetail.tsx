import React, { useState } from 'react';
import {
  ArrowLeft,
  Save,
  Globe,
  Calendar,
  HardDrive,
  Tag,
  Type,
} from 'lucide-react';
import { Button, Form, Row, Col, Card, Badge, Container } from 'react-bootstrap';
import { VideoPlayer } from './VideoPlayer';
import { StatusBadge } from './StatusBadge';
import { ContentItem } from '../../../services/contentService';
import SystemAdminLayout from '../shared/SystemAdminLayout';

interface VideoDetailProps {
  item: ContentItem;
  onBack: () => void;
  useLayout?: boolean; // Control whether to use SystemAdminLayout
}

export function VideoDetail({ item, onBack, useLayout = true }: VideoDetailProps) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(
    item.description || 'This is a sample description for video content. It helps users understand what they are about to watch.',
  );
  const [category, setCategory] = useState(item.category || 'general');

  // Construct video URL from s3_key or public_url
  const videoUrl = item.public_url || (item.s3_key ? `http://127.0.0.1:8000/media/${item.s3_key}` : undefined);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving changes...');
  };

  const handlePublish = () => {
    // TODO: Implement publish functionality
    console.log('Publishing changes...');
  };

  const content = (
    <Container fluid className="p-4">
      <div className="d-flex align-items-center gap-4 mb-4">
        <Button
          variant="light"
          onClick={onBack}
          className="rounded-circle p-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">{title}</h1>
          <div className="d-flex align-items-center gap-3 text-muted small">
            <span>Video ID: #{item.id}</span>
            <span>•</span>
            <span>Uploaded on {new Date(item.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">
          <Button variant="outline-secondary" onClick={handleSave}>
            Save as Draft
          </Button>
          <Button variant="success" onClick={handlePublish} className="d-flex align-items-center gap-2">
            <Globe className="w-4 h-4" />
            Publish Changes
          </Button>
        </div>
      </div>

      <Row className="g-4">
        {/* Left Column: Video Player & Main Info */}
        <Col lg={8}>
          <div className="space-y-6">
            <VideoPlayer
              title={title}
              videoUrl={videoUrl}
              thumbnail={item.public_url}
            />

            <Card className="border shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="mb-4">
                  Video Description
                </Card.Title>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  placeholder="Enter video description..."
                  className="border-secondary"
                />
              </Card.Body>
            </Card>
          </div>
        </Col>

        {/* Right Column: Metadata & Settings */}
        <Col lg={4}>
          <div className="space-y-4">
            <Card className="border shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="mb-4 pb-3 border-bottom">
                  Metadata
                </Card.Title>

                <div className="space-y-4">
                  <div>
                    <Form.Label className="fw-medium">Title</Form.Label>
                    <div className="position-relative">
                      <Type className="position-absolute start-3 top-50 translate-middle-y text-muted w-4 h-4" />
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="ps-5"
                      />
                    </div>
                  </div>

                  <div>
                    <Form.Label className="fw-medium">Category</Form.Label>
                    <div className="position-relative">
                      <Tag className="position-absolute start-3 top-50 translate-middle-y text-muted w-4 h-4" />
                      <Form.Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="ps-5"
                      >
                        <option value="general">General</option>
                        <option value="mindfulness">Mindfulness</option>
                        <option value="stress">Stress Relief</option>
                        <option value="sleep">Sleep Aid</option>
                        <option value="anxiety">Anxiety</option>
                        <option value="meditation">Meditation</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div>
                    <Form.Label className="fw-medium">Current Status</Form.Label>
                    <div className="py-2">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="border shadow-sm">
              <Card.Body>
                <Card.Title as="h3" className="mb-4 pb-3 border-bottom">
                  File Details
                </Card.Title>

                <div className="space-y-3">
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="text-muted d-flex align-items-center gap-2">
                      <Calendar className="w-4 h-4" /> Uploaded
                    </span>
                    <span className="fw-medium">{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="text-muted d-flex align-items-center gap-2">
                      <HardDrive className="w-4 h-4" /> File Size
                    </span>
                    <span className="fw-medium">{item.file_size || 'N/A'}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                    <span className="text-muted d-flex align-items-center gap-2">
                      <Globe className="w-4 h-4" /> Format
                    </span>
                    <span className="fw-medium">MP4 (H.264)</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );

  return useLayout ? (
    <SystemAdminLayout title={item.title}>
      {content}
    </SystemAdminLayout>
  ) : (
    content
  );
}
