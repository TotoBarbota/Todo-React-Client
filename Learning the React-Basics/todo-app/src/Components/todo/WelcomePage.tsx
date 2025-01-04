import { Link, useParams } from "react-router-dom";
import { useAuth } from "../security/AuthContex";
import axios from "axios";
import { useState } from "react";

export default function WelcomePage() {

    const {username} = useParams();
    const [message, setMessage] = useState('')

    console.log(username);

    const authContext = useAuth()
    
    function callHelloWorldAPI() {
        axios.get('http://localhost:8080/hello-world-bean')
            .then(response => successfulResponse(response))
            .catch(error => errorResponce(error))
            .finally( () => console.log('cleanup'))
    }
    
    function successfulResponse(response: any) {
        setMessage(response.data.message)
    }

    function errorResponce(error: any) {
        console.log(error)
    }


    return (
        <div className="welcome-page">
            <h2>WELCOME TO THE TODO APP {username}</h2>
            <div>
                <p>This is the welcome page. </p>
                <p>Here you can see your todos. - <Link to="/todos">Todos</Link></p>
                <div>
                    <button className="btn btn-success" onClick={callHelloWorldAPI}>Call Hello World</button>
                </div>
                <p className ="fs-4">{message}</p>
            </div>
        </div>
    );
}