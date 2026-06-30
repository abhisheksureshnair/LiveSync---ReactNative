import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import LandingStack from './LandingStack';
import LoaderScreen from '../screens/LoaderScreen/LoaderScreen';
import { AppContext } from '../context/AppContext';

const Stack = createNativeStackNavigator();

// Interceptor screens & utilities
import { useInternetStatus } from '../utils/useInternetStatus';
import api from '../services/APIHandler';
import { CURRENT_VERSION, APP_NAME, TEST_MODE } from '../services/Config';
import NoInternetScreen from '../screens/NoInternetScreen/NoInternetScreen';
import MajorUpdateScreen from '../screens/MajorUpdateScreen/MajorUpdateScreen';

// Helper to compare semantic versions (e.g. 1.2.0 vs 1.0.0)
const isNewerVersion = (latest, current) => {
  if (!latest || !current) return false;
  const parse = (v) => v.toString().split('.').map(Number);
  const [lMajor, lMinor = 0, lPatch = 0] = parse(latest);
  const [cMajor, cMinor = 0, cPatch = 0] = parse(current);

  if (lMajor > cMajor) return true;
  if (lMajor === cMajor && lMinor > cMinor) return true;
  if (lMajor === cMajor && lMinor === cMinor && lPatch > cPatch) return true;
  return false;
};

// Helper to identify force update vs optional update
const isForceUpdate = (latest, current, isForceFromServer) => {
  if (isForceFromServer) return true;
  if (!latest || !current) return false;
  const parse = (v) => v.toString().split('.').map(Number);
  const [lMajor] = parse(latest);
  const [cMajor] = parse(current);
  // Major version increments always force an update
  return lMajor > cMajor;
};

const AppNav = () => {
  const { theme, colors, setMinorUpdate, isUserLoggedIn } = useContext(AppContext);
  const { isConnected } = useInternetStatus();
  const [isLoading, setIsLoading] = useState(true);

  const [updateInfo, setUpdateInfo] = useState({
    checked: false,
    hasUpdate: false,
    type: null,
    latestVersion: '',
    url: '',
  });

  const navTheme = {
    ...(theme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.cardBackground,
      text: colors.textPrimary,
      border: colors.border,
      primary: colors.primary,
    },
  };

  // Run update checks once internet is established
  useEffect(() => {
    if (isConnected && !updateInfo.checked) {
      // API check is disabled for now.
      setUpdateInfo(prev => ({ ...prev, checked: true }));

      /*
      api.post('/api/update/check', { appName: APP_NAME })
        .then((res) => {
          console.log('Update API check response:', res);
          // Standard check to handle both raw objects or wrapped data fields
          const body = res?.data || res;
          if (body && body.latestVersion) {
            const latest = body.latestVersion;
            const forceServer = body.isForceUpdate || body.forceUpdate || body.mandatory || false;
            const updateUrl = body.url || body.updateUrl || '';

            if (isNewerVersion(latest, CURRENT_VERSION)) {
              setUpdateInfo({
                checked: true,
                hasUpdate: true,
                type: isForceUpdate(latest, CURRENT_VERSION, forceServer) ? 'major' : 'minor',
                latestVersion: latest,
                url: updateUrl,
              });
              return;
            }
          }
          setUpdateInfo(prev => ({ ...prev, checked: true }));
        })
        .catch((err) => {
          console.warn('Update check endpoint failed/unreachable:', err);
          // Set checked to true so we do not spam requests, allowing user to continue normal usage
          setUpdateInfo(prev => ({ ...prev, checked: true }));
        });
      */
    }
  }, [isConnected, updateInfo.checked]);

  // ==================== INTERCEPTORS ====================

  // 1. Developer Test overrides (Config.js)
  // Trigger minor update bottom sheet via context when TEST_MODE is on
  useEffect(() => {
    if (TEST_MODE.minorUpdate) {
      setMinorUpdate({ visible: true, latestVersion: '1.1.0', updateUrl: '' });
    }
  }, []);

  if (TEST_MODE.majorUpdate) {
    return <MajorUpdateScreen updateUrl="" latestVersion="2.0.0" />;
  }

  // 2. Real Connectivity check
  if (!isConnected) {
    return <NoInternetScreen />;
  }

  // 3. Real Update check — major blocks nav, minor shows as bottom sheet
  if (updateInfo.hasUpdate) {
    if (updateInfo.type === 'major') {
      return (
        <MajorUpdateScreen
          updateUrl={updateInfo.url}
          latestVersion={updateInfo.latestVersion}
        />
      );
    }
    if (updateInfo.type === 'minor') {
      setMinorUpdate({ visible: true, latestVersion: updateInfo.latestVersion, updateUrl: updateInfo.url });
    }
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoading ? (
          <Stack.Screen
            name="Loader"
            options={{
              animation: 'fade',
            }}
          >
            {(props) => <LoaderScreen {...props} onFinish={() => setIsLoading(false)} />}
          </Stack.Screen>
        ) : isUserLoggedIn ? (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{
              animation: 'fade',
            }}
          />
        ) : (
          <Stack.Screen
            name="LandingStack"
            component={LandingStack}
            options={{
              animation: 'fade',
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNav;

