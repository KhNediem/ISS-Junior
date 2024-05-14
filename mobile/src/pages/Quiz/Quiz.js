import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal,
  Animated,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import config from '../../config.json';

const Quiz = ({ route }) => {
  const ip = config.ip;
  const navigation = useNavigation();

  const [quizList, setQuizList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    fetchQuizList();
  }, []);

  const fetchQuizList = async () => {
    try {
      const response = await fetch(
        `http://${ip}:3001/quiz/${route.params.lessonID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quiz list");
      }
      const data = await response.json();
      setQuizList(data);
    } catch (error) {
      console.error("Error fetching quiz list:", error);
    }
  };

  const validateAnswer = (selectedOption) => {
    let correct_option = quizList[currentQuestionIndex]["correct_option"];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption === correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex === quizList.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const restartQuiz = () => {
    setShowScoreModal(false);

    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    navigation.navigate("Cources");
  };

  const renderQuestion = () => {
    return (
      <View style={{ marginVertical: 40, alignItems: "center" }}>
        {/* Question Counter */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              opacity: 0.6,
              marginRight: 2,
              fontFamily: "coolvetica",
            }}
          >
            {currentQuestionIndex + 1}
          </Text>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 18,
              opacity: 0.6,
              fontFamily: "coolvetica",
            }}
          >
            / {quizList.length}
          </Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: COLORS.black,
            fontSize: 30,
            textAlign: "center",
            fontFamily: "coolvetica",
            backgroundColor: "#FFFFFF80",
            top: 10,
          }}
        >
          {quizList[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    const currentQuiz = quizList[currentQuestionIndex];
    if (
      !currentQuiz ||
      !currentQuiz.options ||
      typeof currentQuiz.options !== "string"
    ) {
      return null; // Return null if currentQuiz or options is not defined or not a string
    }

    // Split the options string into an array
    const optionsArray = currentQuiz.options.split(",");

    return (
      <View style={styles.buttonContainer}>
        {optionsArray.map((option, index) => {
          const isCorrect = option.trim() === correctOption;
          const isSelected = option.trim() === currentOptionSelected;
          const isWrong = isSelected && !isCorrect; // Check if the selected option is wrong

          return (
            <TouchableOpacity
              key={index} // Use index as key since options might not have unique keys
              onPress={() => validateAnswer(option.trim())} // Ensure the option is trimmed before passing to validateAnswer
              disabled={isOptionsDisabled}
              style={[
                styles.button,
                {
                  borderColor: isCorrect
                    ? COLORS.success
                    : isWrong
                    ? COLORS.error
                    : COLORS.black, // Set border color based on correctness
                  backgroundColor: isSelected
                    ? isCorrect
                      ? COLORS.success + "20"
                      : COLORS.error + "20" // Highlight selected option with appropriate background color
                    : isWrong
                    ? COLORS.error + "20"
                    : COLORS.yellow, // Set background color based on correctness
                },
              ]}
            >
              <Text style={styles.buttonText}>{option.trim()}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <Button
          onPress={handleNext}
          title="Next"
          color={COLORS.white}
          accessibilityLabel="Move to the next question"
          style={{
            marginTop: 22,
            width: "100%",
          }}
        />
      );
    } else {
      return null;
    }
  };

  const progressAnim = progress.interpolate({
    inputRange: [0, quizList.length > 0 ? quizList.length - 1 : 0], // Ensure inputRange starts from 0
    outputRange: ["0%", "100%"],
  });

  const renderScoreMessage = () => {
    if (score > quizList.length / 2) {
      return (
        <Text>Congratulations! You may now proceed to the next lesson.</Text>
      );
    } else {
      return <Text>Oops! You failed. Please try again.</Text>;
    }
  };

  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 20,
          borderRadius: 20,
          backgroundColor: "#00000020",
        }}
      >
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: COLORS.success,
            },
            {
              width: progressAnim,
            },
          ]}
        ></Animated.View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../../../mobile/src/images/1.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 16,
            position: "relative",
          }}
        >
          {/* ProgressBar */}
          {renderProgressBar()}

          {/* Question */}
          {renderQuestion()}

          {/* Options */}
          {renderOptions()}

          {/* Next Button */}
          {renderNextButton()}

          {/* Score Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showScoreModal}
          >
            <View
            style={{
                backgroundColor: "white",
            }}>
            <ImageBackground
              source={require("../../../../mobile/src/images/1.png")}
              style={{ width: "100%", height: "100%" }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    width: "90%",
                    borderRadius: 20,
                    padding: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {renderScoreMessage()}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      marginVertical: 20,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 30,
                        color:
                          score > quizList.length / 2
                            ? COLORS.success
                            : COLORS.error,
                      }}
                    >
                      {score}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        color: COLORS.black,
                      }}
                    >
                      {" "}
                      / {quizList.length}
                    </Text>
                  </View>
                  {/* Retry Quiz button */}
                  <TouchableOpacity
                    onPress={restartQuiz}
                    style={{
                      backgroundColor: COLORS.white,
                      padding: 20,
                      width: "100%",
                      borderRadius: 20,
                      borderColor: COLORS.black,
                      borderWidth: 3,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: COLORS.black,
                        fontSize: 20,
                        fontFamily: "coolvetica",
                      }}
                    >
                      Continue Home
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
            </View>
          </Modal>

          {/* Background Image */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#FADA5E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 25,
    marginRight: 10,
    fontFamily: "coolvetica",
  },
});
