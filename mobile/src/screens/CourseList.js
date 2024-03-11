import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';

const CourseList = ({ img, title, bg, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        backgroundColor: bg,
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <Image source={img} style={{ width: 40, height: 40 }} />

      <View>
        <Text
          style={{
            color: '#345c74',
            fontFamily: 'Bold',
            fontSize: 13,
            paddingHorizontal: 20,
            width: 170,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: '#f58084',
            fontFamily: 'Medium',
            fontSize: 12,
            paddingHorizontal: 20,
          }}
        >
          10 hours, 19 lessons
        </Text>
      </View>
      <Text
        style={{
          color: '#345c74',
          fontFamily: 'Medium',
          fontSize: 13,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        25%
      </Text>
      <ProgressCircle
        percent={30}
        radius={17}
        borderWidth={1.5}
        color="f580084" // Note: there seems to be a typo here; should be "#f58084"
        shadowColor="#FFF"
        bgColor="#FFF"
      >
        <Image source={require('../images/pl.png')} />
      </ProgressCircle>
    </TouchableOpacity>
  );
};

export default CourseList;
