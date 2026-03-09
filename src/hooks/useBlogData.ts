import { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '../components/admincomponents/Blogmanagement/BlogTable';

interface UseBlogDataReturn {
  blogs: BlogPost[];
  loading: boolean;
  error: string | null;
  refreshBlogs: () => void;
  addBlog: (blog: BlogPost) => void;
  updateBlog: (blog: BlogPost) => void;
  deleteBlog: (id: string) => void;
}

interface RawBlogData {
  id: string;
  title: string;
  category?: string;
  published_date?: string;
  status?: string;
  excerpt?: string;
  featured_image?: string;
  author?: string;
  content?: string;
  featured?: boolean;
  views?: number;
  confirmed_reads?: number;
}

/**
 * Custom hook to manage blog data across admin pages
 * Uses localStorage caching to avoid repeated API calls
 * Provides CRUD operations that update both state and cache
 */
export const useBlogData = (): UseBlogDataReturn => {
  // Initialize state from localStorage or empty array
  const getInitialBlogs = useCallback((): BlogPost[] => {
    try {
      const cached = localStorage.getItem('blogData');
      if (cached) {
        const parsedData = JSON.parse(cached);
        // Validate cache timestamp (cache for 5 minutes)
        const cacheTimestamp = localStorage.getItem('blogDataTimestamp');
        if (cacheTimestamp) {
          const now = Date.now();
          const cacheAge = now - parseInt(cacheTimestamp);
          // If cache is less than 5 minutes old, use it
          if (cacheAge < 5 * 60 * 1000) {
            return parsedData;
          }
        }
      }
    } catch (error) {
      console.error('Failed to parse cached blog data:', error);
    }
    return [];
  }, []);

  const [blogs, setBlogs] = useState<BlogPost[]>(getInitialBlogs());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to cache blog data
  const cacheBlogData = (data: BlogPost[]) => {
    try {
      localStorage.setItem('blogData', JSON.stringify(data));
      localStorage.setItem('blogDataTimestamp', Date.now().toString());
    } catch (error) {
      console.error('Failed to cache blog data:', error);
    }
  };

  // Function to clear cache
  const clearCache = () => {
    localStorage.removeItem('blogData');
    localStorage.removeItem('blogDataTimestamp');
  };

  // Fetch blogs from API
  const fetchBlogs = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first (unless force refresh)
      if (!forceRefresh) {
        const cached = getInitialBlogs();
        if (cached.length > 0) {
          setBlogs(cached);
          setLoading(false);
          return;
        }
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}articles/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as RawBlogData[];
      console.log("Raw API data:", data);

      // Transform backend data to frontend format
      const mapped: BlogPost[] = data.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category || "Uncategorized",
        date: item.published_date ?? "",
        status: (item.status === "published" ? "published" : "draft"),
        excerpt: item.excerpt || "",
        imageUrl: item.featured_image || "",
        author: item.author || "Anonymous",
        content: item.content || "",
        featured: item.featured ?? false,
        views: item.views || 0,
        confirmedReads: item.confirmed_reads || 0,
      }));

      console.log("Mapped data:", mapped);
      setBlogs(mapped);
      cacheBlogData(mapped);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError(err instanceof Error ? err.message : "Failed to load blogs");
      // Keep existing blogs if API fails
    } finally {
      setLoading(false);
    }
  }, [getInitialBlogs]);

  // Load blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, [refreshTrigger, fetchBlogs]);

  // Refresh blogs function
  const refreshBlogs = () => {
    clearCache();
    setRefreshTrigger(prev => prev + 1);
  };

  // Add new blog
  const addBlog = (newBlog: BlogPost) => {
    const updatedBlogs = [newBlog, ...blogs];
    setBlogs(updatedBlogs);
    cacheBlogData(updatedBlogs);
  };

  // Update existing blog
  const updateBlog = (updatedBlog: BlogPost) => {
    const updatedBlogs = blogs.map(blog => 
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(updatedBlogs);
    cacheBlogData(updatedBlogs);
  };

  // Delete blog
  const deleteBlog = (id: string) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    setBlogs(updatedBlogs);
    cacheBlogData(updatedBlogs);
  };

  return {
    blogs,
    loading,
    error,
    refreshBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
  };
};
