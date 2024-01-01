import { PropTypes } from "prop-types";
import { useState } from "react";
import ImageComponent from "../ImageComponent";

const UserCard = ({
  data,
  handle_check_box,
  select_all,
  delete_users,
  update_select_all,
}) => {
  const [checked, update_checked] = useState(false);
  function toggle_check() {
    if (select_all) {
      update_select_all((prev) => !prev);
    }
    handle_check_box(data.user_id, !checked);
    update_checked((prev) => !prev);
  }
  return (
    <div className="flex items-center ">
      <div className="px-[0.5rem]">
        <input
          type="checkbox"
          checked={checked || select_all}
          onChange={() => toggle_check()}
          className="h-7 w-7 md:scale-[0.8]"
        />
      </div>
      <div
        style={{ transition: "scale 3s ease-in-out" }}
        className="flex my-[0.5rem] shadow-md hover:border-dashed hover:border-blue-500 border-[1.25px] hover:scale-[1.01] px-[1rem] items-center gap-x-[1rem] py-[0.5rem] bg-[#e1e1e1] w-[98%]  mx-auto rounded-lg"
      >
        <div className="h-[3.5rem] flex overflow-hidden justify-center items-center aspect-square rounded-full bg-green-500">
          <div className=" overflow-hidden flex justify-center items-center">
            <ImageComponent src={data?.avatar} alt={"user Image"} />
          </div>
        </div>
        <div className="flex-[2]">
          <div>
            <h5>
              <span className="text-blue-400">User ID </span> :-
              {data?.user_id || "user_id"}
            </h5>
            <h5>
              <span className="text-blue-400"> Name </span> :-
              {data?.name || "Name"}
            </h5>
          </div>
        </div>
        <div className="flex-[1] justify-end items-center flex">
          <div className="h-[3rem] cursor-pointer flex justify-center items-center aspect-square rounded-xl">
            <span
              onClick={() => delete_users(data.user_id, true)}
              className="material-symbols-outlined text-red-600"
            >
              delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  data: PropTypes.object,
  select_all: PropTypes.bool,
  handle_check_box: PropTypes.func,
  update_select_all: PropTypes.func,
  delete_users: PropTypes.func,
};

export default UserCard;
