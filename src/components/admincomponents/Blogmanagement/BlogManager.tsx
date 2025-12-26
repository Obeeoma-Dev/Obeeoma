import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/blogs/")
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => console.error("Failed to load blogs", err));
    }, []);


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
    async function confirmDelete() {
        if (!deleteConfirm) return;

        await fetch(`http://127.0.0.1:8000/api/blogs/${deleteConfirm}/`, {
            method: "DELETE",
        });

        setBlogs(prev => prev.filter(b => b.id !== deleteConfirm));
        setDeleteConfirm(null);
    }





    // Handle add & edit submit (CONNECTED TO BACKEND)
    async function handleSubmit(newBlog: BlogPost) {
        try {
            // ADD MODE → CREATE BLOG
            if (formMode === "add") {
                const res = await fetch("http://127.0.0.1:8000/api/blogs/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBlog),
                });

                const savedBlog: BlogPost = await res.json();

                // Update UI immediately
                setBlogs((prev) => [savedBlog, ...prev]);
            }
            // EDIT MODE → UPDATE BLOG
            else {
                const res = await fetch(`http://127.0.0.1:8000/api/blogs/${newBlog.id}/`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newBlog),
                });

                const updatedBlog: BlogPost = await res.json();

                setBlogs((prev) =>
                    prev.map((b) =>
                        b.id === updatedBlog.id ? updatedBlog : b
                    )
                );
            }

            // Close form after success
            setShowForm(false);
        } catch (error) {
            console.error("Failed to save blog:", error);
        }
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