const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface TeamMember {
  id: number;
  name: string;
  photo: string | null;
  bio: string | null;
  roleTitle: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface TeamMemberUpdatePayload {
  name?: string;
  photo?: string;
  bio?: string;
  roleTitle?: string;
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

// ---- Public ----

export function getPublicTeamMembers(): Promise<ApiResult<TeamMember[]>> {
  return request<TeamMember[]>(`/api/team`);
}

// ---- Admin ----

export function getAllTeamMembersAdmin(): Promise<ApiResult<TeamMember[]>> {
  return request<TeamMember[]>(`/api/team/admin`);
}

export function getTeamMemberById(id: number): Promise<ApiResult<TeamMember>> {
  return request<TeamMember>(`/api/team/admin/${id}`);
}

export function updateTeamMember(id: number, payload: TeamMemberUpdatePayload): Promise<ApiResult<TeamMember>> {
  return request<TeamMember>(`/api/team/admin/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function toggleTeamMemberActive(id: number): Promise<ApiResult<TeamMember>> {
  return request<TeamMember>(`/api/team/admin/${id}/toggle-active`, {
    method: "PATCH",
  });
}

export function deleteTeamMember(id: number): Promise<ApiResult<void>> {
  return request<void>(`/api/team/admin/${id}`, {
    method: "DELETE",
  });
}

// ---- Registration (creates the WaftUser account — role fixed to TEAM_MEMBER) ----

export function registerTeamMember(data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResult<void>> {
  return request<void>(`/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({ ...data, role: "TEAM_MEMBER" }),
  });
}