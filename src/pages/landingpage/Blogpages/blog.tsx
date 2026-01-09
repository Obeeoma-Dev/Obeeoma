import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BlogCard } from "../../../components/Blog/blogCard";
import { BlogHero } from "../../../components/Blog/blogHero";
// import { CategoryFilter } from '../../../components/Blog/categoryFilter';
import { FloatingWhatsApp } from "../../../components/Contactus/floatingWhatsup";
import Navigation from "../../../components/shared/Navigation";

// Importing images.
import Africaworkforce from "../../../assets/Images/workforce.png";
import Freeworkspace from "../../../assets/Images/freeworkspace.png";
import Aiworkplaces from "../../../assets/Images/aioffice.png";
import Dailyhabbits from "../../../assets/Images/dailyhabbits.png";
import Mentallyhealthyworkplace from "../../../assets/Images/mentallyhealthyworkplaces.png";
import Breakingstigma from "../../../assets/Images/breackingstigma.png";
import Mentalhealthawareness from "../../../assets/Images/mentalhealthimage.png";

// Importing the social handle footer.
import Footer from "../../../components/shared/socialhandlesfooter";
interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
}

// const categories = ['Self-Care', 'Anxiety', 'Wellness', 'Relationships', 'Community']
export function Blog() {
  // -----------------------------
  // STATE DEFINITIONS
  // -----------------------------

  // Holds the currently selected category (e.g. "All", "Technology")
  // You already had this – we keep it unchanged
  const [activeCategory] = useState<string>("All");

  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: 1,
      title:
        "Why Employee Mental Health Should Be Every Company’s Priority in 2025",
      excerpt:
        "In today’s fast-changing work environment, mental health has become a strategic business priority. Learn why companies that support emotional well-being outperform others.",
      image: Africaworkforce,
      category: "Workplace Wellness",
      date: "Jan 20, 2025",
      readTime: "6 min read",
      author: "Obeeoma Editorial Team",
      featured: true,
    },
    {
      id: 2,
      title: "How to Build a Psychologically Safe Workplace",
      excerpt:
        "Discover how African organizations can create environments where employees feel safe to speak up, innovate, and collaborate without fear of judgment.",
      image: Freeworkspace,
      category: "Leadership",
      date: "Jan 21, 2025",
      readTime: "5 min read",
      author: "Obeeoma Editorial Team",
    },
    {
      id: 3,
      title: "How AI Is Revolutionizing Employee Mental Health Support",
      excerpt:
        "Explore how AI-driven tools are personalizing mental health care in the workplace, helping leaders predict and prevent burnout.",
      image: Aiworkplaces,
      category: "Technology",
      date: "Jan 22, 2025",
      readTime: "5 min read",
      author: "Obeeoma Tech Team",
    },
    {
      id: 4,
      title: "5 Simple Daily Habits to Boost Your Mental Well-Being at Work",
      excerpt:
        "Learn easy, science-backed habits to manage stress, boost mood, and stay productive throughout your workday.",
      image: Dailyhabbits,
      category: "Self-Care",
      date: "Jan 23, 2025",
      readTime: "4 min read",
      author: "Obeeoma Wellness Team",
    },
    {
      id: 5,
      title: "How HR Leaders Can Champion Mental Health in 2025",
      excerpt:
        "From policy creation to manager training, here’s how HR professionals can become the architects of mentally healthy workplaces.",
      image: Mentallyhealthyworkplace,
      category: "HR & Leadership",
      date: "Jan 24, 2025",
      readTime: "6 min read",
      author: "Obeeoma HR Insights",
    },
    {
      id: 6,
      title:
        "Breaking the Stigma: Mental Health Conversations in African Workplaces",
      excerpt:
        "Learn how African professionals are redefining mental health culture by breaking silence and promoting openness in the workplace.",
      image: Breakingstigma,
      category: "Community",
      date: "Jan 25, 2025",
      readTime: "6 min read",
      author: "Obeeoma Editorial Team",
    },
    {
      id: 7,
      title:
        "Behind Obeeoma: Why We’re Building Africa’s AI Mental Health Platform",
      excerpt:
        "Discover the vision and mission behind Obeeoma — Africa’s first AI-powered platform transforming access to mental health care.",
      image: Mentalhealthawareness,
      category: "Innovation",
      date: "Jan 26, 2025",
      readTime: "7 min read",
      author: "Obeeoma Founding Team",
    },
  ]);

  // Holds blogs AFTER filtering/searching
  // This is what the UI renders
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  // Visibility flag you already had (kept to avoid breaking anything)
  const [, setIsVisible] = useState(false);

  // -----------------------------
  // FETCH BLOGS FROM BACKEND
  // -----------------------------

  useEffect(() => {
    // Define async function to fetch blogs
    const fetchBlogs = async () => {
      try {
        // Call backend API (change URL if needed)
        const response = await fetch("/api/blogs/");

        // Convert response to JSON
        const data: Blog[] = await response.json();

        // Save backend data into blogs state
        setBlogs(data);

        // Initially show all blogs
        setFilteredBlogs(data);
      } catch (error) {
        // Log error if backend fails (prevents app crash)
        console.error("Error fetching blogs:", error);
      }
    };

    // Call the fetch function
    fetchBlogs();

    // Set visibility flag (your existing behavior)
    setIsVisible(true);
  }, []);

  // -----------------------------
  // FILTER BY CATEGORY
  // -----------------------------

  useEffect(() => {
    // If category is "All", show everything
    if (activeCategory === "All") {
      setFilteredBlogs(blogs);
    } else {
      // Otherwise filter blogs by category
      setFilteredBlogs(
        blogs.filter((blog) => blog.category === activeCategory),
      );
    }
  }, [activeCategory, blogs]);

  // -----------------------------
  // SEARCH HANDLER (USED BY BlogHero)
  // -----------------------------

  const handleSearch = (query: string) => {
    // Trim and normalize search text
    const searchValue = query.trim().toLowerCase();

    // If search is empty, reset to all blogs
    if (!searchValue) {
      setFilteredBlogs(blogs);
      return;
    }

    // Filter blogs by title, excerpt, or category
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchValue) ||
        blog.excerpt.toLowerCase().includes(searchValue) ||
        blog.category.toLowerCase().includes(searchValue),
    );

    // Update filtered blogs state
    setFilteredBlogs(filtered);
  };

  // -----------------------------
  // UI (UNCHANGED)
  // -----------------------------

  return (
    <div className="blog-page">
      {/* Navigation Bar */}
      <Navigation />

      <main style={{ paddingTop: "80px" }}>
        {/* Hero Section */}
        <BlogHero onSearch={handleSearch} />

        {/* Margin to create space between the two components */}
        <div style={{ marginBottom: "120px" }} />

        {/* Featured Blog */}
        {activeCategory === "All" && filteredBlogs.length > 0 && (
          <Container className="mb-5 mt-5">
            <h2
              className="blog-section-title"
              style={{ fontFamily: "heading" }}
            >
              Featured Article
            </h2>
            <Row>
              <Col xs={12}>
                {/* First blog is treated as featured */}
                <BlogCard {...filteredBlogs[0]} featured />
              </Col>
            </Row>
          </Container>
        )}

        {/* Blog Grid */}
        <Container className="blog-grid-section">
          <h2 className="blog-section-title">
            {activeCategory === "All"
              ? "Latest Articles"
              : `${activeCategory} Articles`}
          </h2>
          <Row className="g-4">
            {filteredBlogs
              // Skip first blog if "All" (already shown as featured)
              .slice(activeCategory === "All" ? 1 : 0)
              .map((blog, index) => (
                <Col key={blog.id} xs={12} md={6} lg={4}>
                  <BlogCard {...blog} animationDelay={index * 100} />
                </Col>
              ))}
          </Row>

          {/* Empty state */}
          {filteredBlogs.length === 0 && (
            <div className="blog-no-results" style={{ fontFamily: "body" }}>
              <p>No articles found. Try adjusting your search or filter.</p>
            </div>
          )}
        </Container>

        {/* Socials Footer */}
        <Footer />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </main>
    </div>
  );
}
