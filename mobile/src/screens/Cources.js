// Courses.js

import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import { Modalize } from "react-native-modalize";
import CourseList from "./CourseList";

// Import flag images
import UKFlag from '../../../mobile/assets/Flag/UK.png';
import RussiaFlag from '../../../mobile/assets/Flag/france.png';
import JapanFlag from '../../../mobile/assets/Flag/japan.png';
import ItalyFlag from '../../../mobile/assets/Flag/italy.png';
import TurkeyFlag from '../../../mobile/assets/Flag/turkey.png';
import FranceFlag from '../../../mobile/assets/Flag/france.png';

const Courses = ({ navigation }) => {
  const [courseList, setCourseList] = useState([]);
  const languageID = 0;

  
  useEffect(() => {
    fetchCourseList();
  }, []);

  const fetchCourseList = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3001/languages");
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

  return (
    <ImageBackground
      source={require("../../../mobile/assets/bgHome.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flexDirection: "row", width: "100%", paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            borderRadius: 10,
            marginTop: 30,
            backgroundColor: "#8bbcdb",
          }}
        >
          <Image source={require("../images/a1.png")} style={{ width: 20, height: 15 }} />
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            borderRadius: 10,
            marginTop: 30,
            backgroundColor: "#8bbcdb",
            marginLeft: 240,
          }}
        >
          <Image source={require("../images/hum.png")} style={{ height: 15, width: 20 }} />
        </View>
      </View>
      <Text
        style={{
          color: "#FFF",
          fontSize: 35,
          fontFamily: "Bold",
          width: 200,
          alignSelf: "center",
          textAlign: "center",
          marginTop: 34,
        }}
      >
        Languages
      </Text>

      <Modalize
        handleStyle={{ marginTop: 30, backgroundColor: "#e9e9e9", width: 80 }}
        modalStyle={{ borderTopLeftRadius: 60, borderTopRightRadius: 60 }}
        alwaysOpen={500}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={{ marginTop: 40 }}>
          {courseList.map((course, index) => (
            <CourseList
            key={index}
            onPress={() => navigation.navigate('Xd', { languageID: course.LanguageID })}
            img={flagImages[course.img]}
            title={course.LanguageName}
            bg={course.bg}
          />
          
          ))}
        </View>
      </Modalize>
    </ImageBackground>
  );
};

export default Courses;
