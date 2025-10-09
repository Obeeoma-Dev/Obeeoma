// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

// Import Bootstrap components
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

// Define the shape of the form data using a TypeScript interface
interface AccountData {
    fullName: string;
    email: string;
    role: string;
    phone: string;
    bio: string;
}

// Define the AccountForm component
const AccountForm: React.FC = () => {
    // State to hold form input values
    const [formData, setFormData] = useState<AccountData>({
        fullName: '',
        email: '',
        role: '',
        phone: '',
        bio: '',
    });

    // State to track loading status
    const [loading, setLoading] = useState<boolean>(true);

    // State to track error messages
    const [error, setError] = useState<string | null>(null);

    // Simulate fetching default values (e.g. from API or mock service)
    useEffect(() => {
        try {
            // Simulated delay using setTimeout
            setTimeout(() => {
                const defaultValues: AccountData = {
                    fullName: 'Dr. Sarah Johnson',
                    email: 'sarah.johnson@mindcare.com',
                    role: 'System Administrator',
                    phone: '(555) 123-4567',
                    bio: 'Dr. Sarah Johnson is a system administrator with over 10 years of experience in mental health platforms.',
                };
                setFormData(defaultValues);
                setLoading(false); // Stop loading once data is set
            }, 1000); // 1 second delay
        } catch (err) {
            setError('Failed to load account data.');
            setLoading(false);
        }
    }, []);

    // Handle input changes for all fields
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        // Placeholder for future API call
        console.log('Form submitted:', formData);
    };

    // Show loading spinner while data is being fetched
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="success" />
                <p className="mt-3">Loading account data...</p>
            </div>
        );
    }

    // Show error message if data fails to load
    if (error) {
        return (
            <Alert variant="danger" className="mt-3">
                {error}
            </Alert>
        );
    }

    // Render the form once data is loaded and no error
    return (
        <Form onSubmit={handleSubmit}>
            {/* Full Name input */}
            <Form.Group controlId="formFullName" className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                />
            </Form.Group>

            {/* Email input */}
            <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
            </Form.Group>

            {/* Role input */}
            <Form.Group controlId="formRole" className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Enter role"
                />
            </Form.Group>

            {/* Phone input */}
            <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                />
            </Form.Group>

            {/* Bio input */}
            <Form.Group controlId="formBio" className="mb-3">
                <Form.Label>Professional Bio</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Enter bio"
                />
            </Form.Group>

            {/* Submit button */}
            <Button variant="success" type="submit">
                Save Changes
            </Button>
        </Form>
    );
};

export default AccountForm;