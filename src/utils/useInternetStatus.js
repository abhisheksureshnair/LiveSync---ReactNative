import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

/**
 * Custom hook to monitor internet connectivity using @react-native-community/netinfo.
 */
export const useInternetStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  const verifyConnection = async () => {
    setIsChecking(true);
    const state = await NetInfo.fetch();
    // Use isConnected. isInternetReachable can sometimes get stuck on false in simulators.
    const connected = !!state.isConnected;
    setIsConnected(connected);
    setIsChecking(false);
    return connected;
  };

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = !!state.isConnected;
      setIsConnected(connected);
    });

    // Check immediately on mount
    verifyConnection();

    return () => {
      unsubscribe();
    };
  }, []);

  return { isConnected, isChecking, checkConnection: verifyConnection };
};
