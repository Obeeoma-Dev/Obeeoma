import React, { useState } from "react";
import { BlogTable } from "./BlogTable";
import { BlogForm } from "./BlogForm";
import { BlogPost } from "./BlogTable";
import { ConfirmModal } from "./../Reusedcomponents/ConfirmModal";
import { useBlogData } from "../../../hooks/useBlogData";

import { toast } from "react-toastify";

export function BlogManager() {
  // Use the enhanced blog data hook with caching
  const {
    blogs,
    loading,
    error,
    refreshBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
  } = useBlogData();

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

    try {
      await fetch(
        `${import.meta.env.VITE_API_BASE_URL}articles/${deleteConfirm}/`,
        {
          method: "DELETE",
        },
      );

      // Use the hook's delete function to update state and cache
      deleteBlog(deleteConfirm);
      setDeleteConfirm(null);
      toast.error("Article deleted!");
    } catch (error) {
      console.error("Failed to delete article:", error);
      toast.error("Failed to delete article. Please try again.");
    }
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
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}articles/`,
          {
            method: "POST",
            body: formData,
          },
        );

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
          views: savedBlogRaw.views || 0,
          confirmedReads: savedBlogRaw.confirmed_reads || 0,
        };

        // Use the hook's add function to update state and cache
        addBlog(savedBlog);
        toast.success("Article added successfully!");
      }
      // EDIT MODE → UPDATE BLOG
      else {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}articles/${newBlog.id}/`,
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
          views: updatedBlogRaw.views || 0,
          confirmedReads: updatedBlogRaw.confirmed_reads || 0,
        };

        // Use the hook's update function to update state and cache
        updateBlog(updatedBlog);
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
        loading={loading}
        error={error}
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
