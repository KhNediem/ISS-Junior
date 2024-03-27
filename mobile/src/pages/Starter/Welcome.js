import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../../../constants/colors'; // Adjust the number of '../' based on your folder structure
import Button from '../../components/Button';

const Welcome = ({ navigation }) => {
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.yellow, COLORS.black]}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>BacLingo</Text>
        </View>

        {/* content  */}

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Let's Get</Text>
          <Text style={styles.subtitle}>Started</Text>

          <View style={styles.description}>
            <Text style={styles.descriptionText}>
              Learn your Bac languages
            </Text>
            <Text style={styles.descriptionText}>
              In a fun and easy way!
            </Text>
          </View>

          <Button
            title="Join Now"
            onPress={() => navigation.navigate('Signup')}
            style={styles.button}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account ?
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
    marginTop: 40,
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: 8,
  },
  contentContainer: {
    paddingHorizontal: 22,
    width: '100%',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 46,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  description: {
    marginVertical: 22,
  },
  descriptionText: {
    fontSize: 16,
    color: COLORS.white,
    marginVertical: 4,
  },
  button: {
    marginTop: 22,
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 16,
    color: COLORS.white,
  },
  loginLink: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});

export default Welcome;
