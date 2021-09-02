import { extendTheme, ITheme } from "native-base";
import { palette } from "./palette";

export const theme: ITheme = extendTheme({
    colors: {
        primary: {
            50: "#8598db",
            100: "#6d83d3",
            200: "#546fcc",
            300: "#3c5ac5",
            400: "#2346bd",
            500: "#0b31b6",
            600: "#0a2ca4",
            700: "#092792",
            800: "#08227f",
            900: "#071d6d"
        }
    }
})