
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import Index from "./pages/Home/Index";
import Closet from "./pages/Closet/Closet";
import Social from "./pages/Social/Social";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import { useAuth } from "./auth/AuthContext";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Index />} />
        <Route path="/closet" element={
          <ProtectedRoute>
            <Closet />
          </ProtectedRoute>
        } />
        <Route path="/social" element={<Social />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
