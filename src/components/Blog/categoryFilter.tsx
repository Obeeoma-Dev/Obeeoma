import React from 'react'
import { Badge } from 'react-bootstrap'
interface CategoryFilterProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
}
export function CategoryFilter({
    categories,
    activeCategory,
    onCategoryChange,
}: CategoryFilterProps) {
    return (
        <div className="category-filter" style={{ fontFamily: "heading" }}>
            <Badge
                bg="none"
                className={`category-badge ${activeCategory === 'All' ? 'active' : ''}`}
                onClick={() => onCategoryChange('All')}
            >
                All Articles
            </Badge>
            {categories.map((category) => (
                <Badge
                    key={category}
                    bg="none"
                    className={`category-badge ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => onCategoryChange(category)}
                >
                    {category}
                </Badge>
            ))}
        </div>
    )
}