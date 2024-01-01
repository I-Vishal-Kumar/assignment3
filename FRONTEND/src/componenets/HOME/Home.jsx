import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";
import { useAlert } from "../../hooks/useAlert";
import UserCard from "../USERCARD/UserCard";
import ImageComponent from "../ImageComponent";

const HomePopup = () => {
  let navigate = useNavigate();
  let { userData, update_user_data } = useUserContext();
  let { getAlert, closeAlert } = useAlert();
  let [all_user_data, set_user_data] = useState([]);
  const [is_select_all, update_select_all] = useState(false);
  let [data_to_be_deleted, update_delete_data] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    async function getAllUsers() {
      getAlert("Loading...");
      try {
        let res = await axiosPrivate.get("/getAllUserData");
        res = res?.data;
        if (res?.user_data) {
          set_user_data(res?.user_data);
          closeAlert();
        } else {
          getAlert("Someting went wrong..");
        }
      } catch (error) {
        getAlert("Someting went wrong..");
      }
    }
    async function getUserData() {
      let res = await axiosPrivate.get("/user_data");
      res = res.data.data;
      update_user_data(res);
    }

    userData?.admin === undefined && getUserData();
    userData?.admin === true ? getAllUsers() : "";
  }, [userData?.admin, userData]);

  async function delete_users(users_id, specific_delete = false) {
    let data = [];
    getAlert("Deleting...");
    if (specific_delete) {
      data.push(users_id);
    } else {
      if (is_select_all) {
        all_user_data.forEach((item) => {
          data.push(item?.user_id);
        });
      } else {
        data = [...data_to_be_deleted];
      }
    }
    try {
      let res = await axiosPrivate.post("/delete_users", data);
      if (res?.data) {
        getAlert("Data deleted");
        update_user_data({});
        return;
      }
      getAlert(res?.data?.message || "something went wrong while deleting");
      return;
    } catch (error) {
      getAlert(error?.response?.data?.message || "something went wrong");
      return;
    }
  }

  function select_to_delete(user_id, checked) {
    if (checked) {
      update_delete_data((prev) => {
        return [...prev, user_id];
      });
    } else {
      update_delete_data((prev) => {
        return prev.filter((item) => item !== user_id);
      });
    }
  }

  return (
    <>
      <main className="md:ml-[70px] w-full h-[100vh] overflow-hidden flex flex-col ">
        {/* this user bio and avatar */}
        <section className="flex md:hidden px-[1rem] py-[0.5rem] bg-[#d8d8de] items-center justify-end">
          <div className="px-[1rem]">
            <div>
              <h3>{userData?.name || "Name"}</h3>
              <h5>{userData?.user_id || "User_id"}</h5>
              <Link to="../edit_details">
                <button
                  type="button"
                  className="border-[1.25px] mt-[0.5rem] bg-slate-600 rounded-sm shadow-md hover:bg-slate-500 text-white border-solid border-gray-400 px-[0.5rem] py-[0.25rem]"
                >
                  Edit details
                </button>
              </Link>
            </div>
          </div>
          <div className="h-[8rem] rounded-full overflow-hidden bg-green-500 aspect-square">
            <ImageComponent src={userData?.avatar} alt={"user Image"} />
          </div>
        </section>
        {/* for admin only */}
        <section className=" flex-1 overflow-y-auto bg-[#d8d8de] py-[2rem] pb-[10rem] px-[1rem]">
          <div className="flex-1 border-1 py-[0.7rem] flex items-bottom justify-between px-[0.5rem] border-solid border-black">
            <div className="capitalize flex items-center">
              <h4 className="m-0">Selected</h4>
              <h3 className="m-0 px-[1rem]">
                {is_select_all
                  ? all_user_data?.length
                  : data_to_be_deleted?.length}
              </h3>
            </div>
            <div>
              <div className="flex">
                <h4>select All</h4>
                <input
                  className="mx-[1rem] h-5 w-5 p-[1rem]"
                  type="checkbox"
                  onChange={() => update_select_all((prev) => !prev)}
                  checked={is_select_all}
                />
              </div>
              <div>
                <button
                  onClick={() => delete_users(all_user_data)}
                  className="w-full hover:scale-[1.1] shadow-sm shadow-gray-500 border-[1.25px] border-red-400 border-solid py-[0.5rem] bg-red-500 rounded-md text-white font-semibold mt-[0.5rem]"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          {all_user_data.map((item) => (
            <UserCard
              delete_users={delete_users}
              select_all={is_select_all}
              update_select_all={update_select_all}
              handle_check_box={select_to_delete}
              key={item._id}
              data={{ ...item }}
            />
          ))}
        </section>
      </main>
    </>
  );
};

export default HomePopup;
