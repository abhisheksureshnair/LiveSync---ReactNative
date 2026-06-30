import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography } from '../../theme';
import LogoFullWhite from '../../components/LogoFullWhite';

const LoaderScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in content and zoom logo
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1700,
      useNativeDriver: false,
    }).start();

    // After 2.0 seconds, fade out and call onFinish
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        onFinish?.();
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [fadeAnim, logoScale, progressAnim, onFinish]);

  return (
    <ImageBackground
      source={require('../../assets/image/loginbackground.png')}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[
          'rgba(6, 13, 31, 0.65)',
          'rgba(10, 31, 68, 0.82)',
          'rgba(6, 13, 31, 0.98)',
        ]}
        locations={[0.0, 0.45, 1.0]}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: fadeAnim,
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: logoScale }],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LogoFullWhite width={250} height={120} />
        </Animated.View>
        
        <Animated.Text
          style={[
            Typography.medium,
            {
              fontSize: 11,
              color: 'rgba(255, 255, 255, 0.8)',
              letterSpacing: 3,
              marginTop: 4,
            }
          ]}
        >
          REAL-TIME FAMILY LOCATOR
        </Animated.Text>

        {/* Custom Premium Progress Bar */}
        <View style={{ marginTop: 50, alignItems: 'center' }}>
          <View
            style={{
              width: 180,
              height: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 2,
              overflow: 'hidden',
              borderWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <Animated.View
              style={{
                height: '100%',
                backgroundColor: Colors.primary,
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                borderRadius: 2,
              }}
            />
          </View>
          
          <Text
            style={[
              Typography.regular,
              {
                fontSize: 10,
                color: 'rgba(255, 255, 255, 0.45)',
                letterSpacing: 2,
                marginTop: 12,
              }
            ]}
          >
            CONNECTING...
          </Text>
        </View>
      </Animated.View>
    </ImageBackground>
  );
};

export default LoaderScreen;

