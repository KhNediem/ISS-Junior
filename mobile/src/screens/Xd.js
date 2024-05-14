import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Chapters from "../screens/Chapters";
import { useEffect, useState } from "react";

import UKFlag from "../../../mobile/assets/Flag/UK.png";
import RussiaFlag from "../../../mobile/assets/Flag/france.png";
import JapanFlag from "../../../mobile/assets/Flag/japan.png";
import ItalyFlag from "../../../mobile/assets/Flag/italy.png";
import TurkeyFlag from "../../../mobile/assets/Flag/turkey.png";
import FranceFlag from "../../../mobile/assets/Flag/france.png";
import * as Font from "expo-font";
import config from '../../config.json';


const Xd = ({ navigation, route }) => {
  const ip = config.ip;
  const flagImages = {
    UK: UKFlag,
    Russia: RussiaFlag,
    Japan: JapanFlag,
    Italy: ItalyFlag,
    Turkey: TurkeyFlag,
    France: FranceFlag,
  };

  const lessonID = 0;
  useEffect(() => {
    const { languageID } = route.params;
  }, [route.params]);

  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    fetchLessonsList();
  }, []);

  const fetchLessonsList = async () => {
    try {
      const response = await fetch(
        `http://${ip}:3001/lessons/${route.params.languageID}`
      );
      const data = await response.json();
      setLessonList(data);
    } catch (error) {
      console.error("Error fetching lessons list:", error);
    }
  };

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    fetchCourseList();
  }, []);

  const fetchCourseList = async () => {
    try {
      const response = await fetch(
        `http://${ip}:3001/languages/${route.params.languageID}`
      );
      const data = await response.json();
      setCourseList(data);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
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
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          paddingHorizontal: 20,
          paddingTop: 80,
        }}
      ></View>
      <Image
        source={flagImages[courseList[0]?.img]}
        style={{ height: 80, width: 80, alignSelf: "center", marginTop: 20 }}
      />
      <Text
        style={{
          color: "#FFF",
          fontSize: 50,
          width: 200,
          alignSelf: "center",
          textAlign: "center",
          fontFamily: "font",
          color: "black",
          paddingTop: 10,
          textTransform: "uppercase",
        }}
      >
        {courseList[0] && courseList[0].LanguageName}
      </Text>

      <Modalize
        handleStyle={{
          marginTop: 30,
          backgroundColor: "#e9e9e9",
          width: 80,
        }}
        modalStyle={{
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
          backgroundColor: "#FADA5E",
        }}
        alwaysOpen={510}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View>
          {lessonList.map((lesson, index) => (
            <Chapters
              key={index}
              num={index + 1}
              color="#FADA5E"
              percent={lesson.progress}
              duration={lesson.duration}
              title={lesson.LessonName}
              onPress={() =>
                navigation.navigate("VideoPage", { lessonID: lesson.LessonID })
              }
            />
          ))}
        </View>
      </Modalize>
    </ImageBackground>
  );
};

export default Xd;
