import Kiaro from "../../assets/logoipsum-245.svg";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { CgOrganisation } from "react-icons/cg";
import { ToolTipWrapper } from "../custom/ToolTipWrapper";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

const SideBarSuperAdmin = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-backgroundAccent p-5 hidden md:block text-center h-screen">
      <div className="flex flex-col items-center gap-2 pt-4">
        <img alt="logo" src={Kiaro} width={25} height={25} />
        <h1 className="font-bold text-sm">Kiaro</h1>
      </div>
      <div className="flex flex-col items-center gap-3 py-5">
        <Link to="/admin/dashboard" className="hover-text text-xl">
          <ToolTipWrapper title="Dashboard">
            <div
              className={`p-1 rounded-xl hover:bg-blue-600 ${
                location.pathname.includes("/admin/dashboard")
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              <AiOutlineDashboard className="m-1" />
            </div>
          </ToolTipWrapper>
        </Link>
        <Link to="/admin/clients" className="hover-text text-xl">
          <ToolTipWrapper title="Clients">
            <div
              className={`p-1 rounded-xl hover:bg-blue-600 ${
                location.pathname.includes("/admin/clients")
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              <IoIosPeople className="m-1" />
            </div>
          </ToolTipWrapper>
        </Link>

        <ToolTipWrapper title="Users">
          <Link to="/admin/users" className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-blue-600 ${
                location.pathname.includes("/admin/users")
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              <CgOrganisation className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>

        <ToolTipWrapper title="Settings">
          <Link to="/admin/settings" className="hover-text text-xl">
            <div
              className={`p-1 rounded-xl hover:bg-blue-600 ${
                location.pathname.includes("/admin/settings")
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
            >
              <FiSettings className="m-1" />
            </div>
          </Link>
        </ToolTipWrapper>
        <ToolTipWrapper title="Logout">
          <div className="p-1 rounded-xl hover:bg-blue-600 text-xl hover-text cursor-pointer">
            <BiLogOut className="m-1" onClick={logoutUser} />
          </div>
        </ToolTipWrapper>
      </div>
    </div>
  );
};

export default SideBarSuperAdmin;
