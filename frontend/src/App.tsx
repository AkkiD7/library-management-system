import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BooksPage from "./pages/BooksPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useEffect } from "react";
import { setAuthToken } from "./lib/apiClient";
import RegisterPage from "./pages/RegisterPage";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-full mx-auto w-full px-4 py-4">
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> \


      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <BooksPage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthProvider>
  );
}

export default App;
