import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';

const initialNotifications = [
  {
    id: 1,
    type: 'location',
    category: 'LOCATION ALERT',
    title: 'Liam Left School Zone',
    message: "Liam has left the Green Valley School safe zone and is heading home.",
    time: '10 mins ago',
    icon: 'directions-walk',
  },
  {
    id: 2,
    type: 'location',
    category: 'LOCATION ALERT',
    title: 'Liam Entered School Zone',
    message: 'Liam has safely arrived at the Green Valley School safe zone.',
    time: '45 mins ago',
    icon: 'place',
  },
  {
    id: 3,
    type: 'status',
    category: 'DEVICE STATUS',
    title: 'Low Battery Alert',
    message: "Sophia's phone battery has dropped below 15%. Real-time tracking might be limited.",
    time: '1 day ago',
    icon: 'battery-alert',
  },
  {
    id: 4,
    type: 'location',
    category: 'LOCATION ALERT',
    title: 'Sophia Entered Home Zone',
    message: 'Sophia has safely entered the Home safe zone.',
    time: '2 days ago',
    icon: 'home',
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { theme, colors } = useContext(AppContext);
  const isDark = theme === 'dark';
  const styles = getStyles(colors, isDark);

  const [notifications, setNotifications] = useState(initialNotifications);

  const handleClearAll = () => {
    setNotifications([]);
  };

  const mainContent = (
    <SafeAreaView style={[styles.safe, isDark && { backgroundColor: 'transparent' }]}>
      <StatusBar
        backgroundColor={isDark ? 'transparent' : colors.cardBackground}
        barStyle={isDark || colors.textPrimary === '#F8FAFC' ? 'light-content' : 'dark-content'}
        translucent={isDark}
      />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <MaterialIcons name="arrow-back" size={24} color={isDark ? '#FFFFFF' : colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[Typography.bold, styles.headerTitle]}>Notifications</Text>
        </View>
        {notifications.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
            <Text style={[Typography.bold, styles.clearText]}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main List */}
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="notifications-none" size={60} color={isDark ? 'rgba(255, 255, 255, 0.4)' : colors.textMuted} />
            <Text style={[Typography.bold, styles.emptyTitle]}>All Caught Up!</Text>
            <Text style={[Typography.medium, styles.emptyDesc]}>
              You have no new notifications. Any location alerts or device status updates will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.notificationList}>
            {notifications.map((item) => (
              <View key={item.id} style={styles.card}>
                <View
                  style={[
                    styles.iconContainer,
                    item.type === 'location' ? styles.badgeTransit : styles.badgeSchool,
                  ]}
                >
                  <MaterialIcons
                    name={item.icon}
                    size={20}
                    color={item.type === 'location' ? colors.primary : colors.purpleAccent}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <View style={styles.cardHeader}>
                    <Text style={[Typography.bold, styles.category]}>{item.category}</Text>
                    <Text style={[Typography.medium, styles.time]}>{item.time}</Text>
                  </View>
                  <Text style={[Typography.bold, styles.title]}>{item.title}</Text>
                  <Text style={[Typography.medium, styles.message]}>{item.message}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );

  if (isDark) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            'rgba(6, 13, 31, 1)',
            'rgba(10, 31, 68, 1)',
            'rgba(6, 13, 31, 1)',
          ]}
          locations={[0.0, 0.4, 1.0]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {mainContent}
      </View>
    );
  }

  return mainContent;
};

export default NotificationScreen;
