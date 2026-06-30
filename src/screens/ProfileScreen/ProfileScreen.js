import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {
    theme,
    colors,
    toggleTheme,
    parentProfileImage,
    setParentProfileImage,
    alexProfileImage,
    setAlexProfileImage,
    emmaProfileImage,
    setEmmaProfileImage,
    logout,
  } = useContext(AppContext);
  const isDark = theme === 'dark';
  const styles = getStyles(colors, isDark);

  // Settings states
  const [pushEnabled, setPushEnabled] = useState(true);

  const handleToggleStopAlert = (value) => {
    if (value) {
      Alert.alert(
        'Feature Unavailable',
        'This feature is not available, hope it will be active soon.',
        [{ text: 'OK' }]
      );
    }
  };

  const handlePickImage = (type) => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImg = response.assets[0].uri;
        if (selectedImg) {
          if (type === 'parent') {
            setParentProfileImage(selectedImg);
          } else if (type === 'alex') {
            setAlexProfileImage(selectedImg);
          } else if (type === 'emma') {
            setEmmaProfileImage(selectedImg);
          }
        }
      }
    });
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ],
      { cancelable: true }
    );
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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-back" size={24} color={isDark ? '#FFFFFF' : colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[Typography.bold, styles.headerTitle]}>Profile</Text>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => handlePickImage('parent')}
            activeOpacity={0.8}
          >
            <Image
              source={
                parentProfileImage
                  ? { uri: parentProfileImage }
                  : require('../../assets/image/parent_avatar.png')
              }
              style={styles.avatar}
            />
            <View style={styles.editBadge}>
              <MaterialIcons name="photo-camera" size={14} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={[Typography.bold, styles.name]}>Robert Carter</Text>
          <Text style={[Typography.medium, styles.email]}>robert.carter@example.com</Text>
          <Text style={[Typography.medium, styles.phone]}>+91 98765 43210</Text>
        </View>

        {/* Linked Children Section */}
        <View style={styles.section}>
          <Text style={[Typography.bold, styles.sectionTitle]}>Linked Family Members</Text>
          <View style={styles.childrenContainer}>
            {/* Alex */}
            <View style={styles.childCard}>
              <TouchableOpacity
                style={styles.childAvatarContainer}
                onPress={() => handlePickImage('alex')}
                activeOpacity={0.8}
              >
                <Image
                  source={
                    alexProfileImage
                      ? { uri: alexProfileImage }
                      : require('../../assets/image/boy_avatar.png')
                  }
                  style={styles.childAvatar}
                />
                <View style={styles.childEditBadge}>
                  <MaterialIcons name="photo-camera" size={8} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
              <Text style={[Typography.bold, styles.childName]}>Liam Carter</Text>
              <Text style={[Typography.medium, styles.childGrade]}>Grade 4-B</Text>
            </View>

            {/* Emma */}
            <View style={styles.childCard}>
              <TouchableOpacity
                style={styles.childAvatarContainer}
                onPress={() => handlePickImage('emma')}
                activeOpacity={0.8}
              >
                <Image
                  source={
                    emmaProfileImage
                      ? { uri: emmaProfileImage }
                      : require('../../assets/image/girl_avatar.png')
                  }
                  style={styles.childAvatar}
                />
                <View style={styles.childEditBadge}>
                  <MaterialIcons name="photo-camera" size={8} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
              <Text style={[Typography.bold, styles.childName]}>Sophia Carter</Text>
              <Text style={[Typography.medium, styles.childGrade]}>Grade 1-A</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={[Typography.bold, styles.sectionTitle]}>App Settings</Text>
          <View style={styles.settingsCard}>
            {/* Setting Row 1 */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={[Typography.bold, styles.settingText]}>Push Notifications</Text>
                <Text style={[Typography.medium, styles.settingDesc]}>
                  Receive real-time location updates and alerts
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={pushEnabled ? colors.white : '#f4f3f4'}
                onValueChange={setPushEnabled}
                value={pushEnabled}
              />
            </View>

            {/* Setting Row 2 */}
            <View style={styles.settingRow}>
              <View style={styles.settingLeft}>
                <Text style={[Typography.bold, styles.settingText]}>Proximity Alerts</Text>
                <Text style={[Typography.medium, styles.settingDesc]}>
                  Alert when your child is within 500 meters of your location
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor="#f4f3f4"
                onValueChange={handleToggleStopAlert}
                value={false}
              />
            </View>

            {/* Setting Row 3 - Theme Toggle */}
            <View style={styles.settingRowLast}>
              <View style={styles.settingLeft}>
                <Text style={[Typography.bold, styles.settingText]}>Dark Theme</Text>
                <Text style={[Typography.medium, styles.settingDesc]}>
                  Switch between light and dark themes
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#767577', true: colors.primary }}
                thumbColor={theme === 'dark' ? colors.white : '#f4f3f4'}
                onValueChange={toggleTheme}
                value={theme === 'dark'}
              />
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <MaterialIcons name="logout" size={20} color={colors.errorDark} />
          <Text style={[Typography.bold, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
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

export default ProfileScreen;
