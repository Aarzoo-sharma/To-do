import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import styles from "./index.module.css";

import FormInput from "../../components/FormInput";
import UserMessage from "../../components/userMessage";
import Context from "../../Context/Context";

function Login() {
  const navigate=useNavigate();
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const userLogin = (e) => {
    e.preventDefault();
    const data = { email, password };
    if (data.email == "" || data.password == "") {
      setMessage("Please Input all details");
    } else {
      const url = "http://localhost:3000/user/login";
      fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status == "ok") {
            context.setUserId(data.userId);
            context.setUsername(data.name);
            context.setUserLoggedIn(data.loggedin);
            navigate("/")
            nav
          } else {
            setMessage(data.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const cross = () => {
    let messageClear = setTimeout(() => {
      setMessage();
    }, 5000);
    return () => {
      clearTimeout(messageClear);
      setMessage();
    };
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Welcome to Todo App</h2>
        <h3>Log In</h3>
        <form onSubmit={userLogin} className={styles.form}>
          <FormInput
            value={email}
            onChange={emailHandler}
            type="email"
            placeholder="xyz@gmail.com"
          />
          <FormInput
            value={password}
            onChange={passwordHandler}
            type="password"
            placeholder="Password ..."
          />
          <input className={styles.btn} type="submit" value="Login" />
        </form>
        {message && <UserMessage onClick={cross()}>{message}</UserMessage>}
        <p>
          Forget Password? <Link to="/user/forgetPassword">Click here</Link>
        </p>
        <p>
          New user? <Link to="/user/signup">Register now</Link>
        </p>
      </div>
      <Outlet />
    </>
  );
}

export default Login;
