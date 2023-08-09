import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Context from "./Context/Context";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  const context = useContext(Context);

  useEffect(() => {
    let url = "http://localhost:3000/user/checkAuth";
    fetch(url, { method: "GET", credentials: "include" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.loggedin) {
          context.setUserId(data.userId);
          context.setUsername(data.name);
          context.setUserLoggedIn(data.loggedin);
        } else {
          context.setUserId();
          context.setUsername();
          context.setUserLoggedIn();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={context.userLoggedIn ? <Home /> : <Login />}
        />
        <Route
          exact
          path="/user/login"
          element={context.userLoggedIn ? <>404 page not found</> : <Login />}
        />
        <Route
          exact
          path="/user/signup"
          element={context.userLoggedIn ? <>404 page not found</> : <Signup />}
        />
        <Route
          exact
          path="/user/forgetPassword"
          element={
            context.userLoggedIn ? <>404 page not found</> : <ForgetPassword />
          }
        />
        <Route exact path="*" element={<>404 page not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
