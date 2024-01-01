import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AlertContext = createContext();

export const Alert = ({ children }) => {
  let [alertState, update_alert_state] = useState({
    state: false,
    message: "something went wrong",
  });
  function getAlert(message) {
    update_alert_state({ state: true, message });
  }
  function closeAlert() {
    update_alert_state({ state: false, message: "Loading" });
  }

  return (
    <AlertContext.Provider value={{ getAlert, closeAlert, alertState }}>
      {children}
    </AlertContext.Provider>
  );
};

Alert.propTypes = {
  children: PropTypes.node,
};

export const useAlert = () => {
  return useContext(AlertContext);
};
