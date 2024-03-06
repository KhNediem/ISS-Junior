import React, { useState } from 'react'
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, Modal, Animated } from 'react-native'
import { COLORS, SIZES } from '../../../constants/theme';
import data from '../../data/QuizData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from "expo-linear-gradient";
import Button from '../../components/Button';




const Quiz = () => {

    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if (selectedOption === correct_option) {
            // Set Score
            setScore(score + 1);
        }
        // Show Next Button
    
        // Automatically move to the next question after a brief delay
        setTimeout(() => {
            handleNext();
        }, 500); // You can adjust the delay duration as needed
    }
    
    const handleNext = () => {
        if(currentQuestionIndex== allQuestions.length-1){
            // Last Question
            // Show Score Modal
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }
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
            useNativeDriver: false
        }).start();
    }



const renderQuestion = () => {
  return (
    <View style={{ marginVertical: 40, alignItems: 'center' }}>
      {/* Question Counter */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2 }}>
          {currentQuestionIndex + 1}
        </Text>
        <Text style={{ color: COLORS.white, fontSize: 18, opacity: 0.6 }}>/ {allQuestions.length}</Text>
      </View>

      {/* Question */}
      <Text style={{ color: COLORS.white, fontSize: 24, textAlign: 'center', fontFamily: 'sans-serif' }}>
        {allQuestions[currentQuestionIndex]?.question}
      </Text>
    </View>
  );
};

    const renderOptions = () => {
        return (
          <View>
            {allQuestions[currentQuestionIndex]?.options.map(option => (
              <Button
                key={option}
                onPress={() => validateAnswer(option)}
                disabled={isOptionsDisabled}
                title={option}
                color={
                  option === correctOption
                    ? COLORS.success
                    : option === currentOptionSelected
                    ? COLORS.error
                    : COLORS.secondary
                }
                style={{
                  borderWidth: 3,
                  borderColor:
                    option === correctOption
                      ? COLORS.success
                      : option === currentOptionSelected
                      ? COLORS.error
                      : COLORS.black,
                  backgroundColor:
                    option === correctOption
                      ? COLORS.success + '20'
                      : option === currentOptionSelected
                      ? COLORS.error + '20'
                      : COLORS.yellow,
                  height: 60,
                  borderRadius: 20,
                  marginVertical: 10,
                }}
              />
            ))}
          </View>
        );
      };
      
    const renderNextButton = () => {
        if(showNextButton){
            return (
                <Button
          onPress={handleNext}
          title="Next"
          color={COLORS.white}
          accessibilityLabel="Move to the next question"
          style={{
                            marginTop: 22,
                            width: "100%"
                        }}
        />
            )
        }else{
            return null
        }
    }


    const [progress, setProgress] = useState(new Animated.Value(0));
    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%','100%']
    })
    const renderProgressBar = () => {
        return (
            <View style={{
                width: '100%',
                height: 20,
                borderRadius: 20,
                backgroundColor: '#00000020',

            }}>
                <Animated.View style={[{
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: COLORS.success
                },{
                    width: progressAnim
                }]}>

                </Animated.View>

            </View>
        )
    }


    return (
       <SafeAreaView style={{
           flex: 1
       }}>
           <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
           <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.yellow, COLORS.black]}
        >
           <View style={{
               flex: 1,
               paddingVertical: 40,
               paddingHorizontal: 16,
               position:'relative'
           }}>

               {/* ProgressBar */}
               { renderProgressBar() }

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
                   <View style={{
                       flex: 1,
                       backgroundColor: COLORS.primary,
                       alignItems: 'center',
                       justifyContent: 'center'
                   }}>
                       <View style={{
                           backgroundColor: COLORS.white,
                           width: '90%',
                           borderRadius: 20,
                           padding: 20,
                           alignItems: 'center'
                       }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (allQuestions.length/2) ? 'Congratulations!' : 'Oops!' }</Text>

                           <View style={{
                               flexDirection: 'row',
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginVertical: 20
                           }}>
                               <Text style={{
                                   fontSize: 30,
                                   color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error
                               }}>{score}</Text>
                                <Text style={{
                                    fontSize: 20, color: COLORS.black
                                }}>/ { allQuestions.length }</Text>
                           </View>
                           {/* Retry Quiz button */}
                           <TouchableOpacity
                           onPress={restartQuiz}
                           style={{
                               backgroundColor: COLORS.accent,
                               padding: 20, width: '100%', borderRadius: 20
                           }}>
                               <Text style={{
                                   textAlign: 'center', color: COLORS.white, fontSize: 20
                               }}>Retry Quiz</Text>
                           </TouchableOpacity>

                       </View>

                   </View>
               </Modal>

               {/* Background Image */}
               

           </View>
           </LinearGradient>
       </SafeAreaView>
    )
}

export default Quiz