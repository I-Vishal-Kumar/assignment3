import { useState } from "react";
import { useAlert } from "../../hooks/useAlert";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
const EditDetails = () => {
  let axiosPrivate = useAxiosPrivate();
  let navigate = useNavigate();
  let { getAlert } = useAlert();
  let [name, updateName] = useState("");
  let [img, updateImage] = useState("");

  async function changeUserName() {
    getAlert("Loading..");
    let res = await axiosPrivate.post("/editName", { name });
    if (res && res?.data?.status === "ok") {
      getAlert("Edited name");
      navigate("/home");
    } else {
      getAlert("Something went wrong");
    }
  }
  async function changeProfilePic() {
    getAlert("Loading..");
    let formData = new FormData();
    formData.append("avatar", img);
    // return;
    let res = await axiosPrivate.post("/editImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res && res?.data?.status === "ok") {
      getAlert("Edited name");
      navigate("/home");
    } else {
      getAlert("Something went wrong");
    }
  }

  async function updateDetails() {
    if (!name && img) {
      changeProfilePic();
    } else if (name && !img) {
      changeUserName();
    } else if (name && img) {
      changeProfilePic();
      changeUserName();
    } else {
      getAlert("Enter any details first");
    }
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="flex flex-col border-2 border-solid border-[#bbb5b5] rounded-md shadow-lg min-h-[50vh] py-[3rem] px-[1rem]">
        <label htmlFor="" className="font-semibold py-[0.25rem]">
          Name
        </label>
        <input
          type="text"
          name=""
          onChange={(e) => updateName(e.target.value)}
          className="py-[0.5rem] outline-none px-[0.25rem] rounded-md border-[1.1px] border-solid border-gray-700"
          placeholder="Enter new name"
          id=""
          value={name}
        />
        <h4 className="text-center py-[0.5rem]">OR</h4>
        <label htmlFor="" className="font-semibold py-[0.25rem]">
          Choose Profile
        </label>
        <input
          type="file"
          onChange={(e) => updateImage(e.target.files[0])}
          name=""
          id=""
        />
        <button
          onClick={updateDetails}
          className="border-2 border-solid border-gray-500 bg-slate-600 text-white py-[0.25rem] mt-[2rem]"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditDetails;
