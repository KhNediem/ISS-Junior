import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WordControlProvider from "./src/context";
import { Welcome, Login, Signup } from "./src/pages/Starter";
import { Quiz } from "./src/pages/Quiz"

const Stack = createStackNavigator();

export default function App() {
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
          backgroundColor: "#000000", // Replace with your desired color
        }}
      >
        <Image
          style={{ width: 180, height: 180 }}
          source={require("./assets/logo.png")}
        />
      </View>
    );
  }
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Quiz">
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
          name="Quiz"
          component={Quiz}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomePage() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen
        name="ExercisePage"
        component={ExercisePage}
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="CountrySelect"
        component={CountrySelect}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
}

function BottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            // Your existing code for tabBarIcon
          },
        }}
      />
      <Tab.Screen
        name="Dialog"
        component={Dialog}
        options={{
          tabBarIcon: ({ focused }) => {
            // Your existing code for tabBarIcon
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            // Your existing code for tabBarIcon
          },
        }}
      />
    </Tab.Navigator>
  );
}
