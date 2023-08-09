import { useContext } from "react";
import Context from "./Context/Context";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/forgetPassword";

const Stack = createNativeStackNavigator();

export default function Routers() {
  const context = useContext(Context);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={context.userLoggedIn?LandingPage:Login} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="forgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}
