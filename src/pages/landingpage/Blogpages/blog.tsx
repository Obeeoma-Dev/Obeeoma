import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import { BlogCard } from '../../../components/Blog/blogCard';
import { BlogHero } from '../../../components/Blog/blogHero';
import { CategoryFilter } from '../../../components/Blog/categoryFilter';
import { FloatingWhatsApp } from '../../../components/Contactus/floatingWhatsup';

// Importing images.
import Africaworkforce from '../../../assets/Images/workforce.png';
import Freeworkspace from '../../../assets/Images/freeworkspace.png';
import Aiworkplaces from '../../../assets/Images/aioffice.png';
import Dailyhabbits from '../../../assets/Images/dailyhabbits.png';
import Mentallyhealthyworkplace from '../../../assets/Images/mentallyhealthyworkplaces.png';
import Breakingstigma from '../../../assets/Images/breackingstigma.png';
import Mentalhealthawareness from '../../../assets/Images/mentalhealthimage.png';
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
        title: 'Why Employee Mental Health Should Be Every Company’s Priority in 2025',
        excerpt:
            'In today’s fast-changing work environment, mental health has become a strategic business priority. Learn why companies that support emotional well-being outperform others.',
        image: Africaworkforce,
        category: 'Workplace Wellness',
        date: 'Jan 20, 2025',
        readTime: '6 min read',
        author: 'Obeeoma Editorial Team',
        featured: true,
    },
    {
        id: 2,
        title: 'How to Build a Psychologically Safe Workplace',
        excerpt:
            'Discover how African organizations can create environments where employees feel safe to speak up, innovate, and collaborate without fear of judgment.',
        image: Freeworkspace,
        category: 'Leadership',
        date: 'Jan 21, 2025',
        readTime: '5 min read',
        author: 'Obeeoma Editorial Team',
    },
    {
        id: 3,
        title: 'How AI Is Revolutionizing Employee Mental Health Support',
        excerpt:
            'Explore how AI-driven tools are personalizing mental health care in the workplace, helping leaders predict and prevent burnout.',
        image: Aiworkplaces,
        category: 'Technology',
        date: 'Jan 22, 2025',
        readTime: '5 min read',
        author: 'Obeeoma Tech Team',
    },
    {
        id: 4,
        title: '5 Simple Daily Habits to Boost Your Mental Well-Being at Work',
        excerpt:
            'Learn easy, science-backed habits to manage stress, boost mood, and stay productive throughout your workday.',
        image: Dailyhabbits,
        category: 'Self-Care',
        date: 'Jan 23, 2025',
        readTime: '4 min read',
        author: 'Obeeoma Wellness Team',
    },
    {
        id: 5,
        title: 'How HR Leaders Can Champion Mental Health in 2025',
        excerpt:
            'From policy creation to manager training, here’s how HR professionals can become the architects of mentally healthy workplaces.',
        image: Mentallyhealthyworkplace,
        category: 'HR & Leadership',
        date: 'Jan 24, 2025',
        readTime: '6 min read',
        author: 'Obeeoma HR Insights',
    },
    {
        id: 6,
        title: 'Breaking the Stigma: Mental Health Conversations in African Workplaces',
        excerpt:
            'Learn how African professionals are redefining mental health culture by breaking silence and promoting openness in the workplace.',
        image: Breakingstigma,
        category: 'Community',
        date: 'Jan 25, 2025',
        readTime: '6 min read',
        author: 'Obeeoma Editorial Team',
    },
    {
        id: 7,
        title: 'Behind Obeeoma: Why We’re Building Africa’s AI Mental Health Platform',
        excerpt:
            'Discover the vision and mission behind Obeeoma — Africa’s first AI-powered platform transforming access to mental health care.',
        image: Mentalhealthawareness,
        category: 'Innovation',
        date: 'Jan 26, 2025',
        readTime: '7 min read',
        author: 'Obeeoma Founding Team',
    },
];

const categories = ['Self-Care', 'Anxiety', 'Wellness', 'Relationships', 'Community']
export function Blog() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [filteredBlogs, setFilteredBlogs] = useState(blogData)
    const [, setIsVisible] = useState(false)
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
                                    <Facebook color="white" />
                                </a>
                                <a href="#" className="blog-footer-social-link" aria-label="Twitter">
                                    <Twitter color="white" />
                                </a>
                                <a href="#" className="blog-footer-social-link" aria-label="Instagram">
                                    <Instagram color="white" />
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
            <FloatingWhatsApp />
        </div>
    )
}