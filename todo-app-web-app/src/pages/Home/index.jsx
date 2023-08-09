import React, { useContext, useEffect, useState } from "react";

import styles from "./index.module.css";
import TodoInput from "../../components/TodoInput";
import Context from "../../Context/Context";
import TodoTaskList from "../../components/TodoTaskList";

function Home() {
  const context = useContext(Context);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3000/user/todo/viewList";
    fetch(url, { method: "GET", credentials: "include" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodoList([...data]);
        console.log('====================================');
        console.log(data);
        console.log('====================================');
      });
  }, []);

  const updateTask = (updatedItem) => {
    let newList = todoList.map((element) => {
      if (element.taskId == updatedItem.taskId) return updatedItem;
      else return element;
    });
    setTodoList([...newList]);
  };
  const deleteTask = (taskId) => {
    console.log("hello ",taskId)
    let newList = todoList.filter((todo) => todo.taskId != taskId)
    setTodoList([...newList]);
  };

  const addTodoTask = (value) => {
    setTodoList([...todoList, value]);
  };

  const logoutUser = () => {
    const url = "http://localhost:3000/user/logout";
    fetch(url, { credentials: "include" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status == "ok") {
          context.setUserId();
          context.setUsername();
          context.setUserLoggedIn();
        }
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div>
          <h1>{context.username}'s Todo List</h1>
          <h3>Add task to your list.</h3>
          <h4>
            You may then view pending tasks below.
            <input
              value="Logout"
              className={styles.btn}
              onClick={logoutUser}
              type="button"
            />
          </h4>
        </div>
        <div className={styles.lowerContainer}>
          {todoList &&
            todoList.map((element) => {
              return (
                <TodoTaskList key={element.taskId}
                  element={element}
                  deleteItem={deleteTask}
                  updateTask={updateTask}
                />
              );
            })}
        </div>
        <TodoInput addItem={addTodoTask} />
      </div>
    </div>
  );
}

export default Home;
