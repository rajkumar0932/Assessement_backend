import { Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Products from "./pages/Products.jsx";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("AccessToken");
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem("AccessToken");

  const logout = () => {
    localStorage.removeItem("AccessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-slate-100">
      <nav className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/products"
            className="flex items-center gap-2 text-lg font-bold text-indigo-600"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-600 text-white">
              P
            </span>
            Products App
          </Link>
          <div className="flex items-center gap-3 text-sm font-medium">
            {token ? (
              <button
                onClick={logout}
                className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
