import React, { useEffect, useState } from "react";
import { BlogTable } from "./BlogTable";
import { BlogForm } from "./BlogForm";
import { BlogPost } from "./BlogTable";
import { ConfirmModal } from "./../Reusedcomponents/ConfirmModal";

import { toast } from "react-toastify";

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

  // Defining an image type.
  type BackendBlog = {
    id: string;
    title: string;
    category: string;
    published_date: string;
    status: "published" | "draft";
    excerpt: string | null;
    featured_image: string | null;
    author: string | null;
    content: string;
    featured: boolean;
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/articles/")
      .then((res) => res.json())
      .then((data: BackendBlog[]) => {
        console.log("Raw API data:", data);
        const mapped: BlogPost[] = data.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category || "Uncategorized",
          date: item.published_date,
          status: item.status,
          excerpt: item.excerpt || "",
          imageUrl: item.featured_image || "",
          author: item.author || "Anonymous",
          content: item.content,
          featured: item.featured,
        }));
        console.log("Mapped data:", mapped);
        setBlogs(mapped);
      })
      .catch((err) => {
        console.error("Failed to load blogs", err);
      });
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Add new article
  function handleAdd() {
    setFormMode("add");
    setSelectedBlog(null);
    setShowForm(true);
  }

  // Edit existing article
  function handleEdit(blog: BlogPost) {
    setFormMode("edit");
    setSelectedBlog(blog);
    setShowForm(true);
  }

  // Delete article
  function handleDelete(id: string) {
    setDeleteConfirm(id); // opens the confirm modal
  }

  // Confirmation handler delete.
  async function confirmDelete() {
    if (!deleteConfirm) return;

    await fetch(`http://127.0.0.1:8000/api/v1/articles/${deleteConfirm}/`, {
      method: "DELETE",
    });

    setBlogs((prev) => prev.filter((b) => b.id !== deleteConfirm));
    setDeleteConfirm(null);
    toast.error("Article deleted!");
  }

  // Handle add & edit submit (CONNECTED TO BACKEND)
  async function handleSubmit(newBlog: BlogPost) {
    try {
      const formData = new FormData();

      // Append all fields to FormData with correct backend field names
      formData.append("title", newBlog.title);
      formData.append("category", newBlog.category);
      formData.append("status", newBlog.status);
      formData.append("excerpt", newBlog.excerpt);
      formData.append("author", newBlog.author);
      formData.append("content", newBlog.content);
      formData.append("featured", newBlog.featured.toString());

      // Handle image
      if (newBlog.imageUrl instanceof File) {
        formData.append("featured_image", newBlog.imageUrl);
      }

      // ADD MODE → CREATE BLOG
      if (formMode === "add") {
        const res = await fetch("http://127.0.0.1:8000/api/v1/articles/", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const savedBlogRaw = await res.json();

        // Map the response back to frontend format
        const savedBlog: BlogPost = {
          id: savedBlogRaw.id,
          title: savedBlogRaw.title,
          category: savedBlogRaw.category,
          date: savedBlogRaw.published_date,
          status: savedBlogRaw.status,
          excerpt: savedBlogRaw.excerpt || "",
          imageUrl: savedBlogRaw.featured_image || "",
          author: savedBlogRaw.author || "Anonymous",
          content: savedBlogRaw.content,
          featured: savedBlogRaw.featured,
        };

        // Update UI immediately
        setBlogs((prev) => [savedBlog, ...prev]);
        toast.success("Article added successfully!");
      }
      // EDIT MODE → UPDATE BLOG
      else {
        const res = await fetch(
          `http://127.0.0.1:8000/api/v1/articles/${newBlog.id}/`,
          {
            method: "PUT",
            body: formData,
          },
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const updatedBlogRaw = await res.json();

        // Map the response back to frontend format
        const updatedBlog: BlogPost = {
          id: updatedBlogRaw.id,
          title: updatedBlogRaw.title,
          category: updatedBlogRaw.category,
          date: updatedBlogRaw.published_date,
          status: updatedBlogRaw.status,
          excerpt: updatedBlogRaw.excerpt || "",
          imageUrl: updatedBlogRaw.featured_image || "",
          author: updatedBlogRaw.author || "Anonymous",
          content: updatedBlogRaw.content,
          featured: updatedBlogRaw.featured,
        };

        setBlogs((prev) =>
          prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
        );
        toast.info("Article updated successfully!");
      }

      // Close form after success
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save blog:", error);
      toast.error("Failed to save article. Please try again.");
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
