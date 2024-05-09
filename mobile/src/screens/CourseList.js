import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import ProgressCircle from "react-native-progress-circle";

const CourseList = ({ img, title, bg, onPress, languageID }) => {
  return (
    <TouchableOpacity
  onPress={() => onPress(languageID)} // Pass languageID to onPress function
  style={{
    flexDirection: "row",
    backgroundColor: "white", // Set background color to transparent
    borderColor: "#F6C324", // Set border color
    borderWidth: 1, // Add border width
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
  }}
>
      <Image source={img} style={{ width: 50, height: 50 }} />

      <View>
        <Text
          style={{
            color: "black",
            fontFamily: "Bold",
            fontSize: 20,
            paddingHorizontal: 20,
            width: 170,
            fontFamily: "coolvetica",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "black",
            fontFamily: "Medium",
            fontSize: 10,
            paddingHorizontal: 20,
          }}
        >
          Click here to continue!
        </Text>
      </View>
      <View 
      style={{
        marginLeft: 40

      }}>
      <ProgressCircle
        percent={100}
        radius={17}
        borderWidth={1.5}
        color="black"
        shadowColor="#FFF"
        bgColor="#FFF"
      >
        <Image source={require("../images/pl.png")} />
      </ProgressCircle>
      </View>
    </TouchableOpacity>
  );
};

export default CourseList;
