import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true';
  });
  
  const [readingMode, setReadingMode] = useState(() => {
    const savedReadingMode = localStorage.getItem('readingMode');
    return savedReadingMode === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('readingMode', readingMode);
    
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('reading-mode');
    } else if (readingMode) {
      document.body.classList.add('reading-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.remove('reading-mode');
    }
  }, [darkMode, readingMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (readingMode) setReadingMode(false);
  };
  
  const toggleReadingMode = () => {
    setReadingMode(!readingMode);
    if (darkMode) setDarkMode(false);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, readingMode, toggleReadingMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
