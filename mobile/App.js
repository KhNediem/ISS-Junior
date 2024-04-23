import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WordControlProvider from "./src/context";
import { Welcome, Login, Signup } from "./src/pages/Starter";
import { Quiz } from "./src/pages/Quiz";
import { Home } from "./src/screens";
import {Cources} from "./src/screens";
import {Xd} from "./src/screens";
import {VideoPage} from "./src/screens";

const Stack = createStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    Nunito_Black: require("./assets/Fonts/Nunito-Black.ttf"),
    Nunito_Bold: require("./assets/Fonts/Nunito-Bold.ttf"),
    Nunito_ExtraBold: require("./assets/Fonts/Nunito-ExtraBold.ttf"),
    Nunito_Regular: require("./assets/Fonts/Nunito-Regular.ttf"),
  });

  const [splashVisible, setSplashVisible] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);
      setShowLoginForm(true);
    }, 2000); // 2000 milliseconds (2 seconds)

    return () => {
      clearTimeout(splashTimer);
    };
  }, []);

  if (!loaded || splashVisible) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white", // Replace with your desired color
        }}
      >
        <Image
          style={{ width: 130, height: 130 }}
          source={require("./assets/logo.png")}
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false,
          }}
        /> 
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cources"
          component={Cources}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Xd"
          component={Xd}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="VideoPage"
          component={VideoPage}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
