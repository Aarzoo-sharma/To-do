import { Text, View } from "@bacons/react-views";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";

function ForgetPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState("");
  const [message, setMessage] = useState();

  const emailHandler = (value) => {
    setEmail(value);
  };

  const securityHandler = (value) => {
    setSecurity(value);
  };

  const passwordHandler = (value) => {
    setPassword(value);
  };

  const changePassword = () => {
    const data = { email, password, security };
    if (data.email == "" || data.password == "" || data.security == "") {
      setMessage("Please Input all details");
    } else {
      const url = "http://192.168.1.5:3000/user/forgetPassword";
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
    <View style={styles.container}>
      <Text>Forget password Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={emailHandler}
      />
      <TextInput
        style={styles.input}
        placeholder="Whats your favourite person name?"
        secureTextEntry
        value={security}
        onChangeText={securityHandler}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your new password"
        secureTextEntry
        value={password}
        onChangeText={passwordHandler}
      />
      {message && (
        <Text style={styles.message}>
          {message} <Button title="X" onPress={cross()} />
        </Text>
      )}
      <Button title="Submit" onPress={changePassword} />
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Login Page?</Text>
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

export default ForgetPassword;
