import React, { useEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';
import LogoFullWhite from '../../components/LogoFullWhite';

const { width, height } = Dimensions.get('window');

const LandingScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { colors } = useContext(AppContext);
  const styles = getStyles(colors);

  // Draggable slider calculation
  const cardWidth = width - 56;
  const knobSize = 48;
  const maxDrag = cardWidth - knobSize - 8;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(200)).current; // slide up from bottom (200px)
  const panX = useRef(new Animated.Value(0)).current;

  // Swipe handle pan responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (evt, gestureState) => {
        let newX = gestureState.dx;
        if (newX < 0) newX = 0;
        if (newX > maxDrag) newX = maxDrag;
        panX.setValue(newX);
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx >= maxDrag * 0.7) {
          // Slide to final position and navigate
          Animated.timing(panX, {
            toValue: maxDrag,
            duration: 150,
            useNativeDriver: true,
          }).start(() => {
            navigation.navigate('Login');
            // Reset knob after screen transition
            setTimeout(() => {
              Animated.timing(panX, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
              }).start();
            }, 800);
          });
        } else {
          // Reset slider knob
          Animated.spring(panX, {
            toValue: 0,
            tension: 40,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Text fading out as knob slides
  const textOpacity = panX.interpolate({
    inputRange: [0, maxDrag * 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    // 200ms delay, then animate to match Flutter
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]).start();
    }, 200);

    return () => clearTimeout(timer);
  }, [fadeAnim, slideAnim]);

  return (
    <ImageBackground
      source={require('../../assets/image/loginbackground.png')}
      style={styles.background}
    >
      {/* Cinematic dark gradient overlay for text readability */}
      <LinearGradient
        colors={[
          'rgba(6, 13, 31, 0.55)',
          'rgba(10, 31, 68, 0.78)',
          'rgba(6, 13, 31, 0.97)',
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
      <View style={styles.container}>
        {/* Top Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              top: insets.top > 0 ? insets.top + 16 : 40,
            },
          ]}
        >
          <LogoFullWhite
            width={width * 0.65}
            height={height * 0.09}
            style={styles.logo}
          />
          <Text style={[Typography.medium, styles.logoSubtitle]}>
            REAL-TIME FAMILY LOCATOR
          </Text>
        </Animated.View>

        {/* Bottom Content Card */}
        <Animated.View
          style={[
            styles.contentCard,
            {
              opacity: fadeAnim,
              paddingBottom: insets.bottom + 38,
            },
          ]}
        >
          <Text style={[Typography.bold, styles.title]}>
            Get Started
          </Text>

          <Text style={[Typography.regular, styles.subtitle]}>
            Locate your loved ones and see{'\n'}how near they are.
          </Text>

          {/* Feature chips */}
          <View style={styles.chipsRow}>
            {/* Live Track chip */}
            <View style={styles.chipContainer}>
              <MaterialIcons name="location-on" size={13} color={colors.accent} />
              <Text style={[Typography.medium, styles.chipText]}>Live Track</Text>
            </View>

            {/* Alerts chip */}
            <View style={[styles.chipContainer, { marginLeft: 10 }]}>
              <MaterialIcons name="notifications-active" size={13} color={colors.accent} />
              <Text style={[Typography.medium, styles.chipText]}>Alerts</Text>
            </View>

            {/* Secure chip */}
            <View style={[styles.chipContainer, { marginLeft: 10 }]}>
              <MaterialIcons name="shield" size={13} color={colors.accent} />
              <Text style={[Typography.medium, styles.chipText]}>Secure</Text>
            </View>
          </View>

          {/* Swipe to Start Button */}
          <View style={styles.swipeTrack}>
            <Animated.Text style={[Typography.bold, styles.swipeText, { opacity: textOpacity }]}>
              Swipe to start
            </Animated.Text>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.swipeHandle,
                {
                  transform: [{ translateX: panX }],
                },
              ]}
            >
              <LinearGradient
                colors={['#1565C0', '#1E88E5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
              </LinearGradient>
            </Animated.View>
          </View>

          {/* Legal Links */}
          <View style={styles.legalContainer}>
            <Text style={[Typography.regular, styles.legalText]}>
              By continuing you accept our{' '}
            </Text>
            <TouchableOpacity onPress={() => alert('Terms of Service clicked')}>
              <Text style={[Typography.medium, styles.legalLink]}>
                Terms of Service
              </Text>
            </TouchableOpacity>
            <Text style={[Typography.regular, styles.legalText]}>
              {' '}&{' '}
            </Text>
            <TouchableOpacity onPress={() => alert('Privacy Policy clicked')}>
              <Text style={[Typography.medium, styles.legalLink]}>
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default LandingScreen;
