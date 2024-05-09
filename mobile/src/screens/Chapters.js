import React, {useState} from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import * as Font from "expo-font";
const Chapters = ({ title, num, duration, percent, color, onPress }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load custom font
  async function loadFont() {
    await Font.loadAsync({
      coolvetica: require("../../../mobile/assets/Fonts/coolvetica rg.otf"),
    });
    setFontLoaded(true);
  }

  if (!fontLoaded) {
    loadFont();
    return null; // or a loading indicator
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        backgroundColor: "white", // Set background color to transparent
        borderColor: "#F6C324", // Set border color
        borderWidth: 1, // Add border width
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 30,
        borderWidth: 2,
      }}
    >
      <View
        style={{
          backgroundColor: color,
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 6,
        }}
      >
        <Text style={{ fontSize: 10 }}>{num}</Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: 20,
        }}
      >
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text
            style={{
              color: "black",
              fontSize: 18,
              flexWrap: "wrap",
              justifyContent: "center",
              textAlign: "center", // Center align the text
              paddingTop: 10,
              fontFamily: "coolvetica",

            }}
            ellipsizeMode="tail" // Add ellipsis (...) if text overflows
          >
            {title}
          </Text>
          <Text
            style={{
              color: "#f58084",
              fontSize: 12,
            }}
          >
            {duration}
          </Text>
        </View>

        <ProgressCircle
          percent={percent}
          radius={17}
          borderWidth={1.5}
          color="#f58084"
          shadowColor="#FFF"
          bgColor="#FADA5E"
        >
          <Image source={require("../images/pl.png")} />
        </ProgressCircle>
      </View>
    </TouchableOpacity>
  );
};

export default Chapters;
