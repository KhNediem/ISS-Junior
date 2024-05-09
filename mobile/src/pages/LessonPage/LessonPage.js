// src/screens/LessonPage.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const lessons = [
  { id: 1, title: 'Lesson 1', content: 'Content for lesson 1.' },
  { id: 2, title: 'Lesson 2', content: 'Content for lesson 2.' },
  // Add more lessons as needed
];

const OverriddenLessonPage = ({ navigation }) => {
  const navigateToDetail = (lesson) => {
    navigation.navigate('LessonDetail', { lesson });
  };

  return (
    <View style={overriddenStyles.container}>
      <Text style={overriddenStyles.title}>Overridden Lesson Page</Text>
      {lessons.map((lesson) => (
        <TouchableOpacity
          key={lesson.id}
          style={overriddenStyles.lessonItem}
          onPress={() => navigateToDetail(lesson)}
        >
          <Text style={overriddenStyles.lessonText}>{lesson.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const overriddenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Change the background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue', // Change the text color
  },
  lessonItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white', // Change the background color
  },
  lessonText: {
    color: 'green', // Change the text color
  },
});

export default OverriddenLessonPage;
