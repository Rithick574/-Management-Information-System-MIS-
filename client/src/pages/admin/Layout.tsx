import { Outlet } from "react-router-dom";
import SideBarSuperAdmin from "../../components/sidebar/SideBarSuperAdmin";
import SideBarSuperAdminMobile from "../../components/sidebar/SidebarSuperAdminMobile";

export const AdminLayout = () => {
  return (
    <section className="flex min-h-screen">
      <SideBarSuperAdmin />
      <SideBarSuperAdminMobile />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </section>
  );
};
