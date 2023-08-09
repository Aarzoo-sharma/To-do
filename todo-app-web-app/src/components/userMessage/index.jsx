import React from "react";
import styles from "./index.module.css";
function UserMessage(props) {
  
  return (
    <>
      <div className={styles.container}>
        {props.children}
        <button onClick={props.onClick} className={styles.cross}>
          &#x2716;
        </button>
      </div>
    </>
  );
}

export default UserMessage;
