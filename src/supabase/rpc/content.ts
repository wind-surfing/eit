import { createBrowserClient } from "@/supabase/client";

const supabase = createBrowserClient();

export interface Blog {
  id: string;
  title: string;
  description: string;
  slug: string;
  content: string;
  content_type: "html" | "blocknote";
  is_published: boolean;
  created_at: string;
  updated_at: string;
  published_at?: string;
  featured_image?: string;
  tags: string[];
  author?: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
  };
}

export interface CreateBlogData {
  title: string;
  description: string;
  slug: string;
  content: string;
  content_type?: "html" | "blocknote";
  featured_image?: string;
  tags?: string[];
}

export interface UpdateBlogData {
  title?: string;
  description?: string;
  slug?: string;
  content?: string;
  content_type?: "html" | "blocknote";
  featured_image?: string;
  tags?: string[];
}

export interface BlogsResponse {
  blogs: Blog[];
  total_count: number;
  limit: number;
  offset: number;
}

export async function createBlog(blogData: CreateBlogData, userId: string) {
  try {
    const { data, error } = await supabase.rpc("create_blog", {
      p_title: blogData.title,
      p_description: blogData.description,
      p_slug: blogData.slug,
      p_content: blogData.content,
      p_content_type: blogData.content_type || "html",
      p_created_by: userId,
      p_featured_image: blogData.featured_image || null,
      p_tags: blogData.tags || [],
    });

    if (error) {
      console.error("Error creating blog:", error);
      return { success: false, error: error.message };
    }

    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}

export async function getBlogBySlug(
  slug: string
): Promise<{ success: boolean; blog?: Blog; error?: string }> {
  try {
    const { data, error } = await supabase.rpc("get_blog_by_slug", {
      p_slug: slug,
    });

    if (error) {
      console.error("Error fetching blog:", error);
      return { success: false, error: error.message };
    }

    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { success: false, error: "Failed to fetch blog" };
  }
}

export async function getBlogs(
  limit: number = 10,
  offset: number = 0,
  publishedOnly: boolean = true
): Promise<{ success: boolean; data?: BlogsResponse; error?: string }> {
  try {
    const { data, error } = await supabase.rpc("get_blogs", {
      p_limit: limit,
      p_offset: offset,
      p_published_only: publishedOnly,
    });

    if (error) {
      console.error("Error fetching blogs:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { success: false, error: "Failed to fetch blogs" };
  }
}

export async function getUserBlogs(
  userId: string,
  includeDrafts: boolean = true
): Promise<{ success: boolean; blogs?: Blog[]; error?: string }> {
  try {
    const { data, error } = await supabase.rpc("get_user_blogs", {
      p_user_id: userId,
      p_include_drafts: includeDrafts,
    });

    if (error) {
      console.error("Error fetching user blogs:", error);
      return { success: false, error: error.message };
    }

    return { success: true, blogs: data.blogs };
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return { success: false, error: "Failed to fetch user blogs" };
  }
}

export async function updateBlog(blogId: string, updateData: UpdateBlogData) {
  try {
    const { data, error } = await supabase.rpc("update_blog", {
      p_blog_id: blogId,
      p_title: updateData.title || null,
      p_description: updateData.description || null,
      p_slug: updateData.slug || null,
      p_content: updateData.content || null,
      p_content_type: updateData.content_type || null,
      p_featured_image: updateData.featured_image || null,
      p_tags: updateData.tags || null,
    });

    if (error) {
      console.error("Error updating blog:", error);
      return { success: false, error: error.message };
    }

    return data;
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: "Failed to update blog" };
  }
}

export async function publishBlog(blogId: string, isPublished: boolean = true) {
  try {
    const { data, error } = await supabase.rpc("publish_blog", {
      p_blog_id: blogId,
      p_is_published: isPublished,
    });

    if (error) {
      console.error("Error publishing blog:", error);
      return { success: false, error: error.message };
    }

    return data;
  } catch (error) {
    console.error("Error publishing blog:", error);
    return { success: false, error: "Failed to publish blog" };
  }
}

export async function deleteBlog(blogId: string) {
  try {
    const { data, error } = await supabase.rpc("delete_blog", {
      p_blog_id: blogId,
    });

    if (error) {
      console.error("Error deleting blog:", error);
      return { success: false, error: error.message };
    }

    return data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
}
