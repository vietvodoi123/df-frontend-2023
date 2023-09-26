import { createContext, useContext, useEffect, useState } from "react";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../function/localStorage";
const MyContext = createContext();

export function useTheme() {
  return useContext(MyContext);
}

const COLORS = {
  light: {
    text: "#343a40",
    bgColor: "#f8f9fa",
    backgroundElm: "white",
    primary: "#e23c5f",
    border: "#adb5bd",
  },
  dark: {
    text: "white",
    bgColor: "#1a1a1a ",
    backgroundElm: "#333333",
    primary: "#e23c5f",
    border: "white",
  },
};

export function ThemeProvider({ children }) {
  const [colorMode, setColorMode] = useState(() => {
    const mode = getFromLocalStorage("color-mode");
    if (mode) {
      return mode;
    } else {
      saveToLocalStorage("color-mode", "light");
      return "light";
    }
  });

  const updateColor = (value) => {
    const root = document.documentElement;

    root.style.setProperty(
      "--bgColor",
      value === "light" ? COLORS.light.bgColor : COLORS.dark.bgColor
    );
    root.style.setProperty(
      "--text",
      value === "light" ? COLORS.light.text : COLORS.dark.text
    );
    root.style.setProperty(
      "--primary",
      value === "light" ? COLORS.light.primary : COLORS.dark.primary
    );
    root.style.setProperty(
      "--border",
      value === "light" ? COLORS.light.border : COLORS.dark.border
    );
    root.style.setProperty(
      "--backgroundElm",
      value === "light" ? COLORS.light.backgroundElm : COLORS.dark.backgroundElm
    );
  };

  const setColor = (value) => {
    setColorMode(value);
    saveToLocalStorage("color-mode", value);
    updateColor(value);
  };
  useEffect(() => {
    updateColor(colorMode);
  }, []);

  const value = {
    colorMode,
    setColor,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
}
