import { Link, Outlet } from "react-router-dom";

export const ClientLayout = () => {
    return (
      <div className="flex min-h-screen">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-gray-800 p-4">
          <div className="text-white mb-8">Client Panel</div>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/client/dashboard" 
                className="text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/client/users" 
                className="text-gray-300 hover:text-white"
              >
                Users
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