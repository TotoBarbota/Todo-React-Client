import { useEffect, useState } from "react";

import {
  deleteTodoApi,
  retrieveAllTodosApi,
  retriveTodoApi,
  updateTodoApi,
} from "../api/todosAPI";
import { useAuth } from "../security/AuthContex";
import { useNavigate } from "react-router-dom";

export interface Todo {
  id: number;
  username: string;
  description: string;
  targetDate: String;
  done: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [message, setMessage] = useState<String | null>(null);
  const [messageClass, setMessageClass] = useState("");

  const authContext = useAuth();
  const navigate = useNavigate();

  function refreshTodos() {
    retrieveAllTodosApi(authContext.username)
      .then((response) => successfulRetrieveResponse(response))
      .catch((error) => failedRetrieveResponse(error))
      .finally(() => console.log("Refreshed"));
  }

  function successfulRetrieveResponse(response: any) {
    console.log(response.data);
    setTodos(response.data);
  }

  function failedRetrieveResponse(error: any) {
    console.error(error);
  }

  useEffect(
    () => refreshTodos(),
    [todos.length, todos.map((todo) => todo.done).join(",")]
  );

  function deleteTodo(id: number) {
    deleteTodoApi(authContext.username, id)
      .then((response) => {
        setMessage(`Deleted TODO ${id}`);
        setMessageClass("alert alert-success");
        refreshTodos();
      })
      .catch((error) => {
        console.error(error);
        setMessage("Failed to delete");
        setMessageClass("alert alert-danger");
      })
      .finally(() => console.log("Delete Cleanup"));
  }

  function updateTodo(id: number) {
    retriveTodoApi(authContext.username, id)
      .then((response) => {
        navigate("/todos/" + response.data.id);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => console.log("Update redirect cleanup"));
  }

  function closeMessage() {
    setMessage(null);
  }

  function markDoneTodo(id: number) {
    retriveTodoApi(authContext.username, id)
      .then((response) => {
        const updatedTodo = response.data;
        updatedTodo.done = true;
        updateTodoApi(authContext.username, updatedTodo)
          .then((response) => {
            setMessage(`Marked TODO ${response.data.id} as done`);
            setMessageClass("alert alert-success");
            refreshTodos();
          })
          .catch((error) => {
            console.error(error);
            setMessage("Failed to mark done");
            setMessageClass("alert alert-danger");
          })
          .finally(() => console.log("Mark Done Cleanup"));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div>
        {message === null ? null : (
          <div className={messageClass}>
            {message}
            <button
              style={{ float: "right" }}
              className="btn-close"
              onClick={() => closeMessage()}
            ></button>
          </div>
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Done?</th>
            <th>Update</th>
            <th>Mark Done</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>
                {todo.targetDate
                  ? todo.targetDate.toString()
                  : "I didnt find a date"}
              </td>
              <td>{todo.done ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    updateTodo(todo.id);
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    markDoneTodo(todo.id);
                  }}
                >
                  Done
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  &#10006;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/todos/newtodo")}
      >
        Add
      </button>
    </div>
  );
}
