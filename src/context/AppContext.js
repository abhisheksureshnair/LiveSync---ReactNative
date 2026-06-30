import React, { createContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, setThemeMode } from '../theme/Colors';
import { storage } from '../utils/storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setThemeState] = useState(() => {
    const initial = systemScheme === 'dark' ? 'dark' : 'light';
    setThemeMode(initial);
    return initial;
  });
  const [accessToken, setAccessToken] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    return storage.getBoolean('user') ?? false;
  });

  // Minor update state — set by AppNav, consumed by DashboardScreen as a bottom sheet
  const [minorUpdate, setMinorUpdate] = useState({
    visible: false,
    minimized: false,
    latestVersion: '',
    updateUrl: '',
  });

  const [parentProfileImage, setParentProfileImage] = useState(null);
  const [alexProfileImage, setAlexProfileImage] = useState(null);
  const [emmaProfileImage, setEmmaProfileImage] = useState(null);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(nextTheme);
    setThemeMode(nextTheme);
  };

  const logout = () => {
    storage.clearAll();
    setIsUserLoggedIn(false);
    setAccessToken('');
    setParentProfileImage(null);
    setAlexProfileImage(null);
    setEmmaProfileImage(null);
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <AppContext.Provider
      value={{
        theme,
        colors,
        toggleTheme,
        accessToken,
        setAccessToken,
        minorUpdate,
        setMinorUpdate,
        parentProfileImage,
        setParentProfileImage,
        alexProfileImage,
        setAlexProfileImage,
        emmaProfileImage,
        setEmmaProfileImage,
        isUserLoggedIn,
        setIsUserLoggedIn,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
