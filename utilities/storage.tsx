export function getFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }
  return null;
}

export function setInStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(value));
}

export function clearItemInStorage(key: string): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(key);
}

export function clearItemsInStorage(keys: string[]): void {
  if (typeof window === "undefined") return;

  keys.forEach((key) => localStorage.clearItem(key));
}
