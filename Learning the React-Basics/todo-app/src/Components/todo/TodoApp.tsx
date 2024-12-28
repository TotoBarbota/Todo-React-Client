import LoginPage from "../login/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import ErrorPage from "./ErrorPage";
import CounterWraper from "../counter/CounterWraper";

export default function TodoApp() {
    return (
        <div className="todo-app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/welcome" element={<WelcomePage />} />
                    <Route path="/counter" element={<CounterWraper />} />
                    <Route path='*' element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}