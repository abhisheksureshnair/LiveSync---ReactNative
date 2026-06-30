import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../../context/AppContext';
import { Typography } from '../../theme';
import { useInternetStatus } from '../../utils/useInternetStatus';
import styles from './styles';

const NoInternetScreen = () => {
  const { colors } = useContext(AppContext);
  const { checkConnection } = useInternetStatus();
  const [loading, setLoading] = useState(false);

  const handleRetry = async () => {
    if (loading) return;
    setLoading(true);
    // Manually trigger a connection check via the hook
    await checkConnection();
    setLoading(false);
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
              <Text style={[Typography.bold, styles.speechText]}>Oops! We're{'\n'}disconnected.</Text>
              <View style={styles.speechBubbleBeak} />
            </View>
            <Image
              source={require('../../assets/image/sync_bot.png')}
              style={styles.botImage}
            />
          </View>

          {/* Title and details */}
          <Text style={[Typography.bold, styles.title]}>No Internet</Text>
          <Text style={[Typography.regular, styles.description]}>
            Please check your connection or{'\n'}switch to Wi-Fi to continue.
          </Text>
        </View>

        {/* Action button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={handleRetry}
            disabled={loading}
          >
            <LinearGradient
              colors={['#1788FF', '#1788FF']}
              style={styles.buttonGradient}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <MaterialCommunityIcons name="refresh" size={24} color="#FFFFFF" style={{ marginRight: 10 }} />
                  <Text style={[Typography.bold, styles.buttonText]}>Try Again</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NoInternetScreen;
