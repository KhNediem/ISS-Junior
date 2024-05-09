import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text, SafeAreaView } from "react-native";
import { Button, ButtonContainer } from "../components/Button";
import { Alert } from "../components/Alert";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#36B1F0",
        flex: 1,
        paddingHorizontal: 20
    },
    text: {
        color: "#fff",
        fontSize: 25,
        textAlign: "center",
        letterSpacing: -0.02,
        fontWeight: "600"
    },
    safearea: {
        flex: 1,
        marginTop: 100,
        justifyContent: "space-between"
    }
});

const Quiz = ({ navigation }) => {
    const questions = navigation.getParam("questions", []);
    const [correctCount, setCorrectCount] = useState(0);
    const [totalCount] = useState(questions.length);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [answerCorrect, setAnswerCorrect] = useState(false);

    const answer = (correct) => {
        setAnswered(true);

        if (correct) {
            setCorrectCount(correctCount + 1);
            setAnswerCorrect(true);
        } else {
            setAnswerCorrect(false);
        }

        setTimeout(() => nextQuestion(), 750);
    };

    const nextQuestion = () => {
        const nextIndex = activeQuestionIndex + 1;

        if (nextIndex >= totalCount) {
            navigation.popToTop();
        } else {
            setActiveQuestionIndex(nextIndex);
            setAnswered(false);
        }
    };

    const question = questions[activeQuestionIndex];

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: navigation.getParam("color") }
            ]}
        >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safearea}>
                <View>
                    <Text style={styles.text}>{question.question}</Text>

                    <ButtonContainer>
                        {question.answers.map((answer) => (
                            <Button
                                key={answer.id}
                                text={answer.text}
                                onPress={() => answer(answer.correct)}
                            />
                        ))}
                    </ButtonContainer>
                </View>

                <Text style={styles.text}>
                    {`${correctCount}/${totalCount}`}
                </Text>
            </SafeAreaView>
            <Alert correct={answerCorrect} visible={answered} />
        </View>
    );
};

export default Quiz;
