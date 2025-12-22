import React from "react";
import { Button } from "react-bootstrap";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * CategoryFilter component renders a list of category buttons.
 * Each button changes the active category when clicked.
 * The styling is handled purely via CSS classes.
 */
export function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="category-filter" style={{ fontFamily: "heading" }}>
      {/* Button for "All Articles" */}
      <Button
        variant="none" // Removes Bootstrap default background
        className={`category-btn ${activeCategory === "All" ? "active" : ""}`}
        onClick={() => onCategoryChange("All")}
      >
        All Articles
      </Button>

      {/* Render all dynamic category buttons */}
      {categories.map((category) => (
        <Button
          key={category}
          variant="none"
          className={`category-btn ${activeCategory === category ? "active" : ""}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
