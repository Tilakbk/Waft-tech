const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
}

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}