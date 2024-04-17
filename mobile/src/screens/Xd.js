import React from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Modalize } from 'react-native-modalize';
import Chapters from '../screens/Chapters';
import { useEffect, useState } from 'react';

import UKFlag from '../../../mobile/assets/Flag/UK.png';
import RussiaFlag from '../../../mobile/assets/Flag/france.png';
import JapanFlag from '../../../mobile/assets/Flag/japan.png';
import ItalyFlag from '../../../mobile/assets/Flag/italy.png';
import TurkeyFlag from '../../../mobile/assets/Flag/turkey.png';
import FranceFlag from '../../../mobile/assets/Flag/france.png';

const Xd = ({ navigation, route  }) => {

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
    console.log("Language ID:", languageID);
  }, [route.params]);

  const [lessonList, setLessonList] = useState([]);

  useEffect(() => {
    fetchLessonsList();
  }, []);

  const fetchLessonsList = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:3001/lessons/${route.params.languageID}`);
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
      const response = await fetch(`http://10.0.2.2:3001/languages/${route.params.languageID}`);
      const data = await response.json();
      setCourseList(data);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };
  

  return (
    <ImageBackground
      source={require('../images/crs.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cources')}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            borderRadius: 10,
            marginTop: 30,
            backgroundColor: '#9a3c7e',
          }}
        >
          <Image source={require('../images/a1.png')} style={{ height: 15, width: 20 }} />
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            borderRadius: 10,
            marginTop: 30,
            backgroundColor: '#9a3c7e',
            marginLeft: 240,
          }}
        >
          <Image source={require('../images/hum.png')} style={{ height: 15, width: 20 }} />
        </View>
      </View>
      <Image source={flagImages[courseList[0]?.img]} style={{ height: 60, width: 60, alignSelf: 'center', marginTop: 20 }} />
<Text style={{ color: '#FFF', fontFamily: 'Bold', fontSize: 35, width: 200, alignSelf: 'center', textAlign: 'center' }}>
  {courseList[0] && courseList[0].LanguageName}
</Text>


      <Modalize
        handleStyle={{
          marginTop: 30,
          backgroundColor: '#e9e9e9',
          width: 80,
        }}
        modalStyle={{
          borderTopLeftRadius: 60,
          borderTopRightRadius: 60,
        }}
        alwaysOpen={510}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View style={{ flexDirection: 'row', marginHorizontal: 30, marginTop: 40 }}>
          <Image
            source={flagImages[courseList.img]}
            style={{
              height: 50,
              width: 50,
              borderWidth: 2,
              borderColor: '#f58084',
              borderRadius: 50,
            }}
          />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ color: '#345c74', fontFamily: 'Bold', fontSize: 18 }}>Mikolaj Galezioski</Text>
            <Text style={{ color: '#f58084', fontFamily: 'Medium', fontSize: 12 }}>
              Author, UI/UX Designer
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff2f2',
              width: 40,
              height: 40,
              borderRadius: 40,
            }}
          >
            <Image source={require('../images/a2.png')} />
          </View>
        </View>

        <View>
          {lessonList.map((lesson, index) => (
            <Chapters
              key={index}
              num={index + 1}
              color="#FADA5E"
              percent={lesson.progress}
              duration={lesson.duration}
              title={lesson.LessonName}
              onPress={() => navigation.navigate('VideoPage', { lessonID: lesson.LessonID })}            />
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 5,
            backgroundColor: '#FADA5E',
            marginHorizontal: 20,
            paddingVertical: 15,
            alignItems: 'center',
            borderRadius: 10,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'black', fontFamily: 'Bold', fontSize: 13, marginRight: 50 }}>Resume last lesson</Text>
          <Image source={require('../images/a2.png')} />
        </View>
      </Modalize>
    </ImageBackground>
  );
};

export default Xd;
