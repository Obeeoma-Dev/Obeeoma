import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Calendar, Clock, User } from "lucide-react";
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
  const [, setIsHovered] = useState(false);
  return (
    <div
      className={`blog-card ${featured ? "blog-card-featured" : ""}`}
      style={{
        animationDelay: `${animationDelay}ms`,
        height: "550px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        backgroundColor: "white"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fixed Image Section */}
      <div style={{
        height: "350px",
        position: "relative",
        flexShrink: 0
      }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
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

      {/* Content Section */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: "1rem"
      }}>
        {/* Meta Info */}
        {/* Meta Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            maxWidth: "320px", // controls how far apart they go
            marginBottom: "0.5rem",
          }}
        >
          <span className="blog-card-meta-item" style={{ fontFamily: "body", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Calendar size={14} />
            {date}
          </span>

          <span className="blog-card-meta-item" style={{ fontFamily: "body", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <Clock size={14} />
            {readTime}
          </span>
        </div>


        {/* Title */}
        <h3
          style={{
            fontFamily: "heading",
            fontSize: "1.1rem",
            fontWeight: "600",
            margin: "0 0 0.5rem 0",
            lineHeight: "1.3",
            flexShrink: 0
          }}
        >
          {title}
        </h3>

        {/* Scrollable Excerpt */}
        <div
          style={{
            fontFamily: "heading",
            flex: 1,
            overflowY: "auto",
            maxHeight: "120px",
            lineHeight: "1.4",
            fontSize: "0.9rem",
            color: "#666"
          }}
        >
          {excerpt}
        </div>

        {/* Fixed Footer */}
        <div style={{
          flexShrink: 0,
          marginTop: "0.5rem",
          paddingTop: "0.5rem",
          borderTop: "1px solid #f0f0f0"
        }}>
          <div className="blog-card-author">
            <User size={16} />
            <span>{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
