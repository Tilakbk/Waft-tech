const AUTH_KEY = "waft_admin_auth";

// Mock credentials for demo purposes only.
// This will be replaced by real JWT-based auth once the Spring Boot backend is live.
const MOCK_EMAIL = "admin@wafttech.io";
const MOCK_PASSWORD = "admin123";

export function login(email: string, password: string): boolean {
  if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_KEY, "true");
    }
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_KEY);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "true";
}