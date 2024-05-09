import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    white: "#FFFFFF",
    black: "#222222",
    primary: "#007260",
    secondary: "#39B68D",
    grey: "#CCCCCC",
    yellow: "#FADA5E",

    accent: '#3498db',
    
    success: '#00C851',
    error: '#ff4444',
    background: "#252C4A"
}


export const SIZES = {
    base: 10,
    width,
    height
}