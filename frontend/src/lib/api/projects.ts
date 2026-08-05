import { apiClient } from "@/lib/apiClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface SolutionItem {
  heading: string;
  text: string;
}

export interface ProjectResponse {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  thumbnailUrl: string;
  heroImageUrl: string;
  date: string;
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

export interface ProjectImageResponse {
  id: number;
  image: string;
  sortOrder: number;
  createdAt: string;
  projectName: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export interface ProjectFormData {
  title: string;
  tags: string[];
  thumbnailUrl: string;
  heroImageUrl: string;
  date: string;
  brief: string;
  problemStatement: string;
  solutions: SolutionItem[];
  results: SolutionItem[];
  finalThought: string;
}

// ---------- Public (no auth) ----------

export async function getPublishedProjects(tag?: string, page = 0, size = 8): Promise<PageResponse<ProjectResponse>> {
  const params = new URLSearchParams({ page: String(page), size: String(size) });
  if (tag) params.set("tag", tag);
  const res = await fetch(`${API_URL}/api/projects?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getProjectBySlug(slug: string): Promise<ProjectResponse> {
  const res = await fetch(`${API_URL}/api/projects/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Project not found");
  return res.json();
}

// ---------- Admin (auth required) ----------

export function getAdminProjects(page = 0, size = 12) {
  return apiClient<PageResponse<ProjectResponse>>(`/api/projects/admin?page=${page}&size=${size}`);
}

export function getProjectById(id: number) {
  return apiClient<ProjectResponse>(`/api/projects/admin/${id}`);
}

export function createProject(data: ProjectFormData) {
  return apiClient<ProjectResponse>("/api/project", { method: "POST", body: data });
}

export function updateProject(id: number, data: Partial<ProjectFormData>) {
  return apiClient<ProjectResponse>(`/api/projects/admin/${id}`, { method: "PUT", body: data });
}

export function deleteProject(id: number) {
  return apiClient<void>(`/api/projects/admin/${id}`, { method: "DELETE" });
}

export function toggleProjectPublish(id: number) {
  return apiClient<ProjectResponse>(`/api/projects/${id}/publish`, { method: "PATCH" });
}

export function getProjectImages(projectId: number) {
  return apiClient<ProjectImageResponse[]>(`/api/projects/admin/${projectId}/images`);
}

export function addProjectImage(projectId: number, imageUrl: string) {
  return apiClient<ProjectImageResponse>(`/api/projects/admin/${projectId}/images`, {
    method: "POST",
    body: { image: imageUrl },
  });
}

export function deleteProjectImage(projectId: number, imageId: number) {
  return apiClient<void>(`/api/projects/admin/${projectId}/images/${imageId}`, { method: "DELETE" });
}