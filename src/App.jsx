import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminRoute from "./components/AdminRoute";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PostDetailPage from "./pages/PostDetailPage";
import AdminArticleManagementPage from "./pages/AdminArticleManagementPage";
import AdminCategoryManagementPage from "./pages/AdminCategoryManagementPage";
import AdminMemberManagementPage from "./pages/AdminMemberManagementPage";
import AdminNotificationPage from "./pages/AdminNotificationPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<PostDetailPage />} />
          <Route
            path="/admin/article-management"
            element={
              <AdminRoute>
                <AdminArticleManagementPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/category-management"
            element={
              <AdminRoute>
                <AdminCategoryManagementPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/member-management"
            element={
              <AdminRoute>
                <AdminMemberManagementPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/notification"
            element={
              <AdminRoute>
                <AdminNotificationPage />
              </AdminRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminRoute>
                <ProfilePage />
              </AdminRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute>
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reset-password"
            element={
              <AdminRoute>
                <ResetPasswordPage />
              </AdminRoute>
            }
          />
          <Route
            path="/login"
            element={
              <GuestRoute>
                <LoginPage />
              </GuestRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <GuestRoute>
                <SignUpPage />
              </GuestRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
