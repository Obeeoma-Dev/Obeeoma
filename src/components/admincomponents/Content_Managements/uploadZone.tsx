// // components/UploadZone.tsx
// // This component implements the "Upload New Content" card from your Media Library.
// // It replaces all Tailwind classes with React-Bootstrap components and inline styles,
// // while preserving structure and behavior: media-type tabs, drag-and-drop area,
// // file preview with remove, metadata form (title/description), and an upload button.

// import React, { useState, useCallback } from 'react'; // React core and hooks
// import { UploadCloud, FileVideo, FileAudio, Image as ImageIcon, File as FileIcon, X } from 'lucide-react'; // Icons used in the UI
// import Card from 'react-bootstrap/Card'; // Bootstrap card container for the whole upload box
// import Nav from 'react-bootstrap/Nav'; // Pills/tabs for media type selection
// import Button from 'react-bootstrap/Button'; // Buttons for actions
// import Form from 'react-bootstrap/Form'; // Form controls for title/description inputs
// import Row from 'react-bootstrap/Row'; // Grid row for responsive form layout
// import Col from 'react-bootstrap/Col'; // Grid column for responsive form layout
// import Stack from 'react-bootstrap/Stack'; // Flex stack for spacing/alignment
// import { contentMediaAPI } from '../../../services/contentService'; // Import the API

// // Define media types with labels and icons; colors are omitted (Tailwind removed)
// // We'll use Bootstrap variants and simple inline styles instead
// const MEDIA_TYPES = [
//     { id: 'video', label: 'Video', icon: FileVideo },
//     { id: 'audio', label: 'Audio', icon: FileAudio },
//     { id: 'image', label: 'Image', icon: ImageIcon },
//     { id: 'other', label: 'Other', icon: FileIcon },
// ] as const;

// // Component export so you can import and use it in your Content Management page
// export function UploadZone() {
//     // Track the selected media type (default "other" like your original)
//     const [selectedType, setSelectedType] = useState<typeof MEDIA_TYPES[number]['id']>('other');
//     // Track whether the drag area is active (dragenter/dragover) to adjust visual feedback
//     const [dragActive, setDragActive] = useState(false);
//     // Track the selected file (from drop or file input)
//     const [file, setFile] = useState<File | null>(null);
//     // Track title and description
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');

//     // Handle drag events to toggle the "active" state and prevent default browser behavior
//     const handleDrag = useCallback((e: React.DragEvent) => {
//         e.preventDefault(); // Prevent opening the file in the browser
//         e.stopPropagation(); // Stop event bubbling to parent nodes
//         if (e.type === 'dragenter' || e.type === 'dragover') {
//             setDragActive(true); // Highlight drop zone while dragging over
//         } else if (e.type === 'dragleave') {
//             setDragActive(false); // Remove highlight when leaving
//         }
//     }, []);

//     // Handle drop event: store the first file dropped and reset active state
//     const handleDrop = useCallback((e: React.DragEvent) => {
//         e.preventDefault(); // Prevent default file-open behavior
//         e.stopPropagation(); // Stop propagation
//         setDragActive(false); // Remove highlight on drop
//         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//             setFile(e.dataTransfer.files[0]); // Save the dropped file to state
//         }
//     }, []);

//     // Handle file input change: store the first selected file from the input
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         e.preventDefault(); // Prevent form submission (defensive)
//         if (e.target.files && e.target.files[0]) {
//             setFile(e.target.files[0]); // Save the chosen file to state
//         }
//     };

//     const handleUpload = async () => {
//         if (!file) {
//             alert("Please select a file first.");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("description", description);
//         formData.append("media_type", selectedType); // 'video' | 'audio' | 'image' | 'other'
//         formData.append("file", file); // actual file object

//         try {
//             const response = await contentMediaAPI.createMedia(formData);
//             console.log("Upload successful:", response);

//             // Optionally reset form
//             setFile(null);
//             setTitle('');
//             setDescription('');
//         } catch (err) {
//             console.error("Upload failed:", err);
//         }
//     };

//     // Render the React-Bootstrap layout that mirrors your Tailwind version
//     return (
//         // Card provides a clean container with padding, border, and shadow
//         <Card style={{ borderRadius: 12 }}>
//             {/* Card header: "Upload New Content" */}
//             <Card.Header as="h2" style={{ fontSize: '1rem', fontWeight: 600 }}>
//                 Upload New Content
//             </Card.Header>

//             {/* Card body: everything else (tabs, drop zone, form, button) */}
//             <Card.Body>
//                 {/* Media type selection as pill-style nav (scrollable horizontally if needed) */}
//                 <div className="content-type-pills" style={{ overflowX: 'auto', paddingBottom: 8, marginBottom: 16 }}>
//                     <Nav variant="pills" activeKey={selectedType} onSelect={(k) => k && setSelectedType(k as typeof selectedType)}>
//                         {/* Map media types into Nav.Item/Nav.Link entries */}
//                         {MEDIA_TYPES.map((type) => {
//                             const Icon = type.icon; // Select the icon component per type
//                             const isSelected = selectedType === type.id; // Determine current selection
//                             return (
//                                 <Nav.Item key={type.id}>
//                                     <Nav.Link
//                                         eventKey={type.id} // Link key used by Nav to track active
//                                         // Add some horizontal spacing between pills
//                                         style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 8px', marginRight: 8 }}
//                                     >
//                                         {/* Icon left of label; color changes subtly when active */}
//                                         <Icon size={18} color={isSelected ? '#fff' : '#6c757d'} />
//                                         {/* Label text */}
//                                         <span style={{ fontWeight: 500, color: isSelected ? '#fff' : '#6c757d' }}>{type.label}</span>
//                                     </Nav.Link>
//                                 </Nav.Item>
//                             );
//                         })}
//                     </Nav>
//                 </div>

//                 {/* Drag-and-drop upload area; styled with dashed border and hover/active feedback */}
//                 <div
//                     // Relative container to host the invisible file input overlay
//                     style={{
//                         position: 'relative', // Allows absolute positioning of the input
//                         border: '2px dashed', // Dashed border like the Tailwind version
//                         borderColor: dragActive ? '#198754' : '#ced4da', // Green when active, gray otherwise
//                         borderRadius: 12, // Rounded corners
//                         padding: 24, // Inner spacing
//                         textAlign: 'center', // Center the content
//                         transition: 'border-color 150ms ease, background-color 150ms ease', // Smooth visual changes
//                         backgroundColor: dragActive ? 'rgba(25, 135, 84, 0.08)' : 'transparent', // Light green on drag active
//                         cursor: 'pointer', // Indicate interactivity
//                     }}
//                     onDragEnter={handleDrag} // Activate on drag enter
//                     onDragLeave={handleDrag} // Deactivate on drag leave
//                     onDragOver={handleDrag} // Keep active while over
//                     onDrop={handleDrop} // Handle file drop
//                 >
//                     {/* Invisible file input covering the whole drop zone to support click-to-upload */}
//                     <Form.Control
//                         type="file" // File input
//                         onChange={handleChange} // Store selected file
//                         // Overlay the input so clicks anywhere open the file picker
//                         style={{
//                             position: 'absolute',
//                             inset: 0, // Stretch to all edges
//                             width: '100%',
//                             height: '100%',
//                             opacity: 0, // Invisible but clickable
//                             cursor: 'pointer', // Show pointer cursor
//                         }}
//                     />

//                     {/* If a file is selected, show preview name, size, and a remove button */}
//                     {file ? (
//                         <Stack direction="horizontal" gap={3} className="justify-content-center">
//                             {/* Icon bubble for the selected file */}
//                             <div
//                                 style={{
//                                     padding: 12, // Space around the icon
//                                     backgroundColor: 'rgba(25, 135, 84, 0.15)', // Light green background
//                                     borderRadius: 999, // Circular shape
//                                 }}
//                             >
//                                 <FileIcon size={24} color="#198754" /> {/* Green file icon */}
//                             </div>

//                             {/* File name and size */}
//                             <div style={{ textAlign: 'left' }}>
//                                 <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#212529' }}>{file.name}</p> {/* File name */}
//                                 <p style={{ margin: 0, fontSize: 12, color: '#6c757d' }}>
//                                     {(file.size / 1024 / 1024).toFixed(2)} MB {/* Human-readable size */}
//                                 </p>
//                             </div>

//                             {/* Remove file button */}
//                             <Button
//                                 variant="light" // Subtle button style
//                                 size="sm" // Small size to match compact UI
//                                 onClick={(e) => {
//                                     e.preventDefault(); // Prevent unintended form submit
//                                     setFile(null); // Clear file state
//                                 }}
//                                 style={{ borderRadius: 999 }} // Make it pill/circular
//                                 aria-label="Remove selected file" // Accessibility label
//                             >
//                                 <X size={16} color="#6c757d" /> {/* Gray 'X' icon */}
//                             </Button>
//                         </Stack>
//                     ) : (
//                         // Empty state: prompt user to click or drag files, with an upload icon and helper text
//                         <div>
//                             {/* Circular backdrop for upload icon */}
//                             <div
//                                 style={{
//                                     margin: '0 auto', // Center horizontally
//                                     width: 48,
//                                     height: 48,
//                                     borderRadius: 999, // Circle
//                                     backgroundColor: 'rgba(25, 135, 84, 0.08)', // Light green tint
//                                     display: 'flex', // Center icon with flex
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                 }}
//                             >
//                                 <UploadCloud size={24} color="#198754" /> {/* Green upload icon */}
//                             </div>

//                             {/* Instruction line: click or drag-and-drop */}
//                             <div style={{ marginTop: 8, color: '#6c757d' }}>
//                                 <span style={{ fontWeight: 600, color: '#198754' }}>Click to upload</span> or drag and drop
//                             </div>

//                             {/* Supported file types and size note */}
//                             <p style={{ marginTop: 4, fontSize: 12, color: '#6c757d' }}>MP4, MP3, PNG, JPG up to 50MB</p>
//                         </div>
//                     )}
//                 </div>

//                 {/* Metadata form for Title and Description, laid out responsively using Bootstrap grid */}
//                 <Row style={{ marginTop: 24 }} xs={1} md={2}>
//                     {/* Title input */}
//                     <Col>
//                         <Form.Label style={{ fontSize: 13, fontWeight: 600, color: '#495057', marginBottom: 4 }}>Title</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter content title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                         />
//                     </Col>

//                     {/* Description input */}
//                     <Col>
//                         <Form.Label style={{ fontSize: 13, fontWeight: 600, color: '#495057', marginBottom: 4 }}>Description</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Brief description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                         />
//                     </Col>
//                 </Row>

//                 {/* Right-aligned upload button */}
//                 <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button
//                         variant="success"
//                         onClick={handleUpload}
//                     >
//                         Upload Content
//                     </Button>
//                 </div>
//             </Card.Body>
//         </Card>
//     );
// }