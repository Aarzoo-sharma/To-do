import React, { useState } from "react";

import styles from "./index.module.css";
import FormInput from "../FormInput";

function TodoInput(props) {
  const [inputTodo, setinputTodo] = useState("");
  const inputTodoHandler = (e) => {
    setinputTodo(e.target.value);
  };
  const newTodoItemSave = (e) => {
    e.preventDefault();
    const data = { task: inputTodo };
    if (data.task == "") {
      return;
    } else {
      const url = "http://localhost:3000/user/todo/newTodoItem";
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
            props.addItem({
              taskId: data.taskId,
              userId: data.userId,
              task: inputTodo,
              checked: 0,
            });
            setinputTodo("");
          } else {
            console.log(data.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <div className={styles.innerContainer}>
      <h1>Enter todo list items</h1>
      <form onSubmit={newTodoItemSave}>
        <FormInput
          type="text"
          value={inputTodo}
          onChange={inputTodoHandler}
          placeholder="I need to..."
        />
        <input className={styles.btn} type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default TodoInput;
