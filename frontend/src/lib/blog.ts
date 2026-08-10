const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  coverImageUrl: string;
  excerpt: string;
  content: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  authorName: string;
}

export interface BlogPostPayload {
  title?: string;
  category?: string;
  coverImageUrl?: string;
  excerpt?: string;
  content?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export type ApiResult<T> = { success: true; data: T } | { success: false; error: string };

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      credentials: "include",
      headers: init?.body ? { "Content-Type": "application/json", ...init?.headers } : init?.headers,
      ...init,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return { success: false, error: error?.message || `Request failed (${response.status})` };
    }

    if (response.status === 204) {
      return { success: true, data: undefined as T };
    }

    const data = await response.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Could not reach the server." };
  }
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

// ---- Public ----

export function getPublishedBlogPosts(options?: {
  category?: string;
  page?: number;
  size?: number;
  sort?: string;
}): Promise<ApiResult<Page<BlogPost>>> {
  const query = buildQuery({
    category: options?.category,
    page: options?.page,
    size: options?.size,
    sort: options?.sort,
  });
  return request<Page<BlogPost>>(`/api/blog-posts${query}`);
}

export function getPublishedBlogPostBySlug(slug: string): Promise<ApiResult<BlogPost>> {
  return request<BlogPost>(`/api/blog-posts/${encodeURIComponent(slug)}`);
}

// ---- Admin (role-aware server-side: TEAM_MEMBER sees only their own posts) ----

export function getAllBlogPostsAdmin(options?: {
  page?: number;
  size?: number;
  sort?: string;
}): Promise<ApiResult<Page<BlogPost>>> {
  const query = buildQuery({
    page: options?.page,
    size: options?.size,
    sort: options?.sort,
  });
  return request<Page<BlogPost>>(`/api/blog-posts/admin${query}`);
}

export function getBlogPostById(id: number): Promise<ApiResult<BlogPost>> {
  return request<BlogPost>(`/api/blog-posts/admin/${id}`);
}

export function createBlogPost(payload: BlogPostPayload): Promise<ApiResult<BlogPost>> {
  return request<BlogPost>(`/api/blog-posts`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateBlogPost(id: number, payload: BlogPostPayload): Promise<ApiResult<BlogPost>> {
  return request<BlogPost>(`/api/blog-posts/admin/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function togglePublishStatus(id: number): Promise<ApiResult<BlogPost>> {
  return request<BlogPost>(`/api/blog-posts/${id}/publish`, {
    method: "PATCH",
  });
}

export function deleteBlogPost(id: number): Promise<ApiResult<void>> {
  return request<void>(`/api/blog-posts/admin/${id}`, {
    method: "DELETE",
  });
}