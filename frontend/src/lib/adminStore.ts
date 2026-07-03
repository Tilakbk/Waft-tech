// Generic localStorage-backed CRUD store for admin screens.
// Seeds from the provided mock data on first load, then persists edits locally.
// This will be replaced by real API calls to Spring Boot once the backend is live.

export function loadCollection<T>(key: string, seedData: T[]): T[] {
  if (typeof window === "undefined") return seedData;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T[];
    window.localStorage.setItem(key, JSON.stringify(seedData));
    return seedData;
  } catch {
    return seedData;
  }
}

export function saveCollection<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore quota errors for this mock layer
  }
}