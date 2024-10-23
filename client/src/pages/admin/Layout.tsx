import { Link, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-gray-800 p-4">
        <div className="text-white mb-8">Admin Panel</div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/admin/dashboard"
              className="text-gray-300 hover:text-white"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="text-gray-300 hover:text-white">
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/clients"
              className="text-gray-300 hover:text-white"
            >
              Clients
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
