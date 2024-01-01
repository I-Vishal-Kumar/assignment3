import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import useRefreshToken from "./useRefreshToken";
import { Outlet } from "react-router-dom";
const Persistance = () => {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    auth?.accessToken ? setLoading(false) : verifyRefreshToken();
  }, [auth, refresh]);

  return <>{isLoading ? <p>LOADING...</p> : <Outlet />}</>;
};

export default Persistance;
