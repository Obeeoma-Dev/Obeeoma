import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  featured?: boolean;
  animationDelay?: number;
}
export function BlogCard({
  title,
  excerpt,
  image,
  category,
  date,
  readTime,
  author,
  featured = false,
  animationDelay = 0,
}: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card
      className={`blog-card ${featured ? "blog-card-featured" : ""}`}
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="blog-card-image-wrapper">
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          className="blog-card-image"
        />
        <div className="blog-card-overlay"></div>
        <span className="blog-card-category">{category}</span>
        {featured && (
          <span
            className="blog-card-featured-badge"
            style={{ fontFamily: "body" }}
          >
            Featured
          </span>
        )}
      </div>
      <Card.Body className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-card-meta-item" style={{ fontFamily: "body" }}>
            <Calendar size={14} />
            {date}
          </span>
          <span className="blog-card-meta-item" style={{ fontFamily: "body" }}>
            <Clock size={14} />
            {readTime}
          </span>
        </div>
        <Card.Title
          className="blog-card-title"
          style={{ fontFamily: "heading" }}
        >
          {title}
        </Card.Title>
        <Card.Text
          className="blog-card-excerpt"
          style={{ fontFamily: "heading" }}
        >
          {excerpt}
        </Card.Text>
        <div className="blog-card-footer">
          <div className="blog-card-author">
            <User size={16} />
            <span>{author}</span>
          </div>
          <a href="#" className="blog-card-link" style={{ fontFamily: "body" }}>
            Read More
            <ArrowRight
              size={16}
              className={`blog-card-arrow ${isHovered ? "hovered" : ""}`}
            />
          </a>
        </div>
      </Card.Body>
    </Card>
  );
}
