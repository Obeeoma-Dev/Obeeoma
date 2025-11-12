import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { Search } from 'lucide-react'
interface BlogHeroProps {
    onSearch: (query: string) => void
}
export function BlogHero({ onSearch }: BlogHeroProps) {
    const [isVisible, setIsVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    useEffect(() => {
        setIsVisible(true)
    }, [])
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(searchQuery)
    }
    return (
        <div className="blog-hero">
            <div className="blog-hero-overlay"></div>
            <div className="blog-hero-pattern"></div>
            <Container className="blog-hero-content">
                <div className={`blog-hero-text ${isVisible ? 'visible' : ''}`}>
                    <h1 className="blog-hero-title" style={{ fontFamily: "heading" }}>
                        Insights & Resources
                    </h1>
                    <p className="blog-hero-subtitle" style={{ fontFamily: "body" }}>
                        Explore our collection of articles on mental health, wellness, and personal growth
                    </p>
                    <form onSubmit={handleSearch} className="blog-search-form">
                        <div className="blog-search-wrapper">
                            <Search className="blog-search-icon" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="blog-search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="blog-search-button" style={{ fontFamily: "body" }}>
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    )
}