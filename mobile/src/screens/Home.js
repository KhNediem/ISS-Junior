import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CourseList from '../screens/CourseList';

const Home = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../images/Home.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <ScrollView>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 12,
              borderRadius: 10,
              marginTop: 30,
              backgroundColor: '#d1a0a7',
            }}
          >
            <Image source={require('../images/hum.png')} style={{ height: 15, width: 20 }} />
          </View>
        </View>
        <Text
          style={{
            paddingHorizontal: 20,
            fontSize: 35,
            paddingTop: 40,
            fontFamily: 'Bold',
            color: '#FFF',
          }}
        >
          Welcome back!
        </Text>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#FFF2F2',
            marginTop: 15,
            marginHorizontal: 20,
            borderRadius: 20,
            paddingVertical: 30,
            paddingLeft: 30,
          }}
        >
          <View>
            <Text
              style={{
                color: '#345c74',
                fontSize: 20,
                fontFamily: 'Bold',
                width: 250,
                paddingRight: 100,
              }}
            >
              Start learning new Staff
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cources')}
              style={{
                flexDirection: 'row',
                backgroundColor: '#f58084',
                alignItems: 'center',
                marginTop: 20,
                width: 150,
                paddingVertical: 10,
                borderRadius: 14,
                paddingHorizontal: 10,
              }}
            >
              <Text style={{ color: '#FFF', fontFamily: 'Bold', fontSize: 12 }}>Categories</Text>
              <Image source={require('../images/a3.png')} style={{ marginLeft: 20, width: 8, height: 8 }} />
            </TouchableOpacity>
          </View>
          <Image source={require('../images/undraw.png')} style={{ marginLeft: -80, marginTop: 35 }} />
        </View>
        <Text
          style={{
            color: '#345c74',
            fontFamily: 'Bold',
            fontSize: 20,
            paddingHorizontal: 20,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          Courses in progress
        </Text>

        <CourseList img={require('../images/xd.png')} title="Adobe XD Prototyping" bg="#fdddf3" />
        <CourseList img={require('../images/sketch.png')} title="Sketch shortcuts and tricks" bg="#fef8e3" />
        <CourseList
          img={require('../images/ae.png')}
          title="UI Motion Design in After Effects"
          bg="#fcf2ff"
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;
