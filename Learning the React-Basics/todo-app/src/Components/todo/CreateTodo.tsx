import { useAuth } from "../security/AuthContex";
import { useNavigate, useParams } from "react-router-dom";
import { createTodoApi } from "../api/todosAPI";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function CreateTodo() {
  const authContext = useAuth();
  const [newDescription, setNewDescription] = useState("Description");
  const [newTargetDate, setNewTargetDate] = useState(
    new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const username = authContext.username;

  const navigate = useNavigate();

  function submit(values: any) {
    createTodoApi(username, values.description, values.targetDate)
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
      <h1>Create new Todo</h1>
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
              <button type="submit">Create</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
