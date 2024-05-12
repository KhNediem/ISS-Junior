import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import COLORS from "../../../constants/colors"; // Adjust the number of '../' based on your folder structure
import Button from "../../components/Button";
import * as Font from "expo-font";

const Welcome = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load custom font
  async function loadFont() {
    await Font.loadAsync({
      coolvetica: require("../../../assets/Fonts/coolvetica rg.otf"),
      customFont: require("../../../../mobile/assets/Fonts/Heyam.ttf"),
      font: require("../../../../mobile/assets/Fonts/Sunny Spells Basic.ttf"),
    });
    setFontLoaded(true);
  }

  if (!fontLoaded) {
    loadFont();
    return null; // or a loading indicator
  }
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.white, COLORS.white]}
    >
      <ImageBackground
        source={require("../../images/1.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>BACLINGO</Text>
          </View>

          {/* content  */}

          <View style={styles.contentContainer}>
            <Text style={styles.title}>Let's Get</Text>
            <Text style={styles.subtitle}>Started</Text>

            <View style={styles.description}>
              <Text style={styles.descriptionText}>
                Learn your Bac languages
              </Text>
              <Text style={styles.descriptionText}>In a fun and easy way!</Text>
            </View>

            <Button
              title="Join Now"
              onPress={() => navigation.navigate("Signup")}
              style={styles.button}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account ?</Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
    marginTop: 40,
    backgroundColor: "#F6C324",
    padding: 30,
    borderRadius: 50,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  logoText: {
    fontFamily: "customFont",
    fontSize: 30,
    color: COLORS.black,
    marginTop: 8,
    
  },
  contentContainer: {
    paddingHorizontal: 22,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 50,
    color: COLORS.black,
    fontFamily: "customFont",
    
  },
  subtitle: {
    fontFamily: "customFont",

    fontSize: 46,
    color: COLORS.black,
    
  },
  description: {
    marginVertical: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 30,
    color: COLORS.black,
    marginVertical: 4,
    fontFamily: "font",

  },
  button: {
    marginTop: 22,
    width: "100%",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: COLORS.black,
  },
  loginLink: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: "bold",
    marginLeft: 4,
  },
});

export default Welcome;
