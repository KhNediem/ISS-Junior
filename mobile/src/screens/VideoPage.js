import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { Video } from "expo-av";
import Chapters from "../screens/Chapters";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const VideoPage = ({ route }) => {
  const navigation = useNavigation();
  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    if (route.params && route.params.lessonID) {
      fetchLessonsList(route.params.lessonID);
    }
  }, [route.params]);

  const fetchLessonsList = async (lessonID) => {
    try {
      const response = await fetch(`http://10.0.2.2:3001/lesson/${lessonID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch lessons list");
      }
      const data = await response.json();
      setLessonList(data);
    } catch (error) {
      console.error("Error fetching lessons list:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../images/1.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <Text style={styles.topText}>BACLINGO</Text>
        <Video
          source={require("../videos/maintro.mp4")}
          rate={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          useNativeControls
          style={styles.video}
        />
        <View style={styles.contentContainer}>
          <Text
            style={{
              fontFamily: "coolvetica",
              fontSize: 30,
              paddingBottom: 15,
            }}
          >
            {lessonList.length > 0 && lessonList[0].LessonName}
          </Text>
          <Text style={styles.text}>
            {lessonList.length > 0 && lessonList[0].LessonContent}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MemoryPairGame")}
            style={styles.button}
          >
            <Text style={{ color: "black", fontSize: 15 }}>
              Start your game
            </Text>
            <Image source={require("../images/a3.png")} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (route.params && route.params.lessonID) {
                navigation.navigate("Quiz", {
                  lessonID: route.params.lessonID,
                });
              } else {
                console.warn("Lesson ID is undefined or not provided");
              }
            }}
          >
            <Text style={styles.buttonText}>Start Quiz now!</Text>
            <Image source={require("../images/a3.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    fontFamily: "customFont",
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'black',
    fontSize: 50,
  },
  contentContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  video: {
    width: width * 0.9,
    height: height / 3,
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    color: "black",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FADA5E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    marginRight: 10,
  },
});

export default VideoPage;
