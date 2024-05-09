import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Image,
  ImageBackground
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const randomArrFunction = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const gameCardsFunction = () => {
  const animalPairs = [
    { image: require("../../../mobile/assets/dog.png"), word: "Dog" },
    { image: require("../../../mobile/assets/cat.png"), word: "Cat" },
    { image: require("../../../mobile/assets/fish.png"), word: "Fish" },
    { image: require("../../../mobile/assets/bird.png"), word: "Bird" },
    { image: require("../../../mobile/assets/turtle.png"), word: "Turtle" },
    { image: require("../../../mobile/assets/rabbit.png"), word: "Rabbit" },
  ];
  const shuffledPairs = randomArrFunction([...animalPairs, ...animalPairs]); // Duplicates for matching pairs
  return shuffledPairs.map((pair, index) => ({
    id: index,
    image: pair.image,
    word: pair.word,
    isFlipped: false,
  }));
};

const MemoryPairGame = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState(gameCardsFunction());
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [winMessage, setWinMessage] = useState(new Animated.Value(0));
  const [gameWon, setGameWon] = useState(false);

  const cardClickFunction = (card) => {
    if (!gameWon && selectedCards.length < 2 && !card.isFlipped) {
      const updatedSelectedCards = [...selectedCards, card];
      const updatedCards = cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      );
      setSelectedCards(updatedSelectedCards);
      setCards(updatedCards);
      if (updatedSelectedCards.length === 2) {
        if (updatedSelectedCards[0].word === updatedSelectedCards[1].word) {
          setMatches(matches + 1);
          setSelectedCards([]);
          if (matches + 1 === cards.length / 2) {
            winGame();
            setGameWon(true);
          }
        } else {
          setTimeout(() => {
            const flippedCards = updatedCards.map((c) =>
              updatedSelectedCards.some((s) => s.id === c.id)
                ? { ...c, isFlipped: false }
                : c
            );
            setSelectedCards([]);
            setCards(flippedCards);
          }, 1000);
        }
      }
    }
  };

  const winGame = () => {
    Animated.timing(winMessage, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (matches === cards.length / 2) {
      winGame();
      setGameWon(true);
    }
  }, [matches]);

  const msg = `Matches: ${matches} / ${cards.length / 2}`;

  return (
    <ImageBackground
      source={require("../images/1.png")}
      style={{ width: "100%", height: "100%" }}
    >
    <View style={styles.container}>
      <Text style={styles.header1}>ENGLISH</Text>
      <Text style={styles.header2}>Try to focus and learn. Have fun!</Text>
      <Text style={styles.matchText}>{msg}</Text>
      {gameWon ? (
        <View style={styles.winMessage}>
          <View style={styles.winMessageContent}>
            <Text style={styles.winText}>Congratulations!</Text>
            <Text style={styles.winText}>You Won!</Text>
          </View>
          <Button title="Restart" onPress={() => navigation.navigate("Home")} />
        </View>
      ) : (
        <View style={styles.grid}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.id}
              style={[styles.card, card.isFlipped && styles.cardFlipped]}
              onPress={() => cardClickFunction(card)}
              accessible={true}
              accessibilityLabel={card.word}
            >
              {card.isFlipped ? (
                <>
                  <Image source={card.image} style={styles.cardImage} />
                  <Text style={styles.cardText}>{card.word}</Text>
                </>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  header1: {
    fontSize: 50,
    marginBottom: 10,
    color: "black",
    fontFamily: "customFont",
  },
  header2: {
    fontSize: 18,
    marginBottom: 20,
    color: "black",
    fontFamily: "coolvetica",
  },
  matchText: {
    fontSize: 18,
    color: "black",
    fontFamily: "coolvetica",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: 80,
    height: 120,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFD700",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "black",
  },
  cardFlipped: {
    backgroundColor: "white",
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    color: "black",
  },
  winMessage: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  winMessageContent: {
    backgroundColor: "rgba(255, 215, 0, 0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  winText: {
    fontSize: 36,
    color: "white",
  },
});

export default MemoryPairGame;
