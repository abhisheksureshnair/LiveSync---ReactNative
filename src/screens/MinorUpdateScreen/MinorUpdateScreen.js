import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Vibration,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AppContext } from '../../context/AppContext';
import { Typography } from '../../theme';
import { CURRENT_VERSION } from '../../services/Config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive header positions matching DashboardScreen header styles
const bellRight = SCREEN_WIDTH * 0.04;
const bellWidth = SCREEN_WIDTH * 0.1;
// Center of the update badge area relative to screen left
const targetCenterX = SCREEN_WIDTH - (bellRight + bellWidth + 8 + 35);
// Vertical center of the header relative to top of container
const headerVerticalPadding = SCREEN_HEIGHT * 0.014;
const targetCenterY = headerVerticalPadding + bellWidth / 2;

// Trash ball dimensions & starting offsets relative to bottom-center
const TRASH_SIZE = 44;
const startingBottomOffset = 40; // Starts from where the card's middle was

// Translation offsets to move the ball from bottom-center to target header
const deltaX = targetCenterX - SCREEN_WIDTH / 2;

// Vibration helper for haptic feedback
const triggerHaptic = () => {
  if (Platform.OS === 'android') {
    Vibration.vibrate(12); // Short tick on Android
  } else {
    Vibration.vibrate(1); // Standard vibration fallback on iOS
  }
};

// ─── Main Floating Card view + literal trash throw animation ────────────────
const MinorUpdateBottomSheetWithFly = () => {
  const { minorUpdate, setMinorUpdate, colors } = useContext(AppContext);
  const { visible, latestVersion, updateUrl } = minorUpdate;
  const insets = useSafeAreaInsets();

  const [flyingTrash, setFlyingTrash] = useState(false);
  const [shouldRender, setShouldRender] = useState(visible);

  const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const flyProgress = useRef(new Animated.Value(0)).current;

  // Compress scale value (0.95 when tapped)
  const compressScale = useRef(new Animated.Value(1)).current;

  // Dynamic safe area calculations for precise top landing
  const containerHeight = SCREEN_HEIGHT - insets.top - insets.bottom;
  const startingCenterY = containerHeight - startingBottomOffset - TRASH_SIZE / 2;
  const deltaY = targetCenterY - startingCenterY;
  const peakY = deltaY - 140;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setFlyingTrash(false);
      flyProgress.setValue(0);
      compressScale.setValue(1);
      
      // Slide card up from bottom
      Animated.parallel([
        Animated.spring(sheetTranslateY, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 5,
          speed: 12,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleDismiss = () => {
    triggerHaptic();

    // Step 1: Smoothly compress slightly (scale 0.95)
    Animated.timing(compressScale, {
      toValue: 0.95,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      // Step 2: Slide the card down and fade backdrop out immediately
      Animated.parallel([
        Animated.timing(sheetTranslateY, {
          toValue: SCREEN_HEIGHT,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();

      // Step 3: Spawn the crumpled trash ball and throw it to the top header area
      setFlyingTrash(true);
      Animated.timing(flyProgress, {
        toValue: 1,
        duration: 750, // Smooth, slower toss duration (750ms)
        easing: Easing.bezier(0.25, 0.8, 0.25, 1.0), // deceleration curve with momentum
        useNativeDriver: true,
      }).start(() => {
        setFlyingTrash(false);
        setShouldRender(false);
        // Toggle context status to display header badge and trigger bell wiggle
        setMinorUpdate(prev => ({ ...prev, visible: false, minimized: true }));
      });
    });
  };

  const handleUpdate = () => {
    triggerHaptic();
    const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.innspark.traqinnparent';
    Linking.openURL(updateUrl || fallbackUrl).catch(err =>
      console.error("Couldn't open store page", err),
    );
  };

  useEffect(() => {
    if (!visible && !flyingTrash) {
      setShouldRender(false);
    }
  }, [visible, flyingTrash]);

  if (!shouldRender) return null;

  // Parabolic trash toss interpolations (spins, scales, and follows high arc)
  const trashX = flyProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, deltaX],
  });

  const trashY = flyProgress.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, peakY, deltaY],
  });

  const trashScale = flyProgress.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [1.2, 1.0, 0.6, 0.35],
  });

  // Rapid rotation like spinning crumpled trash thrown to a bin
  const trashRotate = flyProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1080deg'],
  });

  const trashOpacity = flyProgress.interpolate({
    inputRange: [0, 0.9, 1],
    outputRange: [1.0, 1.0, 0.0],
  });

  return (
    <View
      style={[StyleSheet.absoluteFillObject, { zIndex: 9999, overflow: 'visible' }]}
      pointerEvents={visible && !flyingTrash ? 'auto' : 'none'}
    >
      {/* Backdrop */}
      {visible && !flyingTrash && (
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={handleDismiss} />
        </Animated.View>
      )}

      {/* Floating Card Modal */}
      {!flyingTrash && (
        <Animated.View
          style={[
            styles.card,
            {
              transform: [
                { translateY: sheetTranslateY },
                { scale: compressScale },
              ],
              opacity: backdropOpacity, // fade card together with backdrop on dismiss
            },
          ]}
        >
          {/* Close Button */}
          <TouchableOpacity 
            style={styles.closeButton} 
            onPress={handleDismiss} 
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <MaterialIcons name="close" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Header content */}
          <View style={styles.headerRow}>
            <View style={[styles.iconBadge, { backgroundColor: colors.theme === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(11, 34, 64, 0.08)', borderColor: colors.theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(11, 34, 64, 0.15)' }]}>
              <MaterialIcons name="system-update" size={24} color={colors.theme === 'dark' ? '#3B82F6' : colors.primary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[Typography.bold, styles.title]}>Update Available</Text>
              <View style={styles.versionRow}>
                <Text style={[Typography.medium, styles.versionOld]}>v{CURRENT_VERSION}</Text>
                <MaterialIcons name="arrow-forward" size={13} color={colors.theme === 'dark' ? '#3B82F6' : colors.primary} style={{ marginHorizontal: 6 }} />
                <Text style={[Typography.bold, styles.versionNew, { color: colors.theme === 'dark' ? '#3B82F6' : colors.primary }]}>v{latestVersion || '1.1.0'}</Text>
              </View>
            </View>
          </View>

          <Text style={[Typography.regular, styles.description]}>
            A new minor update is ready. Install now for visual refinements and performance enhancements.
          </Text>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.laterBtn} activeOpacity={0.7} onPress={handleDismiss}>
              <Text style={[Typography.bold, styles.laterBtnText]}>Maybe Later</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.updateBtn} activeOpacity={0.85} onPress={handleUpdate}>
              <LinearGradient colors={colors.theme === 'dark' ? ['#3B82F6', '#1D4ED8'] : [colors.primary, '#1F3C64']} style={styles.updateBtnGradient}>
                <MaterialIcons name="system-update" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={[Typography.bold, styles.updateBtnText]}>Update Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      {/* Flying Trash Ball */}
      {flyingTrash && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.trashBall,
            {
              transform: [
                { translateX: trashX },
                { translateY: trashY },
                { scale: trashScale },
                { rotate: trashRotate },
              ],
              opacity: trashOpacity,
            },
          ]}
        >
          {/* Document file icon inside the trash ball to represent the crumpled update card */}
          <MaterialIcons name="insert-drive-file" size={18} color="#64748B" style={{ transform: [{ rotate: '45deg' }] }} />
        </Animated.View>
      )}
    </View>
  );
};

// ─── Header Badge Component ──────────────────────────────────────────────────
export const UpdateHeaderBadge = () => {
  const { minorUpdate, setMinorUpdate, colors } = useContext(AppContext);
  const { minimized } = minorUpdate;

  const badgeScale = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(1)).current;

  // Spring badge entrance
  useEffect(() => {
    if (minimized) {
      Animated.spring(badgeScale, {
        toValue: 1,
        useNativeDriver: true,
        bounciness: 10,
        speed: 14,
      }).start();
    } else {
      Animated.timing(badgeScale, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [minimized]);

  // Subtle pulse loop every 9 seconds
  useEffect(() => {
    let interval;
    if (minimized) {
      const runPulse = () => {
        Animated.sequence([
          Animated.timing(pulseScale, { toValue: 1.12, duration: 250, useNativeDriver: true }),
          Animated.timing(pulseScale, { toValue: 0.95, duration: 150, useNativeDriver: true }),
          Animated.spring(pulseScale, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }),
        ]).start();
      };
      
      interval = setInterval(runPulse, 9000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [minimized]);

  const handleBadgePress = () => {
    triggerHaptic();
    setMinorUpdate(prev => ({ ...prev, visible: true, minimized: false }));
  };

  if (!minimized) return null;

  const combinedScale = Animated.multiply(badgeScale, pulseScale);

  return (
    <Animated.View style={{ transform: [{ scale: combinedScale }] }}>
      <TouchableOpacity
        style={[
          styles.updateBadge,
          {
            backgroundColor: colors.theme === 'dark' ? '#3B82F6' : colors.primary,
            shadowColor: colors.theme === 'dark' ? '#3B82F6' : colors.primary,
          }
        ]}
        activeOpacity={0.8}
        onPress={handleBadgePress}
      >
        <MaterialIcons name="arrow-upward" size={12} color="#FFFFFF" style={{ marginRight: 3 }} />
        <Text style={styles.updateBadgeText}>Update Available</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MinorUpdateBottomSheetWithFly;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.35)', // Slate backdrop
  },
  card: {
    position: 'absolute',
    bottom: 24, // Floats above the bottom edge
    left: SCREEN_WIDTH * 0.05,
    right: SCREEN_WIDTH * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.92)', // Glassmorphism backdrop
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)', // White glass border highlight
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingRight: 24, // Space for the close icon
  },
  iconBadge: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D0E7FF',
  },
  title: {
    fontSize: 16,
    color: '#0F172A',
  },
  versionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  versionOld: {
    fontSize: 12,
    color: '#94A3B8',
  },
  versionNew: {
    fontSize: 12,
    color: '#1788FF',
  },
  description: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 19,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  laterBtn: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  laterBtnText: {
    color: '#64748B',
    fontSize: 14,
  },
  updateBtn: {
    flex: 1.2,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#1788FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  updateBtnGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
  },

  // Crumpled Trash Ball (starts at bottom: 40, alignSelf: 'center')
  trashBall: {
    position: 'absolute',
    bottom: startingBottomOffset,
    alignSelf: 'center',
    width: TRASH_SIZE,
    height: TRASH_SIZE,
    borderRadius: TRASH_SIZE / 2,
    backgroundColor: '#F1F5F9', // light grey paper color
    borderWidth: 2,
    borderColor: '#94A3B8', // slate border
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  // Update badge in header (sticky at top-right, subtle glow shadow)
  updateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1788FF',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    shadowColor: '#1788FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 6, // Glow shadow on Android
  },
  updateBadgeText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});
