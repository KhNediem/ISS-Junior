import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Dimensions, Text } from 'react-native';
import { Video } from 'expo-av';
import Chapters from '../screens/Chapters';

const { width, height } = Dimensions.get('window');

const VideoPage = ({ route }) => { // Add curly braces around route

  useEffect(() => {
    console.log("Route params:", route.params);
    const { lessonID } = route.params;
    console.log("Lesson ID:", lessonID);
  }, [route.params]);

  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    fetchLessonsList();
  }, []);

  const fetchLessonsList = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3001/lesson/${route.params.lessonID}`);
      const data = await response.json();
      setLessonList(data);
      console.log("Lesson List:", data);
    } catch (error) {
      console.error("Error fetching lessons list:", error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f58084" />
      <Video
        source={require('../videos/maintro.mp4')}
        rate={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping={false}
        useNativeControls
        style={styles.video}
      />
      <Chapters
        color="#FADA5E"
        percent={25}
        duration="2 hours, 20 minutes"
        title={lessonList.length > 0 && lessonList[0].LessonName}
        num={1}
      />

<Text style={styles.text}>
  {lessonList.length > 0 && lessonList[0].LessonContent}
</Text>

      <View style={styles.readMoreButton}>
        <Text style={styles.readMoreText}>Start Quiz now!</Text>
        <Image source={require('../images/a3.png')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: width,
    height: height / 3,
  },
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Medium',
    textAlign: 'justify',
    color: '#345c74',
    paddingLeft: 42,
    paddingRight: 35,
  },
  readMoreButton: {
    flexDirection: 'row',
    paddingVertical: 5,
    backgroundColor: '#FADA5E',
    marginHorizontal: 40,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  readMoreText: {
    color: 'black',
    fontFamily: 'Bold',
    fontSize: 15,
    marginRight: 50,
  },
});

export default VideoPage;
