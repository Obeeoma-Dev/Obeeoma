import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Search } from 'lucide-react'
// Import the handshake background image
import Handshake from '../../assets/Images/bussinesshandshake.jpg';

// Define props.
interface BlogHeroProps {
    // Function to handle search queries passed from parent
    onSearch: (query: string) => void
}

// Main BlogHero functional component
export function BlogHero({ onSearch }: BlogHeroProps) {
    // Track visibility for fade-in animation or CSS transitions
    const [isVisible, setIsVisible] = useState(false)

    // Store current search query entered by the user
    const [searchQuery, setSearchQuery] = useState('')

    // Trigger the visibility effect once when the component mounts
    useEffect(() => {
        setIsVisible(true)
    }, [])

    // Handle form submission for search
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault() // Prevent default browser refresh
        onSearch(searchQuery) // Pass query up to parent
    }

    return (
        // Main hero section with a handshake background image
        <div
            className="blog-hero"
            style={{
                backgroundImage: `url(${Handshake})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                color: 'white', // Ensures text is visible on dark overlay
                overflow: 'hidden',
            }}
        >
            {/* Soft overlay for readability over the background image */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.60)', // semi-transparent dark overlay
                    zIndex: 1, // sits behind text but above background
                }}
            ></div>

            {/* Content container using React-Bootstrap */}
            <Container
                className="blog-hero-content"
                style={{
                    position: 'relative', // ensures it's above overlay
                    zIndex: 2,
                    padding: '6rem 1rem', // gives spacing top and bottom
                    textAlign: 'center',
                }}
            >
                {/* Text content with fade-in animation based on visibility */}
                <div className={`blog-hero-text ${isVisible ? 'visible' : ''}`}>
                    {/* Main title */}
                    <h1 className="blog-hero-title" style={{ fontFamily: 'heading' }}>
                        Insights & Resources
                    </h1>

                    {/* Subtitle text */}
                    <p className="blog-hero-subtitle" style={{ fontFamily: 'body' }}>
                        Explore our collection of articles on mental health, wellness, and personal growth
                    </p>

                    {/* Search form */}
                    <form onSubmit={handleSearch} className="blog-search-form">
                        <div className="blog-search-wrapper" style={{ display: 'inline-flex', alignItems: 'center' }}>
                            {/* Search icon from Lucide */}
                            <Search className="blog-search-icon" />

                            {/* Search input field */}
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="blog-search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    marginLeft: '0.5rem',
                                    marginRight: '0.5rem',
                                    fontFamily: 'body',
                                }}
                                aria-label="Search articles"
                            />

                            {/* Search button */}
                            <button
                                type="submit"
                                className="blog-search-button"
                                style={{
                                    fontFamily: 'body',
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    borderRadius: '4px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}
