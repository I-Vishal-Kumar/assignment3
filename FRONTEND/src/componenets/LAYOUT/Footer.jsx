import { ExitOutline, TrashBin, TrashBinOutline } from "react-ionicons";
import axios, { axiosPrivate } from "../../hooks/axios";
import { useUserContext } from "../../hooks/userContext";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../hooks/useAlert";
const Footer = () => {
  const { update_user_data } = useUserContext();
  let navigate = useNavigate();
  let { getAlert } = useAlert();
  async function logout() {
    getAlert("Loading..");
    await axiosPrivate.get("/logout");
    getAlert("Loged out");
    update_user_data({});
    navigate("/login");
  }
  async function deleteAccount() {
    getAlert("Loading...");
    await axiosPrivate.get("/deleteAccount");
    getAlert("Deleted");
    navigate("/login");
  }
  return (
    <footer className="block py-1 px-2 w-full z-40 bg-accentColor absolute bottom-0 border-2 border-solid border-l-indigo-700 md:hidden">
      <ul className=" h-[4rem] grid-cols-2 grid place-content-center text-center place-items-center items-center ">
        <div
          onClick={logout}
          className="p-[0.5rem] bg-white border-2 border-solid border-white shadow-md shadow-gray-700 rounded-md flex items-center justify-center"
        >
          <ExitOutline />
          <p className="px-[0.5rem] font-bold ">Logout..</p>
        </div>
        <div
          onClick={deleteAccount}
          className="p-[0.5rem] bg-white border-2 border-solid border-white shadow-md shadow-gray-700 rounded-md flex items-center justify-center"
        >
          <TrashBinOutline />
          <p className="px-[0.5rem] font-bold ">Delete Account</p>
        </div>
      </ul>
    </footer>
  );
};

export default Footer;
