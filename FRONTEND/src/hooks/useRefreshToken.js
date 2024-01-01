import axios from "./axios";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

function useRefreshToken() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  async function refresh() {
    let res;
    try {
      res = await axios.get("/refresh", {
        withCredentials: true,
      });

      if (res?.data) {
        setAuth((prev) => {
          return { ...prev, accessToken: res.data.accessToken };
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
    return res.data.accessToken;
  }
  return refresh;
}
export default useRefreshToken;
