import React, { useState, createContext } from 'react';

// use context to pass the props throughout the app
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // theme = light, dark
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    if(theme === 'light') {
      setTheme('dark');
    }
    else {
      setTheme('light');
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      { children }
    </ThemeContext.Provider>
  )
}
