import LoginPage from "../login/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import ErrorPage from "./ErrorPage";
import CounterWraper from "../counter/CounterWraper";
import TodoList from "./TodoList";
import Header from "./Header";
import Footer from "./Footer";
import LogoutPage from "../login/Logout";
import AuthProvider, { useAuth } from "../security/AuthContex";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoUpdate from "./TodoUpdate";
import CreateTodo from "./CreateTodo";

export default function TodoApp() {
  function AuthenticatedRoute({ children: children }: any) {
    const authContext = useAuth();
    if (authContext.isAuthenticated) {
      return children;
    }
    return <Navigate to="/" />;
  }

  return (
    <div className="todo-app">
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/welcome"
              element={
                <AuthenticatedRoute>
                  <WelcomePage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/counter"
              element={
                <AuthenticatedRoute>
                  <CounterWraper />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <TodoList />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos/newtodo"
              element={
                <AuthenticatedRoute>
                  <CreateTodo />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos/:id"
              element={
                <AuthenticatedRoute>
                  <TodoUpdate />
                </AuthenticatedRoute>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
