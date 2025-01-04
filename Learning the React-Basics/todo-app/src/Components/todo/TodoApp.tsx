import LoginPage from "../login/LoginPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import ErrorPage from "./ErrorPage";
import CounterWraper from "../counter/CounterWraper";
import TodoList from "./TodoList";
import Header from "./Header";
import Footer from "./Footer";
import LogoutPage from "../login/LogoutPage";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TodoApp() {
    return (
        <div className="todo-app">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/welcome/:username" element={<WelcomePage />} />
                    <Route path="/counter" element={<CounterWraper />} />
                    <Route path="/todos" element={<TodoList />} />

                    <Route path='*' element={<ErrorPage />} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}