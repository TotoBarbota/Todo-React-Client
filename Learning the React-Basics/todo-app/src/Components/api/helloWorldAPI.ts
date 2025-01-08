import { apiClient } from "./apiClient";

export function retrieveHelloWorldBean() {
  return apiClient.get("/hello-world-bean");
}

export function retrieveHelloWorldBeanWithPathVariable(name: string) {
  return apiClient.get(`/hello-world/path-variable/${name}`);
}
