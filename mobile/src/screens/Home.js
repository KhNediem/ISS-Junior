import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CourseList from "../screens/CourseList";
import * as Font from "expo-font";

const Home = ({ navigation }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load custom font
  async function loadFont() {
    await Font.loadAsync({
      customFont: require("../../../mobile/assets/Fonts/Heyam.ttf"),
      font: require("../../../mobile/assets/Fonts/Sunny Spells Basic.ttf"),
    });
    setFontLoaded(true);
  }

  if (!fontLoaded) {
    loadFont();
    return null; // or a loading indicator
  }
  return (
    <ImageBackground
      source={require("../../../mobile/assets/bgHome.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <ScrollView>
        <View
          style={{
            height: 1,
            backgroundColor: "grey", // Adjust color as needed
            marginHorizontal: 10, // Adjust margins as needed
            borderWidth: 1,
            marginTop: 45,
            borderColor: "#FADA5E"
          }}
        />
        <Text
          style={{
            fontFamily: "customFont",
            paddingHorizontal: 20,
            fontSize: 60,
            paddingTop: 20,
            paddingBottom: 15,
            color: "black",
            justifyContent: "center",
            textAlign: "center", // Center align the text
            backgroundColor: "white",
          }}
        >
          Welcome back!
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: "grey", // Adjust color as needed
            marginHorizontal: 10, // Adjust margins as needed
            borderWidth: 1,
            borderColor: "#FADA5E"
          }}
        />
        <View
          style={{
            backgroundColor: "#FADA5E",
            marginTop: 60,
            marginBottom: 20,
            marginHorizontal: 20,
            borderRadius: 20,
            paddingVertical: 30,
            paddingHorizontal: 20,
            justifyContent: "center", // Center content horizontally
            alignItems: "center", // Center content vertically

          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Cources")}
            style={{ alignItems: "center" }}
          >
            <Text
              style={{
                fontFamily: "font",
                color: "black",
                fontSize: 40,
                textAlign: "center", // Center align the text
              }}
            >
              CLICK HERE TO START
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "grey", // Adjust color as needed
            marginHorizontal: 10, // Adjust margins as needed
            marginTop: 15,
            borderColor: "black"
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <Text
            style={{
              color: "black",
              fontSize: 20,
              paddingHorizontal: 20,
              fontWeight: "bold"
            }}
          >
            LANGUAGES IN PROGRESS
          </Text>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "grey", // Adjust color as needed
            marginHorizontal: 10, // Adjust margins as needed
            borderColor: "black"
          }}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 40,
              paddingBottom: 60,
            }}
          >
            <CourseList
              img={require("../../../mobile/assets/Flag/UK.png")}
              title="English"
              bg="#FADA5E"
            />
            <CourseList
              img={require("../../../mobile/assets/Flag/france.png")}
              title="French"
              bg="#FADA5E"
            />
            <CourseList
              img={require("../../../mobile/assets/Flag/italy.png")}
              title="Italian"
              bg="#FADA5E"
            />
          </View>
        </ScrollView>
        <View
          style={{
            height: 1,
            backgroundColor: "grey", // Adjust color as needed
            marginHorizontal: 10, // Adjust margins as needed
            borderColor: "black"
          }}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
