// Import necessary React modules
import React, { useState } from 'react';
// Import Form and Button components from React-Bootstrap
import { Form, Button } from 'react-bootstrap';
// Import the Send icon from lucide-react
import { Send } from 'lucide-react';


// Define and export the ContactForm component
export function ContactForm() {
    // useState hook to store form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // useState hook to track which input field is currently focused
    const [, setFocusedField] = useState<string | null>(null);

    // Handle input and textarea changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        setFormData({
            ...formData, // keep existing values
            [e.target.name]: e.target.value, // update only the field that changed
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault(); // Prevent page reload
        console.log('Form submitted:', formData); // Log form data (replace with API call later)
    };

    return (
        // Main Form container
        <Form onSubmit={handleSubmit} style={{ fontFamily: "body" }}>
            {/* Name Field */}
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingName"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                />
                <label htmlFor="floatingName" style={{ fontFamily: "heading" }}
                >Your Name</label>
            </Form.Floating>

            {/* Email Field */}
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingEmail"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                />
                <label htmlFor="floatingEmail" style={{ fontFamily: "heading" }}
                >Email Address</label>
            </Form.Floating>

            {/* Subject Field */}
            <Form.Floating className="mb-3">
                <Form.Control
                    id="floatingSubject"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    required
                />
                <label htmlFor="floatingSubject" style={{ fontFamily: "heading" }}
                >Subject</label>
            </Form.Floating>

            {/* Message Field */}
            <Form.Floating className="mb-4 message-container">
                <Form.Control
                    as="textarea"
                    id="floatingMessage"
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="message-textarea"
                    rows={6}
                    required
                />
                <label htmlFor="floatingMessage" style={{ fontFamily: "heading" }}
                >Your Message</label>
            </Form.Floating>

            {/* Submit Button */}
            <Button type="submit" className="w-100 submit-btn d-flex align-items-center justify-content-center gap-2"
                style={{ fontFamily: "body" }}
            >
                Send Message
                <Send className="send-icon" />
            </Button>
        </Form>
    );
}
