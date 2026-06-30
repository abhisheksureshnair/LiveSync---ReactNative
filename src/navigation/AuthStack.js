import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import LiveScreen from '../screens/LiveScreen/LiveScreen';
import SyncAssistScreen from '../screens/SyncAssistScreen/SyncAssistScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import NotificationScreen from '../screens/NotificationScreen/NotificationScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import ReportScreen from '../screens/ReportScreen/ReportScreen';
import ControlScreen from '../screens/ControlScreen/ControlScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Dashboard"
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen name="Live" component={LiveScreen}
        options={{
          animation: 'flip',
        }}
      />
      <Stack.Screen name="SyncAssist" component={SyncAssistScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />
      <Stack.Screen name="Notification" component={NotificationScreen}
        options={{
          animation: 'flip',
        }}
      />
      <Stack.Screen name="History" component={HistoryScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="Report" component={ReportScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen name="Control" component={ControlScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

