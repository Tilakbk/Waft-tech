const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ---- Types (mirror backend DTOs exactly) ----

export interface SolutionItem {
  heading: string;
  text: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  thumbnailUrl: string;
  heroImageUrl: string;
  date: string; // ISO date string, e.g. "2023-07-28"
  brief: string;
  problemStatement: string;
  solutions: SolutionItem[];
  results: SolutionItem[];
  finalThought: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdByName: string;
  imageUrls: string[];
}

export interface ProjectImage {
  id: number;
  image: string;
  sortOrder: number;
  createdAt: string;
  projectName: string;
}

// Payload shape for both create and update — update sends only changed fields
export interface ProjectPayload {
  title?: string;
  tags?: string[];
  thumbnailUrl?: string;
  heroImageUrl?: string;
  date?: string;
  brief?: string;
  problemStatement?: string;
  solutions?: SolutionItem[];
  results?: SolutionItem[];
  finalThought?: string;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page, 0-indexed
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}

export type ApiResult<T> = { success: true; data: T } | { success: false; error: string };

// ---- Internal helper ----

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

    // 204 No Content — nothing to parse
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

// ---- Public endpoints ----

export function getPublishedProjects(options?: {
  tag?: string;
  page?: number;
  size?: number;
  sort?: string;
}): Promise<ApiResult<Page<Project>>> {
  const query = buildQuery({
    tag: options?.tag,
    page: options?.page,
    size: options?.size,
    sort: options?.sort,
  });
  return request<Page<Project>>(`/api/projects${query}`);
}

export function getPublishedProjectBySlug(slug: string): Promise<ApiResult<Project>> {
  return request<Project>(`/api/projects/${encodeURIComponent(slug)}`);
}

// ---- Admin endpoints ----

export function getAllProjectsAdmin(options?: {
  page?: number;
  size?: number;
  sort?: string;
}): Promise<ApiResult<Page<Project>>> {
  const query = buildQuery({
    page: options?.page,
    size: options?.size,
    sort: options?.sort,
  });
  return request<Page<Project>>(`/api/projects/admin${query}`);
}

export function getProjectByIdAdmin(id: number): Promise<ApiResult<Project>> {
  return request<Project>(`/api/projects/admin/${id}`);
}

export function createProject(payload: ProjectPayload): Promise<ApiResult<Project>> {
  return request<Project>(`/api/project`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateProject(id: number, payload: ProjectPayload): Promise<ApiResult<Project>> {
  return request<Project>(`/api/projects/admin/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function togglePublishStatus(id: number): Promise<ApiResult<Project>> {
  return request<Project>(`/api/projects/${id}/publish`, {
    method: "PATCH",
  });
}

export function deleteProject(id: number): Promise<ApiResult<void>> {
  return request<void>(`/api/projects/admin/${id}`, {
    method: "DELETE",
  });
}

// ---- ProjectImage endpoints (admin only) ----

export function getProjectImages(projectId: number): Promise<ApiResult<ProjectImage[]>> {
  return request<ProjectImage[]>(`/api/projects/admin/${projectId}/images`);
}

export function addProjectImage(projectId: number, imageUrl: string): Promise<ApiResult<ProjectImage>> {
  return request<ProjectImage>(`/api/projects/admin/${projectId}/images`, {
    method: "POST",
    body: JSON.stringify({ image: imageUrl }),
  });
}

export function deleteProjectImage(projectId: number, imageId: number): Promise<ApiResult<void>> {
  return request<void>(`/api/projects/admin/${projectId}/images/${imageId}`, {
    method: "DELETE",
  });
}

export function reorderProjectImages(
  projectId: number,
  imageIds: number[]
): Promise<ApiResult<ProjectImage[]>> {
  return request<ProjectImage[]>(`/api/projects/admin/${projectId}/images/reorder`, {
    method: "PUT",
    body: JSON.stringify({ imageIds }),
  });
}

