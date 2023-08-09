import React from "react";
import styles from "./index.module.css";

function FormInput(props) {
  return (
    <input
      className={styles.input}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default FormInput;
