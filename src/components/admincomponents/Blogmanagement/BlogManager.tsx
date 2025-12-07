import React, { useState } from "react";
import { BlogTable } from "./BlogTable";
import { BlogForm } from "./BlogForm"; // the Offcanvas form
import { BlogPost } from "./BlogTable"; // import the type
import { ConfirmModal } from "./../Reusedcomponents/ConfirmModal";

export function BlogManager() {

    const [blogs, setBlogs] = React.useState<BlogPost[]>([
        {
            id: "1",
            title: "The Future of AI in Healthcare",
            category: "Health",
            date: "2025-12-01",
            status: "published",
            excerpt: "Exploring how AI is transforming patient care and diagnostics.",
            imageUrl: "https://via.placeholder.com/150",
            author: "Dr. Jane Doe",
            content: "Full article content goes here...",
            featured: true,
        },
        {
            id: "2",
            title: "Top 10 Web Development Trends",
            category: "Tech",
            date: "2025-11-28",
            status: "draft",
            excerpt: "A look at the latest frameworks and tools shaping web dev.",
            imageUrl: "https://via.placeholder.com/150",
            author: "ORENA",
            content: "Full article content goes here...",
            featured: false,
        },
    ]);
    const [showForm, setShowForm] = useState(false);
    const [formMode, setFormMode] = useState<"add" | "edit">("add");
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);



    // Add new article
    function handleAdd() {
        setFormMode("add");
        setSelectedBlog(null);
        setShowForm(true); // opens the Offcanvas
    }

    // Edit existing article
    function handleEdit(blog: BlogPost) {
        setFormMode("edit");
        setSelectedBlog(blog);
        setShowForm(true);
    }

    // Delete article
    function handleDelete(id: string) {
        setDeleteConfirm(id); // open the confirm modal
    }

    // Confirmation handler delete.
    function confirmDelete() {
        if (!deleteConfirm) return;
        setBlogs((prev) => prev.filter((b) => b.id !== deleteConfirm));
        setDeleteConfirm(null); // close modal
    }






    function handleSubmit(newBlog: BlogPost) {
        if (formMode === "add") {
            setBlogs((prev) => [newBlog, ...prev]);
        } else {
            setBlogs((prev) =>
                prev.map((b) => (b.id === newBlog.id ? newBlog : b))
            );
        }


        setShowForm(false); // close after submit
    }

    return (
        <>
            <BlogTable
                blogs={blogs}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onAdd={handleAdd}
            />

            <BlogForm
                show={showForm}
                mode={formMode}
                initialData={selectedBlog}
                onClose={() => setShowForm(false)}
                onSubmit={handleSubmit}
            />

            <ConfirmModal
                show={!!deleteConfirm}
                title="Delete Article"
                message="Are you sure you want to delete this article? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={confirmDelete}
                onCancel={() => setDeleteConfirm(null)}
            />
        </>
    );
}