import { Text, View } from "@bacons/react-views";
import { useContext } from "react";
import Context from "../../Context/Context";
import { Button, StyleSheet } from "react-native";
import TodoList from "./renderTodoList";

function LandingPage() {
  const context = useContext(Context);

  const logoutUser = () => {
    const url = "http://192.168.1.5:3000/user/logout";
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
    <View style={styles.container}>
      <Button title="Logout" onPress={logoutUser} />
      <Text style={styles.text}>{context.username}'s Todo List</Text>
        <TodoList/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default LandingPage;
