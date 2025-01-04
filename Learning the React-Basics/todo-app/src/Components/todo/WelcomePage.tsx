import { Link, useParams } from "react-router-dom";

export default function WelcomePage() {

    const {username} = useParams();

    return (
        <div className="welcome-page">
            <h2>WELCOME TO THE TODO APP {username}</h2>
            <div>
                <p>This is the welcome page.</p>
                <p>Here you can see your todos. - <Link to="/todos">Todos</Link></p>
            </div>
        </div>
    );
}