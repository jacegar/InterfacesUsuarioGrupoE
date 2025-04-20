import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize theme state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode === 'true';
  });
  
  const [readingMode, setReadingMode] = useState(() => {
    const savedReadingMode = localStorage.getItem('readingMode');
    return savedReadingMode === 'true';
  });

  // Update localStorage and apply theme when darkMode or readingMode changes
  useEffect(() => {
    // Save current mode preferences to localStorage
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('readingMode', readingMode);
    
    // Apply the theme to the document body
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
    if (readingMode) setReadingMode(false); // Disable reading mode when dark mode is enabled
  };
  
  const toggleReadingMode = () => {
    setReadingMode(!readingMode);
    if (darkMode) setDarkMode(false); // Disable dark mode when reading mode is enabled
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, readingMode, toggleReadingMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
