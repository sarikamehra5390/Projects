
import { useEffect, useState } from "react";
import "./App.css";
import { ThemeProvider } from "./contexts/Theme";
import ThemeBtn from "./components/ThemeBtn";
import Card from "./components/Card";

function App() {
  const [themeMode, setThemeMode] = useState("light")
 

 const lightTheme = () => {
  console.log("Light clicked");
  setThemeMode("light");
};

const darkTheme = () => {
  console.log("Dark clicked");
  setThemeMode("dark");
};

  //actual change in the theme 

  useEffect(() => {
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(themeMode);

  console.log(document.documentElement.className);
}, [themeMode]);

console.log("Current Theme:", themeMode);

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
    <div className="flex flex-wrap min-h-screen items-center">
      <div className="w-full">
        <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
          <ThemeBtn />
        </div>

        <div className="w-full max-w-sm mx-auto">
           <Card />
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
