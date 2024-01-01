import { useEffect } from "react";
import { axiosPrivate } from "./axios";
import useRefreshToken from "./useRefreshToken";
import { useContext } from "react";
import AuthContext from "./AuthContext";
function useAxiosPrivate() {
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken();

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async function (error) {
        const prevReq = error?.config;
        if (error?.response?.status === 403 && !prevReq?.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();
          prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevReq);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(resIntercept);
      axiosPrivate.interceptors.request.eject(reqIntercept);
    };
  }, [auth, refresh]);
  return axiosPrivate;
}

export default useAxiosPrivate;
