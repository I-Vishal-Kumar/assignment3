import PropTypes from "prop-types";
// UserContext.js
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, update_user_data] = useState(0);

  return (
    <UserContext.Provider value={{ userData, update_user_data }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node,
};

export const useUserContext = () => {
  return useContext(UserContext);
};
