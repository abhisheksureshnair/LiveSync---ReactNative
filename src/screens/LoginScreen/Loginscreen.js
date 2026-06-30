import React, { useEffect, useRef, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';
import LogoFullWhite from '../../components/LogoFullWhite';
import { storage } from '../../utils/storage';

const { width, height } = Dimensions.get('window');

const Loginscreen = () => {
  const navigation = useNavigation();
  const { colors, setIsUserLoggedIn } = useContext(AppContext);
  const styles = getStyles(colors);

  const [phonenumber, setPhonenumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const isOtpFilled = otp.every(item => item !== '');
  const inputRefs = useRef([]);
  const phoneInputRef = useRef(null);

  // Animation hooks
  const mergeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;
  const rippleScale = useRef(new Animated.Value(1)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;
  const cardScale = useRef(new Animated.Value(1)).current;
  const cardOpacity = useRef(new Animated.Value(1)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const borderCheckAnim = useRef(new Animated.Value(0)).current;

  const [merged, setMerged] = useState(false);
  const [success, setSuccess] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [layoutWidth, setLayoutWidth] = useState(0);

  const onLayoutRow = event => {
    const { width: w } = event.nativeEvent.layout;
    setLayoutWidth(w);
  };

  const boxSize = width * 0.16;
  const cardPadding = 56;               // padding 28 on both sides
  const baseRadius = 16;                // border radius 16 for OTP boxes
  const circleRadius = boxSize / 2;     // 28 for 56

  const getTargets = () => {
    const w = layoutWidth || width * 0.9 - cardPadding;
    const gap = (w - boxSize * 4) / 3;
    return [
      w / 2 - boxSize / 2,
      w / 2 - (boxSize * 1.5 + gap),
      w / 2 - (boxSize * 2.5 + 2 * gap),
      w / 2 - (boxSize * 3.5 + 3 * gap),
    ];
  };

  const getTranslateX = index => {
    const targets = getTargets();
    return mergeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, targets[index]],
    });
  };

  const boxOpacity = index => {
    if (index === 0) return 1;
    return mergeAnim.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
    });
  };

  const getBoxBgColor = () => {
    if (success === true) {
      return mergeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.06)', colors.success],
      });
    } else if (success === false) {
      return mergeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.06)', colors.error],
      });
    }
    return 'rgba(255, 255, 255, 0.06)';
  };

  const getBoxBorderColor = () => {
    if (success === true) {
      return mergeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.15)', colors.success],
      });
    } else if (success === false) {
      return mergeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 0.15)', colors.error],
      });
    }
    return 'rgba(255, 255, 255, 0.15)';
  };

  const boxBorderRadius = index => {
    if (index !== 0) return baseRadius;
    return mergeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [baseRadius, circleRadius],
    });
  };

  const inputOpacity = mergeAnim.interpolate({
    inputRange: [0, 0.5],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const resultOpacity = mergeAnim.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    if (showOTP) {
      const timer = setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showOTP]);

  const OtpRequest = () => {
    setShowOTP(true);
  };

  const VerifyOTP = () => {
    const final = otp.join('');

    if (final.length !== 4) {
      alert('Enter OTP');
      return;
    }

    const isCorrect = phonenumber === '1234567890' && final === '1234';
    setMerged(true);
    setSuccess(isCorrect);
    if (isCorrect) {
      storage.set('user', true);
    }

    // Reset and run border check and merge animation in parallel (very fast)
    borderCheckAnim.setValue(0);
    Animated.parallel([
      Animated.timing(borderCheckAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }),
      Animated.timing(mergeAnim, {
        toValue: 1,
        duration: 250,
        easing: Easing.bezier(0.25, 1, 0.5, 1),
        useNativeDriver: false,
      })
    ]).start(() => {
      if (isCorrect) {
        checkmarkScale.setValue(0);
        rippleScale.setValue(1);
        rippleOpacity.setValue(0.8);

        // Run success tick and ripple (fast)
        Animated.parallel([
          Animated.spring(checkmarkScale, {
            toValue: 1,
            tension: 80,
            friction: 5,
            useNativeDriver: true,
          }),
          Animated.timing(rippleScale, {
            toValue: 1.8,
            duration: 350,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(contentOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Immediately fade card out and navigate (no setTimeout delay)
          Animated.parallel([
            Animated.timing(cardScale, {
              toValue: 0.95,
              duration: 200,
              easing: Easing.bezier(0.25, 1, 0.5, 1),
              useNativeDriver: true,
            }),
            Animated.timing(cardOpacity, {
              toValue: 0,
              duration: 200,
              easing: Easing.bezier(0.25, 1, 0.5, 1),
              useNativeDriver: true,
            }),
          ]).start(() => {
            setIsUserLoggedIn(true);
          });
        });
      } else {
        // Run failure animation (shake card)
        checkmarkScale.setValue(0);
        rippleScale.setValue(1);
        rippleOpacity.setValue(0.8);

        Animated.parallel([
          Animated.spring(checkmarkScale, {
            toValue: 1,
            tension: 50,
            friction: 4,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
            Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
          ])
        ]).start(() => {
          setTimeout(() => {
            Animated.parallel([
              Animated.timing(mergeAnim, {
                toValue: 0,
                duration: 350,
                easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
                useNativeDriver: false,
              }),
              Animated.timing(borderCheckAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
              })
            ]).start(() => {
              setMerged(false);
              setSuccess(null);
              setOtp(['', '', '', '']);
              inputRefs.current[0]?.focus();
            });
          }, 400);
        });
      }
    });
  };

  // Button Animation values
  const buttonAnim = useRef(new Animated.Value(0)).current;

  const buttonColor = buttonAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.primary, colors.success],
  });

  return (
    <ImageBackground
      source={require('../../assets/image/loginbackground.png')}
      style={{
        flex: 1,
      }}
    >
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
      <SafeAreaView style={[styles.safe, { width: '100%', justifyContent: 'center' }]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%', alignItems: 'center' }}
        >
            <View style={styles.logo}>
              <LogoFullWhite
                width={width * 0.9}
                height={height * 0.09}
              />
              <Text style={[Typography.regular, styles.logoSubtitle]}>
                Safe & Reliable Real-Time Tracking
              </Text>
            </View>

            <Animated.View
              style={[
                styles.card,
                {
                  opacity: cardOpacity,
                  transform: [{ scale: cardScale }],
                },
              ]}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <LinearGradient
                  colors={['#1565C0', '#1E88E5']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.headerIconContainer}
                >
                  <MaterialIcons name="lock-open" size={22} color="#FFF" />
                </LinearGradient>
                <View style={styles.headerTextContainer}>
                  <Text style={[Typography.bold, styles.headerTitle]}>
                    Welcome Back!
                  </Text>
                  <Text style={[Typography.regular, styles.headerSubtitle]}>
                    Sign in to continue
                  </Text>
                </View>
              </View>

              {/* Mobile Number Label */}
              <Animated.View style={{ opacity: contentOpacity }}>
                <Text style={[Typography.medium, styles.inputLabel]}>
                  Mobile Number
                </Text>
              </Animated.View>

              <Animated.View
                style={[
                  styles.inputContainer,
                  focusedIndex === 99 && styles.inputFocused,
                  { opacity: contentOpacity },
                ]}
              >
                <MaterialIcons
                  name="smartphone"
                  size={20}
                  color="rgba(255, 255, 255, 0.6)"
                  style={{ marginRight: 10 }}
                />
                <TextInput
                  ref={phoneInputRef}
                  value={phonenumber}
                  maxLength={10}
                  keyboardType="number-pad"
                  placeholder="Enter 10-digit number"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  onChangeText={text => setPhonenumber(text.replace(/[^0-9]/g, ''))}
                  onFocus={() => setFocusedIndex(99)}
                  onBlur={() => setFocusedIndex(-1)}
                  style={[Typography.medium, styles.input, { color: '#FFFFFF' }]}
                  editable={!showOTP}
                />
                {showOTP && (
                  <TouchableOpacity
                    onPress={() => {
                      setShowOTP(false);
                      setOtp(['', '', '', '']);
                      setTimeout(() => {
                        phoneInputRef.current?.focus();
                      }, 100);
                    }}
                    style={{ padding: 6 }}
                  >
                    <MaterialIcons name="edit" size={20} color="#1E88E5" />
                  </TouchableOpacity>
                )}
              </Animated.View>

              {showOTP ? (
                <>
                  {/* Divider with badge */}
                  <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }, { opacity: contentOpacity }]}>
                    <View style={{ flex: 1, height: 1.5, backgroundColor: colors.border }} />
                    <View style={{
                      paddingHorizontal: 12,
                      paddingVertical: 4,
                      backgroundColor: colors.primaryLight,
                      borderRadius: 8,
                      marginHorizontal: 12,
                    }}>
                      <Text style={[Typography.medium, { fontSize: width * 0.028, color: colors.primary }]}>
                        OTP Sent
                      </Text>
                    </View>
                    <View style={{ flex: 1, height: 1.5, backgroundColor: colors.border }} />
                  </Animated.View>

                  {/* Enter OTP Label */}
                  <Animated.View style={{ opacity: contentOpacity }}>
                    <Text style={[Typography.medium, styles.inputLabel]}>
                      Enter 4-digit OTP
                    </Text>
                  </Animated.View>

                  <Animated.View
                    onLayout={onLayoutRow}
                    style={[
                      styles.otpRow,
                      {
                        transform: [
                          {
                            translateX: shakeAnim,
                          },
                        ],
                      },
                    ]}
                  >
                    {otp.map((item, index) => {
                      const translateX = getTranslateX(index);
                      const opacity = boxOpacity(index);
                      const isFocused = focusedIndex === index;

                      const backgroundColor = isFocused ? 'rgba(255, 255, 255, 0.12)' : getBoxBgColor();
                      const borderColor = isFocused ? '#1E88E5' : getBoxBorderColor();
                      const borderRadius = boxBorderRadius(index);

                      return (
                        <Animated.View
                          key={index}
                          style={[
                            styles.otpBox,
                            {
                              backgroundColor,
                              borderColor,
                              opacity,
                              borderRadius,
                              transform: [{ translateX }],
                            },
                          ]}
                        >
                          {/* Border Light Overlay */}
                          {success !== null && (
                            <Animated.View
                              pointerEvents="none"
                              style={{
                                position: 'absolute',
                                left: -1.5,
                                right: -1.5,
                                bottom: -1.5,
                                height: borderCheckAnim.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, boxSize + 3],
                                }),
                                transform: [
                                  {
                                    scaleX: borderCheckAnim.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [0, 1],
                                    }),
                                  },
                                ],
                                borderWidth: 2,
                                borderColor: success ? colors.success : colors.error,
                                borderRadius: baseRadius,
                                backgroundColor: colors.transparent,
                              }}
                            />
                          )}
                          <Animated.View
                            style={{
                              opacity: inputOpacity,
                              width: '100%',
                              height: '100%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <TextInput
                              ref={r => (inputRefs.current[index] = r)}
                              value={item}
                              maxLength={1}
                              keyboardType="number-pad"
                              editable={!merged}
                              style={[Typography.bold, styles.otpInput]}
                              onFocus={() => setFocusedIndex(index)}
                              onBlur={() => setFocusedIndex(-1)}
                              onChangeText={text => {
                                const value = text.replace(/[^0-9]/g, '');
                                const updated = [...otp];
                                updated[index] = value;
                                setOtp(updated);

                                if (value && index < 3) {
                                  inputRefs.current[index + 1]?.focus();
                                }
                              }}
                              onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Backspace') {
                                  if (otp[index] === '' && index > 0) {
                                    inputRefs.current[index - 1]?.focus();
                                    const updated = [...otp];
                                    updated[index - 1] = '';
                                    setOtp(updated);
                                  }
                                }
                              }}
                              textAlign="center"
                            />
                          </Animated.View>

                          {index === 0 && success !== null && (
                            <>
                              {/* Success/Failure Ripple Ring */}
                              <Animated.View
                                pointerEvents="none"
                                style={{
                                  position: 'absolute',
                                  width: boxSize,
                                  height: boxSize,
                                  borderRadius: circleRadius,
                                  backgroundColor: success ? colors.success : colors.error,
                                  transform: [{ scale: rippleScale }],
                                  opacity: rippleOpacity,
                                }}
                              />
                              {/* Success/Failure Icon */}
                              <Animated.View
                                pointerEvents="none"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  opacity: resultOpacity,
                                  zIndex: 999,
                                }}
                              >
                                <Animated.View
                                  style={{
                                    transform: [{ scale: checkmarkScale }],
                                  }}
                                >
                                  <MaterialIcons
                                    name={success ? 'check' : 'close'}
                                    size={width * 0.07}
                                    color={colors.white}
                                  />
                                </Animated.View>
                              </Animated.View>
                            </>
                          )}
                        </Animated.View>
                      );
                    })}
                  </Animated.View>

                  {/* Invalid OTP Error Message */}
                  {success === false && (
                    <Animated.View style={[{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }, { opacity: contentOpacity }]}>
                      <MaterialIcons
                        name="error-outline"
                        size={16}
                        color={colors.error}
                      />
                      <Text style={[Typography.regular, { color: colors.error, fontSize: width * 0.03, marginLeft: 6 }]}>
                        Invalid OTP. Please try again.
                      </Text>
                    </Animated.View>
                  )}
                </>
              ) : null}

              <Animated.View
                style={{
                  alignSelf: 'center',
                  marginTop: showOTP ? 24 : height * 0.025,
                  opacity: contentOpacity,
                  transform: [
                    {
                      scale: buttonAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.05],
                      }),
                    },
                  ],
                }}
              >
                <TouchableOpacity
                  onPress={showOTP ? VerifyOTP : OtpRequest}
                  activeOpacity={0.8}
                  disabled={merged && success === true}
                >
                  <Animated.View
                    style={[
                      styles.button,
                      {
                        backgroundColor: success === true ? colors.success : colors.transparent,
                        overflow: 'hidden',
                      },
                    ]}
                  >
                    {success === true ? (
                      <View style={[styles.buttonGradient, { backgroundColor: colors.success }]}>
                        <Text style={[Typography.medium, styles.buttonText]}>
                          Opening...
                        </Text>
                      </View>
                    ) : (
                      <LinearGradient
                        colors={['#1565C0', '#1E88E5']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                      >
                        <Text style={[Typography.medium, styles.buttonText]}>
                          {!showOTP
                            ? 'Get OTP'
                            : isOtpFilled
                              ? 'LogIn'
                              : 'Resend OTP'}
                        </Text>
                      </LinearGradient>
                    )}
                  </Animated.View>
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>

            {/* Secure Badge */}
            <Animated.View style={[styles.secureBadge, { opacity: cardOpacity }]}>
              <MaterialIcons name="lock" size={14} color={colors.textMuted} />
              <Text style={[Typography.regular, styles.secureText]}>
                Your data is encrypted & secure
              </Text>
            </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Loginscreen;
