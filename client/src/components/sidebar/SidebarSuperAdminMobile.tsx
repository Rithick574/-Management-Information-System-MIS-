import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { ToolTipWrapper } from "../custom/ToolTipWrapper";
import { CgOrganisation } from "react-icons/cg";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "../ui/sheet";
import { AppDispatch } from "../../redux/store";

const SideBarSuperAdminMobile = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="md:hidden text-2xl w-full bg-backgroundAccent py-2 flex justify-end px-5">
          <BiMenu />
        </div>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-3 py-5">
          <SheetClose asChild>
            <Link to="/admin/dashboard" className="hover-text text-xl">
              <ToolTipWrapper title="Dashboard">
                <div
                  className={`p-1 rounded-xl hover:bg-blue-600 flex items-center gap-1 ${
                    location.pathname === "/admin/dashboard"
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  <AiOutlineDashboard className="m-1" />
                  <span>Dashboard</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/admin/clients" className="hover-text text-xl">
              <ToolTipWrapper title="Clients">
                <div
                  className={`p-1 rounded-xl hover:bg-blue-600 flex items-center gap-1 ${
                    location.pathname.includes("/clients")
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  <CgOrganisation className="m-1" />
                  <span>Clients</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link to="/admin/users" className="hover-text text-xl">
              <ToolTipWrapper title="Users">
                <div
                  className={`p-1 rounded-xl hover:bg-blue-600 flex items-center gap-1 ${
                    location.pathname.includes("/admin/users")
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  <IoIosPeople className="m-1" />
                  <span>Users</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>


          <SheetClose asChild>
            <Link to="/admin/settings" className="hover-text text-xl">
              <ToolTipWrapper title="Settings">
                <div
                  className={`p-1 rounded-xl hover:bg-blue-600 flex items-center gap-1 ${
                    location.pathname.includes("/admin/settings")
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  <FiSettings className="m-1" />
                  <span>Settings</span>
                </div>
              </ToolTipWrapper>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <div
              className="p-1 rounded-xl hover:bg-background flex items-center gap-1 text-xl hover-text"
              onClick={handleLogout}
            >
              <BiLogOut className="m-1" />
              <span>Logout</span>
            </div>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarSuperAdminMobile;
