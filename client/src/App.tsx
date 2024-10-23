import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

// Auth
import Login from "./pages/auth/Login";

// Admin Pages
import { AdminLayout } from "./pages/admin/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsersList from "./pages/admin/UsersList";
import AdminClientsList from "./pages/admin/ClientsList";

// Client Pages
import { ClientLayout } from "./pages/client/Layout";
import ClientDashboard from "./pages/client/Dashboard";
import ClientUsersList from "./pages/client/UsersList";

// ClientUser Pages
import ClientUserLayout from "./pages/clientuser/Layout";
import ClientUserDashboard from "./pages/clientuser/Dashboard";

type ProtectedRouteProps = {
  element: React.ReactNode;
  allowedRoles: string[];
  children?: React.ReactNode;
};

const ProtectedRoute = ({
  element,
  allowedRoles,
  children,
}: ProtectedRouteProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "client":
        return <Navigate to="/client" replace />;
      case "clientuser":
        return <Navigate to="/clientuser/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return (
    <>
      {element} {children}
    </>
  );
};

const AdminRoutes = () => {
  return (
    <ProtectedRoute element={<AdminLayout />} allowedRoles={["admin"]}>
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsersList />} />
        <Route path="clients" element={<AdminClientsList />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ProtectedRoute>
  );
};

const ClientRoutes = () => {
  return (
    <ProtectedRoute element={<ClientLayout />} allowedRoles={["client"]}>
      <Routes>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="users" element={<ClientUsersList />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ProtectedRoute>
  );
};

const ClientUserRoutes = () => {
  return (
    <ProtectedRoute
      element={<ClientUserLayout />}
      allowedRoles={["clientuser"]}
    >
      <Routes>
        <Route path="dashboard" element={<ClientUserDashboard />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ProtectedRoute>
  );
};

function App() {
  const { user } = useSelector((state: RootState) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            user ? (
              (() => {
                switch (user.role) {
                  case "admin":
                    return <Navigate to="/admin/dashboard" replace />;
                  case "client":
                    return <Navigate to="/client/dashboard" replace />;
                  case "clientuser":
                    return <Navigate to="/clientuser/dashboard" replace />;
                  default:
                    return <Navigate to="/login" replace />;
                }
              })()
            ) : (
              <Login />
            )
          }
        />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* Client Routes */}
        <Route path="/client/*" element={<ClientRoutes />} />

        {/* ClientUser Routes */}
        <Route path="/clientuser/dashboard" element={<ClientUserRoutes />} />

        {/* Default Route */}
        <Route
          path="*"
          element={
            user ? (
              (() => {
                switch (user.role) {
                  case "admin":
                    return <Navigate to="/admin/dashboard" replace />;
                  case "client":
                    return <Navigate to="/client/dashboard" replace />;
                  case "clientuser":
                    return <Navigate to="/clientuser/dashboard" replace />;
                  default:
                    return <Navigate to="/login" replace />;
                }
              })()
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
