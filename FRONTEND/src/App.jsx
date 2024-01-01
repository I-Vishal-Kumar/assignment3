import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./componenets/HOME/Home";
import Layout from "./componenets/LAYOUT/Layout";
import Login from "./componenets/LOGIN/login";
import { UserContextProvider } from "./hooks/userContext";
import Persistance from "./hooks/Persistance";
import { Alert } from "./hooks/useAlert";
import EditDetails from "./componenets/EDITDETAILS/EditDetails";
function App() {
  return (
    <Router>
      <UserContextProvider>
        <Alert>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route element={<Persistance />}>
              <Route path="" element={<Layout />}>
                <Route path="home" element={<Home />} />
                <Route path="edit_details" element={<EditDetails />} />
              </Route>
            </Route>
          </Routes>
        </Alert>
      </UserContextProvider>
    </Router>
  );
}

export default App;
