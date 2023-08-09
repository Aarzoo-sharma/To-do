import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editedTodo, setEditedTodo] = useState({ taskId: null, task: "" });

  const [inputTodo, setinputTodo] = useState("");

  const inputTodoHandler = (value) => {
    setinputTodo(value);
  };

  const newTodoItemSave = () => {
    const data = { task: inputTodo };
    if (data.task == "") {
      return;
    } else {
      const url = "http://192.168.1.5:3000/user/todo/newTodoItem";
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
            setinputTodo("");
            const newTask = {
              taskId: data.taskId,
              userId: data.userId,
              task: inputTodo,
              checked: 0,
            };
            setTodos([...todos, newTask]);
          } else {
            console.log(data.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    const url = "http://192.168.1.5:3000/user/todo/viewList";
    fetch(url, { method: "GET", credentials: "include" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([...data]);
      });
  }, []);

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.taskId === id);
    setEditedTodo({ taskId: id, task: todoToEdit.task });
  };

  const handleDelete = (id) => {
    const url = "http://192.168.1.5:3000/user/todo/taskDelete";
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
        if (data.status == "ok") {
          const newtodos = todos.filter((todo) => todo.taskId != id);
          setTodos([...newtodos]);
        } else console.error(data.error);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveEdit = () => {
    if (editedTodo.taskId !== null) {
      const url = "http://192.168.1.5:3000/user/todo/updateTask";
      const data = { task: editedTodo.task, taskId: editedTodo.taskId };
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
            setTodos((prevTodos) =>
              prevTodos.map((todo) =>
                todo.taskId === editedTodo.taskId
                  ? { ...todo, task: editedTodo.task }
                  : todo
              )
            );
          } else console.error(data.error);
        });
      setEditedTodo({ taskId: null, task: "" });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.taskId.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              {editedTodo.taskId === item.taskId ? (
                <>
                  <TextInput
                    style={styles.editInput}
                    value={editedTodo.task}
                    onChangeText={(text) =>
                      setEditedTodo({ ...editedTodo, task: text })
                    }
                    onBlur={handleSaveEdit}
                  />
                  <TouchableOpacity onPress={handleSaveEdit}>
                    <Text>Save</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text>{item.task}</Text>
                  <TouchableOpacity onPress={() => handleEdit(item.taskId)}>
                    <Text>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.taskId)}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={inputTodo}
        onChangeText={inputTodoHandler}
      />
      <Button title="Add Task" onPress={newTodoItemSave} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
  },
});

export default TodoList;
