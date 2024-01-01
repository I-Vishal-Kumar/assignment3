import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";
import Usercard from "./Usercard";
import { ExitOutline, TrashBin, TrashBinOutline } from "react-ionicons";
import AlertBox from "./AlertBox";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAlert } from "../../hooks/useAlert";
const Layout = () => {
  const navigate = useNavigate();
  const { alertState, getAlert } = useAlert();
  const axiosPrivate = useAxiosPrivate();
  const { update_user_data } = useUserContext();
  useEffect(() => {
    async function getUserData() {
      let res = await axiosPrivate.get("/user_data");
      res = res.data.data;
      update_user_data(res);
    }
    getUserData();
  }, []);

  async function logout() {
    await axiosPrivate.get("/logout");
    update_user_data({});
    navigate("/login");
  }
  async function deleteAccount() {
    getAlert("Loading");
    await axiosPrivate.get("/deleteAccount");
    navigate("/login");
  }
  return (
    <>
      <Header />
      <main className="grid grid-cols-8 h-fit  overflow-y-hidden ">
        <section className=" bg-[#d8d8de] relative flex col-start-1 col-end-9 h-full col-span-7 md:col-end-6 ">
          {/* side toggler for big screens */}
          <div className=" z-20 hidden md:block md:absolute md:visible hover:w-fit hover:text-black text-transparent h-full w-[70px] overflow-hidden py-2 pt-8 bg-[#d0d0d2] rounded-r-md">
            <ul>
              <li
                onClick={logout}
                className="flex pr-9 hover:shadow-md border-2 border-solid hover:border-gray-300 mb-2 items-center"
              >
                <div className="flex items-center">
                  <span className="grid place-items-center h-20 pl-[1rem] pr-[0.5rem]">
                    <ExitOutline
                      color={"#666af6"}
                      title={"home"}
                      height={"30px"}
                      width={"30px"}
                    />
                  </span>
                  <h3 className=" text-md font-normal">Logout</h3>
                </div>
              </li>
              <li
                onClick={deleteAccount}
                className="flex pr-9 hover:shadow-md border-2 border-solid hover:border-gray-300 mb-2 items-center"
              >
                <div className="flex items-center">
                  <span className="grid place-items-center h-20 pl-[1rem] pr-[0.5rem]">
                    <TrashBinOutline
                      color={"#666af6"}
                      title={"home"}
                      height={"30px"}
                      width={"30px"}
                    />
                  </span>
                  <h3 className=" text-md font-normal">Delete Account</h3>
                </div>
              </li>
            </ul>
          </div>

          {/* this will be our new outlet */}
          {/* main contents */}
          <Outlet />
          {alertState?.state && <AlertBox />}
        </section>
        <section className="p-10 px-14 bg-[#d8d8de] col-start-6 md:block hidden h-full col-end-9">
          <Usercard />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
