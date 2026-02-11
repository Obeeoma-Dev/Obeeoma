import React, { useState, useEffect } from 'react';
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
  const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);

  // Test different URL patterns
  const testVideoUrl = async (s3Key: string) => {
    const urlPatterns = [
      `http://127.0.0.1:8000/media/${s3Key}`, // Correct Django media URL
      `http://127.0.0.1:8000/uploads/${s3Key}`, // Direct uploads folder
      `http://127.0.0.1:8000/${s3Key}`,  // Try without /media prefix
      `http://127.0.0.1:8000/api/v1/media/${s3Key}`, // API path
      `http://127.0.0.1:8000/api/v1/uploads/${s3Key}`, // API uploads
      `http://127.0.0.1:8000/static/${s3Key}`, // Static folder
      `http://127.0.0.1:8000/static/media/${s3Key}` // Static media
    ];

    for (const url of urlPatterns) {
      console.log(`Testing URL pattern: ${url}`);
      try {
        const response = await fetch(url, { method: 'HEAD' });
        console.log(`URL ${url} - Status: ${response.status}, Content-Type: ${response.headers.get('content-type')}`);

        if (response.ok && response.headers.get('content-type')?.includes('video')) {
          console.log(`✅ Found working URL: ${url}`);
          return url;
        }
      } catch (error) {
        console.log(`❌ URL ${url} failed:`, error);
      }
    }

    console.log('⚠️ No working URL found, using first pattern as fallback');
    return urlPatterns[0];
  };

  // Initialize video URL
  useEffect(() => {
    if (item.s3_key && !videoUrl) {
      testVideoUrl(item.s3_key).then(url => {
        setVideoUrl(url);
      });
    } else if (item.public_url) {
      setVideoUrl(item.public_url);
    }
  }, [item.s3_key, item.public_url]);

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

            <Card className="border shadow-sm mt-4">
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
            <Card className="border shadow-sm mb-4">
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
