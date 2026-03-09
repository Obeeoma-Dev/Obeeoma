import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BlogCard } from "../../../components/Blog/blogCard";
import { BlogHero } from "../../../components/Blog/blogHero";
// import { CategoryFilter } from '../../../components/Blog/categoryFilter';
import { FloatingWhatsApp } from "../../../components/Contactus/floatingWhatsup";
import ReceptionistFloatingChat from "../../../components/landingpage/Contacts/ReceptionistFloatingChat";
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
  fullContent?: string;
  views?: number;
  confirmedReads?: number;
}

// Interface for backend article data
interface BackendArticle {
  id: number;
  title: string;
  excerpt?: string;
  featured_image?: string | null;
  category?: string;
  published_date?: string;
  content?: string;
  author?: string;
  featured?: boolean;
}

// Default blogs data - moved outside component to avoid dependency issues
const defaultBlogs: Blog[] = [
  {
    id: 1,
    title:
      "Why Employee Mental Health Should Be Every Company's Priority in 2025",
    excerpt:
      "In today's fast-changing work environment, mental health has become a strategic business priority. Learn why companies that support emotional well-being outperform others.",
    image: Africaworkforce,
    category: "Workplace Wellness",
    date: "Jan 20, 2025",
    readTime: "6 min read",
    author: "Obeeoma Editorial Team",
    featured: true,
    fullContent: "In today's rapidly evolving workplace landscape, mental health has emerged as a critical factor in organizational success. Companies that prioritize employee well-being are seeing significant improvements in productivity, retention, and overall performance. This comprehensive guide explores why mental health support should be at the forefront of every company's strategy in 2025.\n\nThe modern workplace presents unique challenges that can impact employee mental health. From remote work isolation to digital overload, professionals face unprecedented stressors that require thoughtful interventions. Forward-thinking organizations are recognizing that mental health support isn't just a benefit—it's a business imperative.\n\nResearch consistently shows that employees who feel supported in their mental health journey are more engaged, innovative, and loyal. They contribute more effectively to team goals and demonstrate higher levels of creativity and problem-solving abilities. This creates a positive cycle where well-being drives performance, which in turn reinforces organizational culture.\n\nImplementing effective mental health initiatives requires a multi-faceted approach. This includes access to professional counseling services, mental health days, flexible work arrangements, and training for managers to recognize and respond to mental health concerns. The most successful programs are those that are integrated into the company's DNA rather than treated as add-on benefits.",
    views: 1250,
    confirmedReads: 342,
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
    fullContent: "Psychological safety is the foundation of high-performing teams and innovative organizations. In environments where employees feel safe to express ideas, take risks, and be vulnerable, creativity flourishes and collaboration thrives. This guide explores practical strategies for building psychological safety in African workplaces.\n\nCreating psychological safety starts with leadership. Leaders must model vulnerability, admit mistakes, and actively seek input from all team members. When leaders demonstrate that it's safe to be imperfect, employees feel empowered to contribute their authentic selves to the workplace.\n\nEffective communication is another cornerstone of psychological safety. This includes establishing clear channels for feedback, encouraging open dialogue, and ensuring that all voices are heard and valued. Teams with strong psychological safety engage in constructive debate and challenge the status constructively without fear of retribution.\n\nBuilding psychological safety also requires addressing power dynamics and ensuring equitable treatment. When employees trust that decisions are made fairly and that their contributions are recognized regardless of position or background, they're more likely to engage fully and take calculated risks that drive innovation.",
    views: 892,
    confirmedReads: 234,
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
    fullContent: "Artificial Intelligence is transforming how organizations approach employee mental health support. From predictive analytics that identify burnout risk to personalized wellness recommendations, AI tools are making mental health care more accessible, proactive, and effective. This exploration delves into the cutting-edge technologies reshaping workplace wellness.\n\nAI-powered mental health platforms can analyze patterns in employee behavior, communication, and even biometric data to identify early warning signs of stress and burnout. These systems can trigger timely interventions, recommend resources, and provide personalized coping strategies before issues escalate.\n\nChatbots and virtual assistants powered by AI provide 24/7 mental health support, offering employees immediate access to resources and guidance. These tools can handle everything from stress management techniques to crisis intervention, ensuring help is always available when needed.\n\nThe future of AI in mental health includes even more sophisticated applications, including virtual reality therapy environments, predictive wellness planning, and integration with wearable devices for comprehensive health monitoring. As these technologies evolve, they promise to make mental health support more personalized, proactive, and effective than ever before.",
    views: 1567,
    confirmedReads: 456,
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
    fullContent: "Small daily habits can have a profound impact on your mental well-being at work. This guide explores five simple, evidence-based practices that can help you manage stress, boost your mood, and maintain productivity throughout your workday. These habits are easy to implement and can make a significant difference in your overall workplace experience.\n\nThe first habit is starting your day with intention. Taking just five minutes each morning to set your priorities and visualize a successful day can reduce anxiety and improve focus. This practice helps you approach your work with clarity and purpose rather than reacting to whatever comes your way.\n\nRegular movement breaks are another crucial habit. Research shows that even brief periods of physical activity can improve mood, reduce stress, and enhance cognitive function. Simple actions like stretching, walking around the office, or doing desk exercises can reset your mental state and boost energy levels.\n\nMindful breathing exercises provide immediate stress relief and can be done discreetly at your desk. Deep breathing techniques activate the parasympathetic nervous system, helping you calm down and refocus during challenging moments. Just a few minutes of conscious breathing can make a noticeable difference in your stress levels.",
    views: 743,
    confirmedReads: 189,
  },
  {
    id: 5,
    title: "How HR Leaders Can Champion Mental Health in 2025",
    excerpt:
      "From policy creation to manager training, here's how HR professionals can become the architects of mentally healthy workplaces.",
    image: Mentallyhealthyworkplace,
    category: "HR & Leadership",
    date: "Jan 24, 2025",
    readTime: "6 min read",
    author: "Obeeoma HR Insights",
    fullContent: "HR leaders play a pivotal role in shaping workplace mental health culture. As the architects of organizational policies and practices, HR professionals have the power to create environments where mental health thrives. This comprehensive guide explores how HR leaders can champion mental health initiatives in 2025 and beyond.\n\nEffective mental health leadership starts with policy development. HR professionals must create comprehensive policies that address mental health proactively, including flexible work arrangements, mental health days, and access to professional support. These policies should be communicated clearly and implemented consistently across all levels of the organization.\n\nManager training is another critical component. HR leaders must equip managers with the skills to recognize mental health concerns, have supportive conversations, and direct employees to appropriate resources. When managers are confident in their ability to handle mental health situations, employees feel more supported and understood.\n\nData-driven approaches enable HR leaders to measure the impact of mental health initiatives and continuously improve their programs. By tracking metrics like employee engagement, absenteeism, and utilization of mental health resources, HR can demonstrate the value of their investments and make informed decisions about future interventions.",
    views: 598,
    confirmedReads: 156,
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
    fullContent: "Breaking the stigma around mental health in African workplaces is crucial for creating supportive environments where employees can thrive. This powerful exploration examines how professionals across the continent are challenging traditional taboos and fostering open conversations about mental well-being.\n\nCultural change begins with leadership. When executives and managers openly discuss mental health challenges and share their own experiences, it creates permission for others to do the same. African companies are increasingly recognizing that mental health transparency builds trust and strengthens organizational culture.\n\nEmployee resource groups and peer support networks are proving effective in creating safe spaces for mental health discussions. These grassroots initiatives allow employees to connect with others who share similar experiences, reducing isolation and building community. The power of shared stories and mutual support cannot be underestimated in breaking down barriers.\n\nEducational initiatives are helping to reframe mental health as a normal part of the human experience rather than a weakness. By providing accurate information and dispelling myths, organizations are helping employees understand that seeking help is a sign of strength, not vulnerability. This cultural shift is essential for creating workplaces where mental health can be discussed openly and without judgment.",
    views: 892,
    confirmedReads: 267,
  },
  {
    id: 7,
    title:
      "Behind Obeeoma: Why We're Building Africa's AI Mental Health Platform",
    excerpt:
      "Discover the vision and mission behind Obeeoma — Africa's first AI-powered platform transforming access to mental health care.",
    image: Mentalhealthawareness,
    category: "Innovation",
    date: "Jan 26, 2025",
    readTime: "7 min read",
    author: "Obeeoma Founding Team",
    fullContent: "Obeeoma represents a groundbreaking approach to mental health care in Africa, combining cutting-edge AI technology with deep understanding of local contexts and cultural nuances. This behind-the-scenes look explores why we're building Africa's first AI-powered mental health platform and our vision for the future.\n\nThe mental health landscape in Africa presents unique challenges and opportunities. With diverse cultures, varying levels of digital infrastructure, and different approaches to mental wellness, we needed a solution that could adapt to local contexts while maintaining high standards of care. AI technology offers the scalability and personalization needed to address these complex requirements.\n\nOur platform leverages machine learning to provide personalized mental health support that respects cultural differences and individual preferences. From chatbot interfaces that communicate in multiple languages to predictive algorithms that identify at-risk individuals, Obeeoma is designed to meet people where they are and provide the support they need.\n\nThe vision extends beyond technology to create a comprehensive ecosystem of mental health support. By integrating with healthcare providers, employers, and community organizations, we're building a network that makes mental health care accessible, affordable, and effective for millions of Africans. This is not just a platform—it's a movement to transform mental health care across the continent.",
    views: 1234,
    confirmedReads: 389,
  },
];

// const categories = ['Self-Care', 'Anxiety', 'Wellness', 'Relationships', 'Community']
export function Blog() {
  // -----------------------------
  // STATE DEFINITIONS
  // -----------------------------

  // Holds the currently selected category (e.g. "All", "Technology")
  // You already had this – we keep it unchanged
  const [activeCategory] = useState<string>("All");

  const [blogs, setBlogs] = useState<Blog[]>(defaultBlogs);

  // Holds blogs AFTER filtering/searching
  // This is what the UI renders
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  // Visibility flag you already had (kept to avoid breaking anything)
  const [, setIsVisible] = useState(false);

  // Date formatter.
  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  // Image URL resolver
  const resolveImageUrl = (imageUrl: string | null | undefined): string => {
    if (!imageUrl) return "";

    // If it's a filename (no slash), construct the full media URL
    if (!imageUrl.startsWith("/") && !imageUrl.startsWith("http")) {
      return `http://64.225.122.101:8000/media/${imageUrl}`;
    }

    // If it's a relative path, prepend the base URL
    if (imageUrl.startsWith("/")) {
      return `http://64.225.122.101:8000${imageUrl}`;
    }

    // If it's already a full URL, return as is
    return imageUrl;
  };

  // -----------------------------
  // FETCH BLOGS FROM BACKEND
  // -----------------------------

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("Fetching blogs from API...");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}articles/`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw API data:", data);

        // Map backend fields to frontend Blog interface
        const mapped: Blog[] = data.map((item: BackendArticle) => ({
          id: item.id,
          title: item.title,
          excerpt: item.excerpt || "No excerpt available",
          image: resolveImageUrl(item.featured_image) || Mentalhealthawareness, // fallback to default image
          category: item.category || "General",
          date: formatDate(item.published_date),
          readTime: `${Math.max(1, Math.ceil((item.content?.length || 0) / 200))} min read`, // estimate reading time
          author: item.author || "Obeeoma Editorial Team",
          featured: item.featured || false,
          fullContent: item.content || "This is the full content of the blog post. In a real application, this would contain the complete article text with multiple paragraphs, detailed information, and comprehensive coverage of the topic.",
          views: Math.floor(Math.random() * 1000) + 50, // Random view count for demo
          confirmedReads: Math.floor(Math.random() * 100) + 10, // Random confirmed reads for demo
        }));

        console.log("Mapped blogs:", mapped);

        // Only update if we have data, otherwise keep the default blogs
        if (mapped.length > 0) {
          setBlogs(mapped);
          setFilteredBlogs(mapped);
        } else {
          console.log("No blogs from API, keeping default blogs");
          setFilteredBlogs(defaultBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Keep the default blogs if API fails
        setFilteredBlogs(defaultBlogs);
      }
    };

    fetchBlogs();
    setIsVisible(true);
  }, []); // Remove blogs from dependency array to prevent infinite loop

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

        {/* Receptionist Floating Chat */}
        <ReceptionistFloatingChat />

        {/* Floating WhatsApp Button */}
        <FloatingWhatsApp />
      </main>
    </div>
  );
}
