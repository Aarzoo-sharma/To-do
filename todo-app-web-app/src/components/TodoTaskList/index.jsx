import React, { useState } from "react";

import styles from "./index.module.css";

function TodoTaskList(props) {
  let element = props.element;

  const [checked, setChecked] = useState(element.checked);
  const [editable, setEditable] = useState(true);
  const [task, setTask] = useState(element.task);

  const changeEditable = () => {
    if (editable) {
      if(checked)
      setChecked(!checked);
      setEditable(!editable);
    } else {
      //if task to updated to empty
      if (task == "") deleteTask();
      else {
        const url = "http://localhost:3000/user/todo/updateTask";
        const data = { task, taskId: element.taskId };
        fetch(url, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.status == "ok") {
              setChecked(0);
              setEditable(!editable);
            } else console.error(data.error);
          });
      }
    }
  };

  const taskHandler = (e) => {
    setTask(e.target.value);
  };

  const checkedHandler = () => {
    const url = "http://localhost:3000/user/todo/taskChecked";
    const data = { checked, taskId: element.taskId };
    fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == "ok") setChecked(!checked);
        else console.error(data.error);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTask = (id) => {
    const url = "http://localhost:3000/user/todo/taskDelete";
    const data = { taskId: id };
    fetch(url, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == "ok") props.deleteItem(id);
        else console.error(data.error);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let taskClass = styles.task;
  if (checked) {
    taskClass += " " + styles.checked;
  } else {
    taskClass = styles.task;
  }

  return (
    <div key={element.taskId} className={styles.todoItem}>
      <input
        type="text"
        value={task}
        disabled={editable}
        onChange={taskHandler}
        className={taskClass}
      />
      <input type="checkbox" onClick={checkedHandler} checked={checked} />
      <input
        type="button"
        className={styles.btn}
        onClick={changeEditable}
        value={editable ? "Edit" : "Save"}
      />
      <input
        type="button"
        className={styles.btn}
        value="Delete"
        onClick={()=>deleteTask(element.taskId)}
      />
    </div>
  );
}

export default TodoTaskList;
