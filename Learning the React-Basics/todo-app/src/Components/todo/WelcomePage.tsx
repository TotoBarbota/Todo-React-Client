import { Link } from "react-router-dom";
import { useAuth } from "../security/AuthContex";
import { useState } from "react";
import { retrieveHelloWorldBeanWithPathVariable } from "../api/helloWorldAPI";
import axios from "axios";

export default function WelcomePage() {
  const [message, setMessage] = useState("");

  const authContext = useAuth();

  function callHelloWorldAPI() {
    // axios
    //   .get("http://localhost:8080/hello-world-bean")
    //   .then((response) => successfulResponse(response))
    //   .catch((error) => errorResponce(error))
    //   .finally(() => console.log("cleanup"));

    retrieveHelloWorldBeanWithPathVariable(authContext.username)
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponce(error))
      .finally(() => console.log("cleanup"));
  }

  function successfulResponse(response: any) {
    console.log(response.data.message);
    setMessage(response.data.message);
  }

  function errorResponce(error: any) {
    console.log(error);
  }

  return (
    <div className="welcome-page">
      <h2>WELCOME TO THE TODO APP {authContext.username}</h2>
      <div>
        <p>This is the welcome page. </p>
        <p>
          Here you can see your todos. - <Link to="/todos">Todos</Link>
        </p>
        <div>
          <button className="btn btn-success" onClick={callHelloWorldAPI}>
            Call Hello World
          </button>
        </div>
        <p className="fs-4">{message}</p>
      </div>
    </div>
  );
}
