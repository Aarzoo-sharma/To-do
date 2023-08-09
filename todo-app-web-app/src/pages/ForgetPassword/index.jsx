import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import styles from "./index.module.css";

import FormInput from "../../components/FormInput";
import UserMessage from "../../components/userMessage";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("");
  const [message, setMessage] = useState();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const securityHandler = (e) => {
    setSecurity(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const changePassword = (e) => {
    e.preventDefault();
    const data = { email, password, security };
    if (data.email == "" || data.password == "" || data.security == "") {
      setMessage("Please Input all details");
    } else {
      const url = "http://localhost:3000/user/forgetPassword";
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
          setEmail("");
          setPassword("");
          setSecurity("");
          setMessage(data.message);
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
        <h3>Forget Password</h3>
        <form onSubmit={changePassword} className={styles.form}>
          <FormInput
            value={email}
            onChange={emailHandler}
            type="email"
            placeholder="xyz@gmail.com"
          />
          <FormInput
            value={security}
            onChange={securityHandler}
            type="password"
            placeholder="Whats your favourite person name?"
          />
          <FormInput
            value={password}
            onChange={passwordHandler}
            type="password"
            placeholder="New Password ..."
          />
          <input className={styles.btn} type="submit" value="Submit" />
        </form>
        {message && <UserMessage onClick={cross()}>{message}</UserMessage>}
        <p>
          Login? <Link to="/user/login">Click here</Link>
        </p>
        <p>
          New user? <Link to="/user/signup">Register now</Link>
        </p>
      </div>
      <Outlet />
    </>
  );
}

export default ForgetPassword;
