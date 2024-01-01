import { ExitOutline } from "react-ionicons";
import axios, { axiosPrivate } from "../../hooks/axios";
import { useUserContext } from "../../hooks/userContext";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const { update_user_data } = useUserContext();
  let navigate = useNavigate();
  async function logout() {
    await axiosPrivate.get("/logout");
    update_user_data({});
    navigate("/login");
  }
  return (
    <footer className="block py-1 px-2 w-full z-40 bg-accentColor absolute bottom-0 border-2 border-solid border-l-indigo-700 md:hidden">
      <ul className=" h-[4rem] grid place-content-center text-center place-items-center items-center ">
        <div
          onClick={logout}
          className="p-[0.5rem] bg-white border-2 border-solid border-white shadow-md shadow-gray-700 rounded-md flex items-center justify-center"
        >
          <ExitOutline />
          <p className="px-[0.5rem] font-bold ">Logout..</p>
        </div>
      </ul>
    </footer>
  );
};

export default Footer;
