import { apiClient } from "./apiClient";

export function basicAuthApi(token: string) {
  return apiClient.get("/basic-auth", { headers: { Authorization: token } });
}

export function jwtAuthApi(username: String, password: String) {
  return apiClient.post("/authenticate", { username, password });
}
