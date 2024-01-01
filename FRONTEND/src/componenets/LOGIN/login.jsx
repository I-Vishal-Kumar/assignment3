import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../hooks/axios";
import AuthContext from "../../hooks/AuthContext";
import AlertBox from "../LAYOUT/AlertBox";
import LOGO from "../HOME/HomeAssets/LOGO.png";
import { useAlert } from "../../hooks/useAlert";

const Login = () => {
  const navigate = useNavigate();
  const [image, update_image] = useState(null);
  const { alertState, getAlert } = useAlert();
  const { setAuth } = useContext(AuthContext);
  const [isPhone, update_user_id] = useState(true);
  const [isLogin, updateLogin] = useState(true);
  const [l_details, update_l_details] = useState({
    user_id: "",
    pass: "",
  });
  const [r_details, update_r_details] = useState({
    phoneNumber: "",
    email: "",
    pass: "",
    name: "",
    make_admin: false,
    confPass: "",
  });

  function update_register_details(e) {
    update_r_details((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }

  function update_login_details(e) {
    update_l_details((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  }

  function handleConfPass(e) {
    if (e.target.value !== r_details.pass) {
      e.target.style.border = "1.5px solid red";
    } else {
      e.target.style.border = "1px solid black";
    }
    update_r_details((prev) => {
      return { ...prev, confPass: e.target.value };
    });
  }

  async function LOGIN(e) {
    e.preventDefault();
    try {
      let data = {
        user_id: l_details.user_id.trim(),
        pass: l_details.pass.trim(),
      };
      const response = await axios.post(`/login`, data, {
        withCredentials: true,
      });
      setAuth({ accessToken: response.data.access_token });
      navigate("/home");
    } catch (error) {
      getAlert(error?.response?.data?.message || "something went wrong");
    }
  }
  async function SIGNUP(e) {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append form fields to FormData
      formData.append("phoneNumber", r_details.phoneNumber.trim());
      formData.append("email", r_details.email.trim());
      formData.append("pass", r_details.pass.trim());
      formData.append("name", r_details.name.trim());
      formData.append("make_admin", r_details.make_admin);
      formData.append("confPass", r_details.confPass.trim());

      // Append image to FormData
      formData.append("avatar", image);
      console.log(r_details.make_admin);
      const response = await axios.post(`/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getAlert(response?.data?.message || "something went wrong");
      setAuth({ accessToken: response.data.access_token });
      navigate("/home");
    } catch (error) {
      getAlert(error?.response?.data?.message || "something went wrong");
    }
  }

  let [l_pass_visibility, update_l_pass_visib] = useState(false);
  let [r_pass_visibility, update_r_pass_visib] = useState(false);

  return (
    <>
      <div className=" h-[100vh] justify-center items-center w-[100vw] bg-backgroundColor flex">
        <div className="flex h-[95vh] relative overflow-hidden w-[95vw] rounded-[1.4rem]">
          <div className=" md:flex hidden justify-center items-center bg-forgroundColor h-full w-[60%] rounded-bl-[1rem] rounded-tl-[1rem]  ">
            <div className="h-[80%] w-[80%] mt-[10rem] flex flex-col items-center">
              <div
                style={{
                  background: `url(${LOGO}) center no-repeat`,
                  backgroundSize: "contain",
                }}
                className="h-[30%] z-10 aspect-square bg-indigo-400  rounded-full"
              ></div>
              <h2 className="text-blue-800 mt-4">CHELSEA FOOTBALL</h2>
              <span className="mt-[5rem] flex">
                HELLO THERE THE NAME IS VISHAL AN I AM HERE
                <h3 className="pl-1 text-blue-800"> JOIN US</h3>
              </span>
            </div>
          </div>
          <div className="md:w-[40%] w-full h-full bg-forgroundColor rounded-full flex justify-center items-center">
            {/* login section */}
            {isLogin && (
              <section
                className="h-[100%]  md:rounded-tl-none
           overflow-hidden md:rounded-bl-none rounded-[1rem]  p-5 py-16 w-[100%] bg-forgroundColor flex flex-col items-center "
              >
                <div
                  style={{
                    background: `url(${LOGO}) center no-repeat`,
                    backgroundSize: "contain",
                  }}
                  className="h-[25%] z-10 aspect-square bg-indigo-400  rounded-full"
                ></div>
                <form
                  onSubmit={LOGIN}
                  className=" [&>*]:flex z-10 [&>*]:py-4 w-full p-4"
                >
                  <div className="flex-col">
                    <label
                      htmlFor="l_phoneNumber"
                      className="font-bold capitalize text-xl py-1"
                    >
                      user ID
                    </label>
                    <input
                      autoFocus
                      tabIndex={1}
                      required={true}
                      value={l_details.phoneNumber}
                      onChange={update_login_details}
                      placeholder="Enter user ID"
                      className="border-[1px] invalid:border-[1.5px] invalid:border-red-500 rounded-md py-2 pl-4 text-xl border-solid font-bold
                outline-none border-black bg-transparent"
                      type="text"
                      id="user_id"
                    />
                  </div>
                  <div className="relative flex-col">
                    <label
                      htmlFor="l_password"
                      className="font-bold text-xl py-1"
                    >
                      Password
                    </label>
                    <input
                      tabIndex={2}
                      required={true}
                      placeholder="password"
                      className="border-[1px] rounded-md py-2 pl-4 text-xl border-thin font-bold
                outline-none border-black bg-transparent "
                      autoComplete="false"
                      type={l_pass_visibility ? "text" : "password"}
                      id="pass"
                      onChange={update_login_details}
                      value={l_details.pass}
                    />
                    <span
                      onClick={() => update_l_pass_visib((prev) => !prev)}
                      className="absolute bottom-[20%] cursor-pointer right-[0.5rem] material-symbols-outlined"
                    >
                      {l_pass_visibility ? "visibility" : "visibility_off"}
                    </span>
                  </div>
                  <div className="flex-col w-full items-center mt-4">
                    <button
                      type="submit"
                      tabIndex={3}
                      value={"LOGIN"}
                      className="w-[40%] bg-buttonColor rounded-md py-4 text-center font-bold text-xl text-white"
                    >
                      LOGIN
                    </button>
                  </div>
                  <div className="flex-row text-xl w-full font-bold">
                    <span>Create an account</span>
                    <span
                      onClick={() => {
                        updateLogin((prev) => !prev);
                      }}
                      className="px-1 text-red-500 cursor-pointer"
                    >
                      here
                    </span>
                  </div>
                </form>
              </section>
            )}
            {/* signup section */}
            {isLogin || (
              <section
                className="h-[100%] md:rounded-tl-none
           overflow-y-auto pb-10 md:rounded-bl-none rounded-[1rem]  p-5 py-16 w-[100%] bg-forgroundColor flex flex-col items-center "
              >
                <div
                  style={{
                    background: `url(${LOGO}) center no-repeat`,
                    backgroundSize: "contain",
                  }}
                  className="h-[25%] z-10 aspect-square bg-indigo-400  rounded-full"
                ></div>
                <form
                  onSubmit={SIGNUP}
                  className=" [&>*]:flex z-10 [&>*]:py-3 w-full p-4"
                >
                  <div className="flex-col">
                    <div
                      onClick={() => update_user_id((prev) => !prev)}
                      className="py-[0.5rem] bg-slate-400 cursor-pointer mb-[0.5rem] flex justify-between items-center relative w-[11rem] h-[3rem] md:h-[2.5rem] rounded-full px-[1rem] border-2 border-solid border-gray-300"
                    >
                      <label
                        htmlFor="l_phoneNumber"
                        className={
                          (isPhone ? "" : " translate-x-[5rem] ") +
                          " font-semibold flex cursor-pointer justify-center items-center top-0 left-0 h-full text-center px-[1rem] bg-buttonColor text-textColor rounded-full text-xl py-1 absolute"
                        }
                      >
                        <p>{isPhone ? "Phone" : "Email"}</p>
                      </label>
                      <p className="font-semibold">Phone</p>
                      <p className="font-semibold">Email</p>
                    </div>

                    <div className="flex flex-1 gap-x-[0.5rem]">
                      <input
                        autoFocus
                        tabIndex={1}
                        required={true}
                        id={isPhone ? "phoneNumber" : "email"}
                        onChange={update_register_details}
                        placeholder={isPhone ? "phone number" : "Enter email"}
                        className="border-[1px] invalid:border-red-400 invalid:border-[1.5px] w-[100%] rounded-md py-2 pl-4 text-xl border-solid font-bold
                outline-none border-black bg-transparent"
                        type={isPhone ? "text" : "email"}
                        value={
                          isPhone ? r_details.phoneNumber : r_details.email
                        }
                        pattern={isPhone ? "[0-9]{10}" : null}
                      />
                    </div>
                  </div>
                  <div className="relative flex-col">
                    <label htmlFor="otp" className="font-bold text-xl py-1">
                      Name
                    </label>
                    <input
                      tabIndex={2}
                      required={true}
                      placeholder="Name"
                      className="border-[1px] invalid:border-red-500 invalid:border-[1.5px] rounded-md py-2 pl-4 text-xl border-thin font-bold
                outline-none border-black bg-transparent "
                      autoComplete="false"
                      type="text"
                      id="name"
                      value={r_details.name}
                      onChange={update_register_details}
                    />
                  </div>
                  <div className="relative flex-col">
                    <label
                      htmlFor="l_password"
                      className="font-bold text-xl py-1"
                    >
                      Password
                    </label>
                    <input
                      tabIndex={4}
                      required={true}
                      placeholder="password"
                      className="border-[1px] rounded-md py-2 pl-4 text-xl border-thin font-bold
                outline-none border-black bg-transparent "
                      autoComplete="false"
                      type={r_pass_visibility ? "text" : "password"}
                      id="pass"
                      onChange={update_register_details}
                      value={r_details.pass}
                    />
                    <span
                      onClick={() => update_r_pass_visib((prev) => !prev)}
                      className=" absolute bottom-[20%] cursor-pointer right-[0.5rem] material-symbols-outlined"
                    >
                      {r_pass_visibility ? "visibility" : "visibility_off"}
                    </span>
                  </div>
                  <div className="relative flex-col">
                    <label
                      htmlFor="l_conf_password"
                      className="font-bold text-xl py-1"
                    >
                      Confirm password
                    </label>
                    <input
                      onChange={handleConfPass}
                      tabIndex={5}
                      required={true}
                      value={r_details.confPass}
                      placeholder="confirm password"
                      className="border-[1px] rounded-md py-2 pl-4 text-xl border-thin font-bold
                outline-none border-black bg-transparent "
                      autoComplete="false"
                      type="password"
                      id="conf_pass"
                    />
                  </div>
                  <div className="relative flex-row justify-between items-center border-1 border-solid border-black">
                    <div>
                      <input
                        required={true}
                        onChange={(e) => update_image(e.target.files[0])}
                        type="file"
                        id=""
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        tabIndex={6}
                        onChange={() =>
                          update_r_details((prev) => {
                            return { ...prev, make_admin: !prev.make_admin };
                          })
                        }
                        className="mr-[0.5rem] md:scale-110"
                        placeholder="confirm password"
                        autoComplete="false"
                        type="checkbox"
                        checked={r_details.make_admin}
                        id="make_admin"
                      />

                      <label
                        htmlFor="l_conf_password"
                        className="font-bold text-xl"
                      >
                        Make admin
                      </label>
                    </div>
                  </div>
                  <div className="flex-col w-full items-center mt-4">
                    <button
                      tabIndex={7}
                      type="submit"
                      value={"SIGN UP"}
                      className="w-[40%] bg-buttonColor rounded-md py-4 text-center font-bold text-xl text-textColor"
                    >
                      SIGNUP
                    </button>
                  </div>
                  <div className="flex-row text-xl w-full font-bold">
                    <span>Have an account</span>
                    <span
                      onClick={() => {
                        updateLogin((prev) => !prev);
                      }}
                      className="px-1 text-red-500 cursor-pointer"
                    >
                      login here
                    </span>
                  </div>
                </form>
              </section>
            )}
          </div>
        </div>
        {alertState.state && <AlertBox />}
      </div>
    </>
  );
};

export default Login;
