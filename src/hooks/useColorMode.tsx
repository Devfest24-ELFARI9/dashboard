import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-theme", "light");

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    // Add or remove the dark class
    colorMode === "dark" ? bodyClass.add(className) : bodyClass.remove(className);
    
    // Set the background color of the body based on color mode
    document.body.style.backgroundColor = colorMode === "dark" ? "#1a232c" : "#ffffff"; // Change colors as needed
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
