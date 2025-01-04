import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import { useAuth } from "../security/AuthContex";

export default function LoginPage() {
    const [username, setUsername] = useState("Toto")
    const [password, setPassword] = useState("")

    const [authenticationFailed, setAuthenticationFailed] = useState(false)

    const navigate = useNavigate()
    const authContext = useAuth()
    
    function checkSubmit() {
        if (authContext.login(username, password)) {
            setAuthenticationFailed(false)
            navigate(`/welcome/${username}`)
        } else {
            setAuthenticationFailed(true)
        }
    }


    return (
        <div className="login">
            <h1>Login Page</h1>
            <div className="login-form">
                {authenticationFailed && <div>Authentication Failed. Check you credencials again.</div>}
                <form>
                    <label>Username </label>
                    <input type="text" name="username" value={username} 
                        onChange={
                            (e) => {
                                setUsername(e.target.value)
                            }
                        } />
                </form>
                <form>
                    <label>Password </label>
                    <input type="password" name="password" value={password} 
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        } />
                </form>
                <button type="submit" onClick={checkSubmit} onSubmit={checkSubmit}>Login</button>
            </div>
        </div>
    );
}