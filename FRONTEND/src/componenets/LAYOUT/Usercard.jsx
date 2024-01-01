import { useUserContext } from "../../hooks/userContext";
import ImageComponent from "../ImageComponent";
const Usercard = () => {
  let { userData } = useUserContext();
  return (
    <div
      style={{
        background:
          "linear-gradient(55deg, rgb(211 209 253) 0%, rgb(180 183 188) 0%, rgb(216 241 252) 100%)",
        boxShadow: "inset 1px 3px 4px gray",
        color: "#5e5a5a",
      }}
      className=" px-4 py-2 pb-12 rounded-md min-h-[60vh] text-textColor flex flex-col "
    >
      <div className="w-full overflow-hidden p-2 grid place-content-center ">
        <div className="overflow-hidden h-[7rem] aspect-square bg-green-500 rounded-full">
          <ImageComponent src={userData.avatar} alt={"user Image"} />
        </div>
      </div>

      {/* user data */}
      <div className="mt-4">
        <ul>
          <li className="flex px-5 justify-between py-2 border-b-2 border-buttonColor ">
            <h3>Name</h3>
            <h3>{userData?.name || "not available"}</h3>
          </li>
          <li className="flex px-5 justify-between py-2 border-b-2 border-buttonColor ">
            <h3>{userData?.admin ? "Admin" : "User"}</h3>
            <h3>{userData?.user_id || "User_id"}</h3>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Usercard;
