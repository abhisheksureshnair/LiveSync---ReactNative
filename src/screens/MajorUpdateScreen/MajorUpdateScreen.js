import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../../context/AppContext';
import { Typography } from '../../theme';
import styles from './styles';
import { CURRENT_VERSION } from '../../services/Config';

const MajorUpdateScreen = ({ updateUrl, latestVersion }) => {
  const { colors } = useContext(AppContext);

  const handleUpdate = () => {
    const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.innspark.traqinnparent';
    const destination = updateUrl || fallbackUrl;

    Linking.openURL(destination).catch(err => {
      console.error("Couldn't open store page", err);
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/image/loginbackground.png')}
      style={styles.background}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={[
          'rgba(6, 13, 31, 0.45)',
          'rgba(10, 31, 68, 0.75)',
          'rgba(6, 13, 31, 0.9)',
        ]}
        locations={[0.0, 0.45, 1.0]}
        style={styles.gradientOverlay}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Mascot Section */}
          <View style={styles.mascotContainer}>
            <View style={styles.speechBubble}>
              <Text style={[Typography.bold, styles.speechText]}>Time for a{'\n'}quick upgrade!</Text>
              <View style={styles.speechBubbleBeak} />
            </View>
            <Image
              source={require('../../assets/image/sync_bot.png')}
              style={styles.botImage}
            />
          </View>

          {/* Title and details */}
          <Text style={[Typography.bold, styles.title]}>Update Required</Text>
          <Text style={[Typography.regular, styles.description]}>
            A critical update is available. Please update to continue using LiveSync.
          </Text>

          {/* Version badge */}
          <View style={styles.versionBadgeContainer}>
            <Text style={[Typography.medium, styles.versionOld]}>v{CURRENT_VERSION}</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#FFFFFF" style={styles.versionArrow} />
            <Text style={[Typography.bold, styles.versionNew]}>v{latestVersion || '2.0.0'}</Text>
          </View>

          {/* Feature highlights */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <MaterialIcons name="security" size={18} color="#2ECC71" />
              <Text style={[Typography.medium, styles.featureText]}>Critical security protocols update</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="speed" size={18} color="#54A5FF" />
              <Text style={[Typography.medium, styles.featureText]}>Optimized live GPS tracking rendering</Text>
            </View>
            <View style={styles.featureItem}>
              <MaterialIcons name="bug-report" size={18} color="#C084FC" />
              <Text style={[Typography.medium, styles.featureText]}>Stability patches &amp; bug fixes</Text>
            </View>
          </View>
        </View>

        {/* Update Now button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleUpdate}
          >
            <LinearGradient
              colors={['#1788FF', '#1788FF']}
              style={styles.buttonGradient}
            >
              <MaterialIcons name="system-update" size={24} color="#FFFFFF" style={{ marginRight: 10 }} />
              <Text style={[Typography.bold, styles.buttonText]}>Update Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default MajorUpdateScreen;
