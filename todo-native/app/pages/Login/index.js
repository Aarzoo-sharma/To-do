import { Text, View } from "@bacons/react-views";
import Context from "../../Context/Context";
import { useContext, useState } from "react";
import { Button, StyleSheet, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

function Login() {
  const context = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const navigation = useNavigation();

  const emailHandler = (value) => {
    setEmail(value);
  };

  const passwordHandler = (value) => {
    setPassword(value);
  };

  const userLogin = () => {
    const data = { email, password };
    if (data.email == "" || data.password == "") {
      setMessage("Please Input all details");
    } else {
      const url = "http://192.168.1.5:3000/user/login";
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
            navigation.navigate("Home")
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
    }, 10000);
    return () => {
      clearTimeout(messageClear);
      setMessage();
    };
  };

  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={emailHandler}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        value={password}
        onChangeText={passwordHandler}
      />
      {message && (
        <Text style={styles.message}>
          {message} <Button title="X" onPress={cross()} />
        </Text>
      )}
      <Button title="Login" onPress={userLogin} />
      <TouchableOpacity onPress={() => navigation.navigate("forgetPassword")}>
        <Text>Forget password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>Move to Signup Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 10,
  },
  message:{
    color:"red"
  }
});

export default Login;
