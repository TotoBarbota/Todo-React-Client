import { useAuth } from "../security/AuthContex";
import { useNavigate, useParams } from "react-router-dom";
import { retriveTodoApi, updateTodoApi } from "../api/todosAPI";
import { Todo } from "./TodoList";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function TodoUpdate() {
  const authContext = useAuth();
  const [newDescription, setNewDescription] = useState("");
  const [newTargetDate, setNewTargetDate] = useState("");
  const [todo, setTodo] = useState<Todo>({
    id: 0,
    username: authContext.username,
    description: "",
    targetDate: "",
    done: false,
  });
  const username = authContext.username;

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    retrieveTodo();
  }, [id]);

  function retrieveTodo() {
    retriveTodoApi(username, Number(id))
      .then((response) => {
        setNewDescription(response.data.description);
        if (response.data.targetDate > new Date().toISOString().split("T")[0]) {
          setNewTargetDate(response.data.targetDate);
        } else {
          setNewTargetDate(new Date().toISOString().split("T")[0]);
        }
        setTodo(response.data);
      })
      .catch((error) => failedRetrieveResponse(error))
      .finally(() => console.log("cleanup"));
  }

  function failedRetrieveResponse(error: any) {
    console.error("Failed to retrieve todo:", error);
  }

  function submit(values: any) {
    const updatedTodo = {
      id: todo.id,
      username: todo.username,
      description: values.description,
      targetDate: values.targetDate,
      done: false,
    };

    console.log(updatedTodo);
    updateTodoApi(username, updatedTodo)
      .then((response) => {
        console.log(response.data);
        navigate("/todos");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => console.log("cleanup"));
  }

  function validateTodo(values: any) {
    let errors: any = {};
    if (values.description.length < 5) {
      errors.description = "Description should be at least 5 characters long";
    }
    const date = new Date(values.targetDate);
    const today = new Date();
    if (date < today) {
      errors.targetDate = "Target Date should be in the future";
    }
    return errors;
  }

  return (
    <div>
      <h1>Update Todo</h1>
      <div>
        <Formik
          initialValues={{
            description: newDescription,
            targetDate: newTargetDate,
          }}
          onSubmit={submit}
          enableReinitialize={true}
          validate={validateTodo}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <Form>
              <ErrorMessage
                name="description"
                component="div"
                className="alert alert-warning"
              />
              <ErrorMessage
                name="targetDate"
                component="div"
                className="alert alert-warning"
              />
              <fieldset className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  className="form-control"
                />
              </fieldset>
              <fieldset className="form-group">
                <label htmlFor="targetDate">Target Date</label>
                <Field
                  type="date"
                  id="targetDate"
                  name="targetDate"
                  className="form-control"
                />
              </fieldset>
              <button type="submit">Update</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
