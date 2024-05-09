import React, { useRef, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Dimensions, Animated, Easing, ImageBackground,TouchableOpacity } from 'react-native';
import { Title } from 'react-native-paper'; // Importing Title component from React Native Paper
import { useNavigation } from '@react-navigation/native';

const LanguageList = () => {

  const navigation = useNavigation(); // Get the navigation object
  const data = [
    { id: 1, language: 'English', flag: require('../../../assets/united-kingdom.png') },
    { id: 2, language: 'Spanish', flag: require('../../../assets/spain.png') },
    { id: 3, language: 'French', flag: require('../../../assets/france.png') },
    { id: 4, language: 'German', flag: require('../../../assets/germany.png') },
    { id: 5, language: 'Italian', flag: require('../../../assets/italy.png') },
    { id: 6, language: 'Japanese', flag: require('../../../assets/japan.png') },
    // Add more languages and flags as needed
  ];

  const itemWidth = 220; // Adjust the width as needed
  const scrollViewRef = useRef();
  const ovalWidth = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(ovalWidth, {
      toValue: 1,
      duration: 1000, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  const scrollToCenter = (index) => {
    const offset = index * itemWidth - (Dimensions.get('window').width - itemWidth) / 2;
    scrollViewRef.current.scrollTo({ x: offset, animated: true });
  };

  const handleFlag = () => {
    // Navigate to the Welcome screen when a flag is clicked
    navigation.navigate('Welcome'); // Change 'Welcome' to the name of your Welcome screen
  };

  const renderItem = (item) => (
    <TouchableOpacity key={item.id} onPress={() => handleFlag()}>
    <View style={styles.itemContainer}>
      <Image source={item.flag} style={styles.flag} />
    </View>
  </TouchableOpacity>
  );

  const ovalWidthInterpolate = ovalWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 2], // Set a value greater than the screen width
  });

  return (
    <View style={styles.screenContainer}>
      <ImageBackground source={require('../../../assets/bgyellow.png')} style={styles.backgroundImage}>
        {/* Changed Text component to Title component from React Native Paper */}
        <Title style={styles.headerText}>Select Your Language</Title>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          contentContainerStyle={styles.container}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={itemWidth}
        >
          {data.map(renderItem)}
        </ScrollView>
      </ImageBackground>
    </View>
  );
  
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    marginTop: "20%",
  },
  
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: -150,
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'sans-serif',
    }),
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: 220,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  flag: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderWidth: 8,
    borderRadius: 200,
    borderColor: 'black',
  },
  oval: {
    backgroundColor: '#FFBF00',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default LanguageList;
