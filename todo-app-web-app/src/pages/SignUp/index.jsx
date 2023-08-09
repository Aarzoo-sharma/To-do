import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import styles from "./index.module.css";

import FormInput from "../../components/FormInput";
import UserMessage from "../../components/userMessage";
import Context from "../../Context/Context";

function Signup() {
  const context = useContext(Context);
  const navigate =useNavigate()
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("");
  const [message, setMessage] = useState();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const securityHandler = (e) => {
    setSecurity(e.target.value);
  };

  const userSignUp = (e) => {
    e.preventDefault();
    const data = { username, password, email, security };
    if (data.username == "" || data.password == "" || data.email == "") {
      setMessage("Please Input all details");
    } else {
      const url = "http://localhost:3000/user/signup";
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
          if (data.status) {
            console.log(data);
            context.setUserId(data.userId);
            context.setUsername(data.name);
            context.setUserLoggedIn(data.loggedin);
            navigate("/")
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
        <h3>Sign Up</h3>
        <form onSubmit={userSignUp} className={styles.form}>
          <FormInput
            value={username}
            onChange={usernameHandler}
            type="text"
            placeholder="username"
          />
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
            placeholder="Password..."
          />
          <FormInput
            value={security}
            onChange={securityHandler}
            type="password"
            placeholder="Whats your favourite person name?"
          />
          <input className={styles.btn} type="submit" value="SignUp" />
        </form>
        {message && <UserMessage onClick={cross()}>{message}</UserMessage>}
        <p>
          Have an account? <Link to="/user/login">Login</Link>
        </p>
      </div>
      <Outlet />
    </>
  );
}

export default Signup;
