// components/UploadZone.tsx
// This component implements the "Upload New Content" card from the Media Library.

import React, { useState, useCallback } from 'react';
import { UploadCloud, FileVideo, FileAudio, Image as ImageIcon, File as FileIcon, X } from 'lucide-react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

// Import the API
import { contentMediaAPI } from '../../../services/contentService';

// Define media types with labels and icons; colors are omitted (Tailwind removed)
const MEDIA_TYPES = [
    { id: 'video', label: 'Video', icon: FileVideo },
    { id: 'audio', label: 'Audio', icon: FileAudio },
    { id: 'image', label: 'Image', icon: ImageIcon },
    { id: 'other', label: 'Other', icon: FileIcon },
] as const;

// Component export.
interface UploadZoneProps {
    onUploadSuccess?: () => void;
}

export function UploadZone({ onUploadSuccess }: UploadZoneProps) {
    // Track the selected media type 
    const [selectedType, setSelectedType] = useState<typeof MEDIA_TYPES[number]['id']>('other');
    // Track whether the drag area is active (dragenter/dragover) to adjust visual feedback
    const [dragActive, setDragActive] = useState(false);
    // Track the selected file (from drop or file input)
    const [file, setFile] = useState<File | null>(null);
    // Track title and description
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Handle drag events to toggle the "active" state and prevent default browser behavior
    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault(); // Prevent opening the file in the browser
        e.stopPropagation(); // Stop event bubbling to parent nodes
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true); // Highlight drop zone while dragging over
        } else if (e.type === 'dragleave') {
            setDragActive(false); // Remove highlight when leaving
        }
    }, []);

    // Handle drop event: store the first file dropped and reset active state
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false); // Remove highlight on drop
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]); // Save the dropped file to state
        }
    }, []);

    // Handle file input change: store the first selected file from the input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("media_type", selectedType);
        formData.append("file", file);

        try {
            const response = await contentMediaAPI.createMedia(formData);
            console.log("Upload successful:", response);

            // Call success callback
            onUploadSuccess?.();


            setFile(null);
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };


    return (

        <Card style={{ borderRadius: 12 }}>
            {/* Card header: "Upload New Content" */}
            <Card.Header as="h2" style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'body' }}>
                Upload New Content
            </Card.Header>

            {/* Card body */}
            <Card.Body>
                <div className="content-type-pills" style={{ overflowX: 'auto', paddingBottom: 8, marginBottom: 16 }}>
                    <Nav variant="pills" activeKey={selectedType} onSelect={(k) => k && setSelectedType(k as typeof selectedType)}>
                        {/* Map media types into Nav.Item/Nav.Link entries */}
                        {MEDIA_TYPES.map((type) => {
                            const Icon = type.icon; // Select the icon component per type
                            const isSelected = selectedType === type.id; // Determine current selection
                            return (
                                <Nav.Item key={type.id}>
                                    <Nav.Link
                                        eventKey={type.id} // Link key used by Nav to track active                                        
                                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', marginRight: 8, fontFamily: 'body' }}
                                    >
                                        {/* Icon left of label; color changes subtly when active */}
                                        <Icon size={18} color={isSelected ? '#fff' : '#6c757d'} />
                                        {/* Label text */}
                                        <span style={{ fontWeight: 500, color: isSelected ? '#fff' : '#6c757d' }}>{type.label}</span>
                                    </Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>
                </div>

                {/* Drag-and-drop upload area; styled with dashed border and hover/active feedback */}
                <div
                    style={{
                        position: 'relative',
                        border: '2px dashed',
                        borderColor: dragActive ? '#00A859' : '#ced4da',
                        borderRadius: 12,
                        padding: 24,
                        textAlign: 'center',
                        transition: 'border-color 150ms ease, background-color 150ms ease',
                        backgroundColor: dragActive ? 'rgba(25, 135, 84, 0.08)' : 'transparent',
                        cursor: 'pointer',
                    }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {/* Invisible file input covering the whole drop zone to support click-to-upload */}
                    <Form.Control
                        type="file" // File input
                        onChange={handleChange} // Store selected file                       
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer',
                        }}
                    />

                    {/* If a file is selected, show preview name, size, and a remove button */}
                    {file ? (
                        <Stack direction="horizontal" gap={3} className="justify-content-center">
                            {/* Icon bubble for the selected file */}
                            <div
                                style={{
                                    padding: 12,
                                    backgroundColor: 'rgba(25, 135, 84, 0.15)',
                                    borderRadius: 999,
                                }}
                            >
                                <FileIcon size={24} color="#198754" /> {/* Green file icon */}
                            </div>

                            {/* File name and size */}
                            <div style={{ textAlign: 'left' }}>
                                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#212529', fontFamily: 'body' }}>{file.name}</p> {/* File name */}
                                <p style={{ margin: 0, fontSize: 12, color: '#6c757d', fontFamily: 'body' }}>
                                    {(file.size / 1024 / 1024).toFixed(2)} MB {/* Human-readable size */}
                                </p>
                            </div>

                            {/* Remove file button */}
                            <Button
                                variant="light"
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setFile(null);
                                }}
                                style={{ borderRadius: 999 }}
                                aria-label="Remove selected file"
                            >
                                <X size={16} color="#6c757d" /> {/* Gray 'X' icon */}
                            </Button>
                        </Stack>
                    ) : (
                        // Empty state: prompt user to click or drag files, with an upload icon and helper text
                        <div>
                            {/* Circular backdrop for upload icon */}
                            <div
                                style={{
                                    margin: '0 auto',
                                    width: 48,
                                    height: 48,
                                    borderRadius: 999,
                                    backgroundColor: 'rgba(25, 135, 84, 0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <UploadCloud size={24} color="#00A859" /> {/* Green upload icon */}
                            </div>

                            {/* Instruction line: click or drag-and-drop */}
                            <div style={{ marginTop: 8, color: '#6c757d' }}>
                                <span style={{ fontWeight: 600, color: '#00A859', fontFamily: 'body' }}>Click to upload</span> or drag and drop
                            </div>

                            {/* Supported file types and size note */}
                            <p style={{ marginTop: 4, fontSize: 12, color: '#6c757d', fontFamily: 'body' }}>MP4, MP3, PNG, JPG up to 50MB</p>
                        </div>
                    )}
                </div>

                {/* Metadata form for Title and Description, laid out responsively using Bootstrap grid */}
                <Row style={{ marginTop: 24 }} xs={1} md={2}>
                    {/* Title input */}
                    <Col>
                        <Form.Label style={{ fontSize: 13, fontWeight: 600, color: '#495057', marginBottom: 4, fontFamily: 'body' }}>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter content title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Col>

                    {/* Description input */}
                    <Col>
                        <Form.Label style={{ fontSize: 13, fontWeight: 600, color: '#495057', marginBottom: 4, fontFamily: 'body' }}>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Brief description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Row>

                {/* Right-aligned upload button */}
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="success"
                        onClick={handleUpload}
                    >
                        Upload Content
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}