import { Text, View } from "@bacons/react-views";
import Context from "../../Context/Context";
import { useContext, useState } from "react";
import { useNavigation } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { Button, StyleSheet, TouchableOpacity } from "react-native";

function Signup() {
  const context = useContext(Context);
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("");
  const [message, setMessage] = useState();

  const emailHandler = (value) => {
    setEmail(value);
  };
  const usernameHandler = (value) => {
    setUsername(value);
  };

  const passwordHandler = (value) => {
    setPassword(value);
  };

  const securityHandler = (value) => {
    setSecurity(value);
  };

  const userSignUp = () => {
    const data = { username, password, email, security };
    if (data.username == "" || data.password == "" || data.email == "") {
      setMessage("Please Input all details");
    } else {
      const url = "http://192.168.1.5:3000/user/signup";
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
            navigation.navigate("Home");
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
    <View style={styles.container}>
      <Text>Signup Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        value={username}
        onChangeText={usernameHandler}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Whats your favourite person name?"
        secureTextEntry
        value={security}
        onChangeText={securityHandler}
      />
      {message && (
        <Text style={styles.message}>
          {message} <Button title="X" onPress={cross()} />
        </Text>
      )}
      <Button title="Signup" onPress={userSignUp} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Already have an account?</Text>
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
  message: {
    color: "red",
  },
});
export default Signup;
