const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AdminUser {
  userId: number;
  fullName: string;
  role: string;
  photo: string | null;
  bio: string | null;
  roleTitle: string | null;
}

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return { success: false, error: error?.message || "Invalid email or password." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Could not reach the server." };
  }
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  try {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      credentials: "include",
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

export function needsProfileCompletion(user: AdminUser | null): boolean {
  if (!user) return false;
  return user.role === "TEAM_MEMBER" && (!user.bio || !user.photo || !user.roleTitle);
}

export async function completeProfile(data: {
  photo: string;
  bio: string;
  roleTitle: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/api/auth/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      return { success: false, error: error?.message || "Could not update profile." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Could not reach the server." };
  }
}