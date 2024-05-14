// Courses.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Modalize } from "react-native-modalize";
import CourseList from "./CourseList";

// Import flag images
import UKFlag from "../../../mobile/assets/Flag/UK.png";
import RussiaFlag from "../../../mobile/assets/Flag/france.png";
import JapanFlag from "../../../mobile/assets/Flag/japan.png";
import ItalyFlag from "../../../mobile/assets/Flag/italy.png";
import TurkeyFlag from "../../../mobile/assets/Flag/turkey.png";
import FranceFlag from "../../../mobile/assets/Flag/france.png";
import config from '../../config.json';

import * as Font from "expo-font";

const Courses = ({ navigation }) => {
  const ip = config.ip;
  const [courseList, setCourseList] = useState([]);
  const languageID = 0;

  useEffect(() => {
    fetchCourseList();
  }, []);

  const fetchCourseList = async () => {
    try {
      const response = await fetch(`http://${ip}:3001/languages`);
      const data = await response.json();
      setCourseList(data);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };

  // Define flag images object to map country names to their corresponding flag images
  const flagImages = {
    UK: UKFlag,
    Russia: RussiaFlag,
    Japan: JapanFlag,
    Italy: ItalyFlag,
    Turkey: TurkeyFlag,
    France: FranceFlag,
  };

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
      source={require("../images/crs.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <Text
        style={{
          fontFamily: "customFont",
          paddingHorizontal: 20,
          fontSize: 60,
          paddingTop: 130,
          paddingBottom: 15,
          color: "black",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        HOME
      </Text>
      <Modalize
        handleStyle={{ marginTop: 30, backgroundColor: "black", width: 80 }}
        modalStyle={{
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          backgroundColor: "#FADA5E",
        }}
        alwaysOpen={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={{ marginTop: 40 }}>
          {courseList.map((course, index) => (
            <CourseList
              key={index}
              onPress={() =>
                navigation.navigate("Xd", { languageID: course.LanguageID })
              }
              img={flagImages[course.img]}
              title={course.LanguageName}
              bg="white"
            />
          ))}
        </View>
      </Modalize>
    </ImageBackground>
  );
};

export default Courses;
