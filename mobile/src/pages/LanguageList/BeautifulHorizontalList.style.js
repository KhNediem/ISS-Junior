export const _iconContainer = (primaryColor) => ({
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fdfdfd",
    shadowRadius: 8,
    shadowOpacity: 0.35,
    shadowColor: primaryColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  });
  
  export const _unitTextStyle = (primaryColor) => ({
    fontWeight: "700",
    color: primaryColor,
  });
  
  export default {
    container: {
      alignItems: "center",
      justifyContent: "center",
    },
    contentContainerStyle: {
      paddingBottom: 24,
      alignItems: "center",
    },
    contentInsetStyle: {
      right: 24,
    },
    itemContainer: {
      width: 160,
      height: 220,
      paddingTop: 12,
      marginLeft: 12,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 12,
      paddingBottom: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fdfdfd",
      shadowRadius: 8,
      shadowOpacity: 0.1,
      shadowColor: "#757575",
      shadowOffset: {
        width: 0,
        height: 3,
      },
    },
    imageContainer: {
      marginTop: 24,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    textContainer: {
        flex: 1,
        alignItems: "center", // Center horizontally
        justifyContent: "center", // Center vertically
      },
    
    titleTextStyle: {
      color: "#9D9D9D",
      fontWeight: "600",
    },
    valueTextStyle: {
      fontSize: 24,
      fontWeight: "bold",
    },
    unitTextContainer: {
      marginTop: 8,
    },
  };