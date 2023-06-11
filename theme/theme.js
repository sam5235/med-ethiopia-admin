// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#258eff",
      100: "#007afc",
      200: "#0067d4",
      300: "#0053ac",
      400: "#004085",
      500: "#03356a",
      600: "#052a50",
      700: "#061e38",
      800: "#051322",
      900: "#02070d",
    },
  },
  initialColorMode: "light",
  useSystemColorMode: false,
});

export default theme;
