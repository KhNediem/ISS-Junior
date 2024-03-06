import { StyleSheet, Dimensions } from "react-native";
import Color from "../../../assets/Utilites/Color";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Snow,
    paddingTop: Platform.OS === "android" ? 30 : 0,
    margin: 10,
  },
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontFamily: "Nunito_Bold",
    fontSize: 24,
    paddingLeft: 16,
  },
  image: {
    marginStart: 25,
    width: 100,
    height: 150,
  },
  questionCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  heartText: {
    fontSize: 18,
    color: Color.Cardinal,
    margin: 5,
    fontFamily: "Nunito_ExtraBold",
  },

  root: {
    padding: 4,
  },
  container2: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E6E8",
    backgroundColor: "white",
    height: 55 - 8,
  },
  text: {
    fontFamily: "Nunito_Regular",
    fontSize: 19,
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 8,
    borderBottomWidth: 3,
    borderColor: "#E8E6E8",
    top: 4,
  },
});
