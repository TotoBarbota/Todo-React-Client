import { Todo } from "../todo/TodoList";
import { apiClient } from "./apiClient";

export function retrieveAllTodosApi(username: string) {
  return apiClient.get(`/users/${username}/todos`);
}

export function deleteTodoApi(username: string, todoId: number) {
  return apiClient.delete(`/users/${username}/todos/${todoId}`);
}

export function retriveTodoApi(username: string, todoId: number) {
  return apiClient.get(`/users/${username}/todos/${todoId}`);
}

export function createTodoApi(
  username: string,
  description: string,
  targetDate: string
) {
  return apiClient.post(`/users/${username}/todos/`, {
    description,
    targetDate,
  });
}

export function updateTodoApi(username: String, todo: Todo) {
  return apiClient.put(`/users/${username}/todos/${todo.id}`, todo);
}
