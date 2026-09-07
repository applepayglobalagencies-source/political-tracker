export type User = { id: string; name: string; email: string; role: string; password: string };

export const USERS_KEY = "pt_users";
export const SESSION_KEY = "pt_session";

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}
export function saveUser(u: User) {
  const users = getUsers();
  users.push(u);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}