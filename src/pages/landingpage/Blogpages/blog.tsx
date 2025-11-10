import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import { BlogCard } from '../../../components/Blog/blogCard';
import { BlogHero } from '../../../components/Blog/blogHero';
import { CategoryFilter } from '../../../components/Blog/categoryFilter';
// import { FloatingWhatsApp } from '../../../components/Contactus/floatingWhatsup';
interface Blog {
    id: number
    title: string
    excerpt: string
    image: string
    category: string
    date: string
    readTime: string
    author: string
    featured?: boolean
}
const blogData: Blog[] = [
    {
        id: 1,
        title: 'Why It Is Okay to Take a Break',
        excerpt: 'Discover the importance of taking breaks for your mental health and overall well-being. Learn practical strategies to incorporate rest into your daily routine.',
        image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&q=80',
        category: 'Self-Care',
        date: 'Jan 15, 2025',
        readTime: '5 min read',
        author: 'Dr. Sarah Johnson',
        featured: true,
    },
    {
        id: 2,
        title: '5 Effective Coping Strategies for Managing Anxiety',
        excerpt: 'Practical and evidence-based techniques to help you manage anxiety in your daily life and build resilience.',
        image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80',
        category: 'Anxiety',
        date: 'Jan 12, 2025',
        readTime: '7 min read',
        author: 'Michael Chen',
    },
    {
        id: 3,
        title: 'BADMINTON: A Holistic Approach to Physical and Mental Wellness',
        excerpt: 'Explore how physical activities like badminton can significantly improve both your physical health and mental well-being.',
        image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
        category: 'Wellness',
        date: 'Jan 10, 2025',
        readTime: '6 min read',
        author: 'Emma Williams',
    },
    {
        id: 4,
        title: 'Understanding Anxiety in a Relationship',
        excerpt: 'Navigate the complexities of anxiety within relationships and learn how to build stronger, healthier connections.',
        image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
        category: 'Relationships',
        date: 'Jan 8, 2025',
        readTime: '8 min read',
        author: 'Dr. James Anderson',
    },
    {
        id: 5,
        title: 'Common Causes Of Anxiety And Its Preventive Measures',
        excerpt: 'Identify the root causes of anxiety and discover effective preventive strategies to maintain mental wellness.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
        category: 'Anxiety',
        date: 'Jan 5, 2025',
        readTime: '6 min read',
        author: 'Dr. Lisa Martinez',
    },
    {
        id: 6,
        title: 'Mental Health in Sub-Saharan Africa: A Focus on Affected Communities',
        excerpt: 'An in-depth look at mental health challenges and solutions in Sub-Saharan African communities.',
        image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
        category: 'Community',
        date: 'Jan 3, 2025',
        readTime: '10 min read',
        author: 'Dr. Kwame Osei',
    },
]
const categories = ['Self-Care', 'Anxiety', 'Wellness', 'Relationships', 'Community']
export function Blog() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [filteredBlogs, setFilteredBlogs] = useState(blogData)
    const [isVisible, setIsVisible] = useState(false)
    useEffect(() => {
        setIsVisible(true)
    }, [])
    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredBlogs(blogData)
        } else {
            setFilteredBlogs(blogData.filter((blog) => blog.category === activeCategory))
        }
    }, [activeCategory])
    const handleSearch = (query: string) => {
        if (query.trim() === '') {
            setFilteredBlogs(blogData)
        } else {
            const filtered = blogData.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(query.toLowerCase()) ||
                    blog.excerpt.toLowerCase().includes(query.toLowerCase()) ||
                    blog.category.toLowerCase().includes(query.toLowerCase())
            )
            setFilteredBlogs(filtered)
        }
    }
    return (
        <div className="blog-page">            
            {/* Hero Section */}
            <BlogHero onSearch={handleSearch} />
            {/* Category Filter */}
            <Container className="my-5">
                <CategoryFilter
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                />
            </Container>
            {/* Featured Blog */}
            {activeCategory === 'All' && filteredBlogs.length > 0 && (
                <Container className="mb-5">
                    <h2 className="blog-section-title" style={{ fontFamily: "heading" }}>Featured Article</h2>
                    <Row>
                        <Col xs={12}>
                            <BlogCard {...filteredBlogs[0]} featured={true} />
                        </Col>
                    </Row>
                </Container>
            )}
            {/* Blog Grid */}
            <Container className="blog-grid-section">
                <h2 className="blog-section-title">
                    {activeCategory === 'All' ? 'Latest Articles' : `${activeCategory} Articles`}
                </h2>
                <Row className="g-4">
                    {filteredBlogs.slice(activeCategory === 'All' ? 1 : 0).map((blog, index) => (
                        <Col key={blog.id} xs={12} md={6} lg={4}>
                            <BlogCard {...blog} animationDelay={index * 100} />
                        </Col>
                    ))}
                </Row>
                {filteredBlogs.length === 0 && (
                    <div className="blog-no-results" style={{ fontFamily: "body" }}>
                        <p>No articles found. Try adjusting your search or filter.</p>
                    </div>
                )}
            </Container>
            {/* Newsletter Section */}
            <div className="blog-newsletter-section">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6}>
                            <div className="blog-newsletter-content">
                                <h2 className="blog-newsletter-title" style={{ fontFamily: "heading" }}>Stay Updated</h2>
                                <p className="blog-newsletter-text" style={{ fontFamily: "body" }}>
                                    Subscribe to our newsletter for the latest insights on mental health and wellness
                                </p>
                                <form className="blog-newsletter-form">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="blog-newsletter-input"
                                        required
                                    />
                                    <button type="submit" className="blog-newsletter-button" style={{ fontFamily: "heading" }}>
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* Footer */}
            <footer className="blog-footer">
                <Container>
                    <Row className="align-items-center">
                        <Col xs={12} md={6} className="text-center text-md-start mb-3 mb-md-0">
                            <div className="blog-footer-social">
                                <a href="#" className="blog-footer-social-link" aria-label="Facebook">
                                    <Facebook />
                                </a>
                                <a href="#" className="blog-footer-social-link" aria-label="Twitter">
                                    <Twitter />
                                </a>
                                <a href="#" className="blog-footer-social-link" aria-label="Instagram">
                                    <Instagram />
                                </a>
                            </div>
                        </Col>
                        <Col xs={12} md={6} className="text-center text-md-end">
                            <p className="blog-footer-text" style={{ fontFamily: "body" }}>
                                Copyright © 2025 Obeeoma | Powered by{' '}
                                <span className="blog-footer-highlight">RHIPFactory</span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
            {/* Floating WhatsApp Button */}
            {/* <FloatingWhatsApp /> */}
        </div>
    )
}