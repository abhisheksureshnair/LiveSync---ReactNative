import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';
import MinorUpdateBottomSheet, { UpdateHeaderBadge } from '../MinorUpdateScreen/MinorUpdateScreen';

const DashboardScreen = ({ navigation }) => {
  const {
    theme,
    colors,
    minorUpdate,
    parentProfileImage,
    alexProfileImage,
    emmaProfileImage,
  } = useContext(AppContext);
  const isDark = theme === 'dark';
  const styles = getStyles(colors, isDark);
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return 'Good Morning,';
    } else if (hours < 17) {
      return 'Good Afternoon,';
    } else {
      return 'Good Evening,';
    }
  };

  const [selectedChild, setSelectedChild] = React.useState('liam'); // 'liam' or 'sophia'
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showChatBubble, setShowChatBubble] = React.useState(false);
  const bubbleScale = React.useRef(new Animated.Value(0)).current;
  const bubbleOpacity = React.useRef(new Animated.Value(0)).current;
  const timeoutRef = React.useRef(null);
  const parentCardScale = React.useRef(new Animated.Value(1)).current;

  const handleParentCardPressIn = () => {
    Animated.spring(parentCardScale, {
      toValue: 0.95,
      tension: 100,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handleParentCardPressOut = () => {
    Animated.spring(parentCardScale, {
      toValue: 1,
      tension: 100,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const mainContent = (
    <SafeAreaView style={[styles.safeArea, isDark && { backgroundColor: 'transparent' }]}>
      <StatusBar
        backgroundColor={isDark ? 'transparent' : colors.cardBackground}
        barStyle={isDark || colors.textPrimary === '#F8FAFC' ? 'light-content' : 'dark-content'}
        translucent={isDark}
      />
      {/* Sticky Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[Typography.bold, styles.headerTitle]}>LiveSync</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <UpdateHeaderBadge />
          <TouchableOpacity
            style={styles.bellButton}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Notification')}
          >
            <MaterialIcons name="notifications-none" size={24} color={colors.textPrimary} />
            <View style={styles.bellBadge} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content ScrollView */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={!minorUpdate.visible}
      >
        <View style={{ width: '90%', alignSelf: 'center', position: 'relative', marginTop: 10, marginBottom: 5 }}>
          {/* Good Morning Card Section (Gradient Banner) */}
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.gradientBanner,
              {

                marginTop: 0,
                height: 150,
                justifyContent: 'center',
                paddingHorizontal: 20,
                borderRadius: 16,
              }
            ]}
          >
            <View style={{ paddingHorizontal: 4, paddingBottom: 10 }}>
              <Text style={[Typography.bold, { fontSize: 21, color: '#FFFFFF', marginBottom: 4, fontFamily: 'Poppins-Bold' }]}>
                Welcome back, Robert!
              </Text>
              <Text style={[Typography.medium, { fontSize: 12, color: 'rgba(255, 255, 255, 0.75)', fontFamily: 'Poppins-Regular' }]}>
                Track your family in real-time.
              </Text>
            </View>


            {/* Parent Card (Floating Overlay at Bottom Right) */}
            <TouchableOpacity
              activeOpacity={0.95}
              onPressIn={handleParentCardPressIn}
              onPressOut={handleParentCardPressOut}
              onPress={() => navigation.navigate('Profile')}
            >
              <Animated.View
                style={[
                  styles.parentCard,
                  {
                    transform: [{ scale: parentCardScale }],
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: colors.border,
                  }
                ]}
              >
                <Image
                  source={
                    parentProfileImage
                      ? { uri: parentProfileImage }
                      : require('../../assets/image/parent_avatar.png')
                  }
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    marginRight: 10,
                  }}
                />
                <View style={{ justifyContent: 'center' }}>
                  <Text style={[Typography.bold, { fontSize: 13, color: isDark ? '#FFFFFF' : '#FFFFFF', lineHeight: 16 }]}>
                    Robert Carter
                  </Text>
                  <Text style={[Typography.medium, { fontSize: 10, color: '#FFFFFF', opacity: 0.8, lineHeight: 12, marginTop: 1 }]}>
                    Parent Account
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Child Selector Header */}
        <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, zIndex: 30 }}>
          <Text style={[Typography.bold, { fontSize: 15, color: colors.textPrimary, fontFamily: 'Poppins-Bold' }]}>
            Live Tracking
          </Text>

          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowDropdown(!showDropdown)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#EFF4FA',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: colors.border,
              }}
            >
              <Text style={[Typography.bold, { fontSize: 12, color: colors.textPrimary, marginRight: 4, fontFamily: 'Poppins-Bold' }]}>
                {selectedChild === 'liam' ? 'Liam Carter' : 'Sophia Carter'}
              </Text>
              <MaterialIcons name="expand-more" size={16} color={colors.textPrimary} />
            </TouchableOpacity>

            {showDropdown && (
              <View style={{
                position: 'absolute',
                top: 36,
                right: 0,
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: colors.border,
                paddingVertical: 4,
                width: 130,
                zIndex: 50,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.12,
                shadowRadius: 6,
                elevation: 5,
              }}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedChild('liam');
                    setShowDropdown(false);
                  }}
                  style={{ paddingVertical: 8, paddingHorizontal: 12 }}
                >
                  <Text style={[Typography.medium, { fontSize: 12, color: selectedChild === 'liam' ? colors.primary : colors.textPrimary, fontFamily: selectedChild === 'liam' ? 'Poppins-Bold' : 'Poppins-Regular' }]}>
                    Liam Carter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedChild('sophia');
                    setShowDropdown(false);
                  }}
                  style={{ paddingVertical: 8, paddingHorizontal: 12, borderTopWidth: 0.5, borderTopColor: colors.border }}
                >
                  <Text style={[Typography.medium, { fontSize: 12, color: selectedChild === 'sophia' ? colors.primary : colors.textPrimary, fontFamily: selectedChild === 'sophia' ? 'Poppins-Bold' : 'Poppins-Regular' }]}>
                    Sophia Carter
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Conditional Child Card Display */}
        {selectedChild === 'liam' ? (
          /* Child 1 Card (In Transit with Map) */
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Live')}
            style={styles.childTransitCard}
          >
            {/* Map Header */}
            <View style={styles.mapContainer}>
              <Image
                source={require('../../assets/image/map.png')}
                style={styles.map}
                resizeMode="cover"
              />
              {/* Centered locator pin overlay */}
              <View style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: -22,
                marginTop: -27,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <View style={styles.pulseRingOuter} />
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: colors.white || '#FFFFFF',
                  borderWidth: 2,
                  borderColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                  <Image
                    source={
                      alexProfileImage
                        ? { uri: alexProfileImage }
                        : require('../../assets/image/boy_avatar.png')
                    }
                    style={{ width: 38, height: 38, borderRadius: 19 }}
                  />
                </View>
                <View style={{
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: 5,
                  borderRightWidth: 5,
                  borderTopWidth: 7,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderTopColor: colors.primary,
                  marginTop: -1,
                }} />
              </View>

              {/* Live Indicator Badge in Map */}
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>LIVE TRACKING</Text>
              </View>

              {/* Route Badge */}
              <View style={styles.routeBadgeOverlay}>
                <Text style={[Typography.bold, styles.routeText]}>
                  LIAM • ON THE GO
                </Text>
              </View>
            </View>

            {/* Student Info Details */}
            <View style={styles.studentInfoContainer}>
              <View style={styles.rowSpaceBetween}>
                <View style={styles.rowAlignCenter}>
                  <Image
                    source={
                      alexProfileImage
                        ? { uri: alexProfileImage }
                        : require('../../assets/image/boy_avatar.png')
                    }
                    style={styles.studentAvatar}
                  />

                  <View>
                    <Text style={[Typography.bold, styles.studentName]}>
                      Liam Carter
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <MaterialIcons name="battery-charging-full" size={14} color={colors.success} style={{ marginRight: 4 }} />
                      <Text style={[Typography.medium, styles.studentGrade, { marginTop: 0 }]}>
                        Battery: 84% • GPS Active
                      </Text>
                    </View>

                    <View style={styles.statusRow}>
                      <View style={styles.statusDotTransit} />
                      <Text style={[Typography.bold, styles.statusTextTransit]}>
                        On the way • 1.5 km away
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Call Driver Button */}
                <TouchableOpacity
                  style={styles.callDriverBtn}
                  activeOpacity={0.7}
                  onPress={(e) => {
                    e.stopPropagation();
                    Alert.alert("Calling Liam", "Calling Liam Carter...");
                  }}
                >
                  <MaterialIcons name="phone" size={20} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          /* Child 2 Card (Sophia - Safely Arrived Home with Map) */
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => Alert.alert("Sophia Carter", "Sophia is safely at the Home Safe Zone.")}
            style={styles.childTransitCard}
          >
            {/* Map Header */}
            <View style={styles.mapContainer}>
              <Image
                source={require('../../assets/image/map.png')}
                style={styles.map}
                resizeMode="cover"
              />
              {/* Centered locator pin overlay for Sophia */}
              <View style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginLeft: -22,
                marginTop: -27,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <View style={[styles.pulseRingOuter, { borderColor: colors.success, backgroundColor: 'rgba(16, 185, 129, 0.2)' }]} />
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: colors.white || '#FFFFFF',
                  borderWidth: 2,
                  borderColor: colors.success,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                  <Image
                    source={
                      emmaProfileImage
                        ? { uri: emmaProfileImage }
                        : require('../../assets/image/girl_avatar.png')
                    }
                    style={{ width: 38, height: 38, borderRadius: 19 }}
                  />
                </View>
                <View style={{
                  width: 0,
                  height: 0,
                  backgroundColor: 'transparent',
                  borderStyle: 'solid',
                  borderLeftWidth: 5,
                  borderRightWidth: 5,
                  borderTopWidth: 7,
                  borderLeftColor: 'transparent',
                  borderRightColor: 'transparent',
                  borderTopColor: colors.success,
                  marginTop: -1,
                }} />
              </View>

              {/* Safe Zone Indicator Badge in Map */}
              <View style={[styles.liveBadge, { backgroundColor: 'rgba(16, 185, 129, 0.9)' }]}>
                <View style={[styles.liveDot, { backgroundColor: '#FFFFFF' }]} />
                <Text style={styles.liveText}>SAFE ZONE</Text>
              </View>

              {/* Route Badge */}
              <View style={styles.routeBadgeOverlay}>
                <Text style={[Typography.bold, styles.routeText, { color: colors.success }]}>
                  SOPHIA • AT HOME
                </Text>
              </View>
            </View>

            {/* Student Info Details */}
            <View style={styles.studentInfoContainer}>
              <View style={styles.rowSpaceBetween}>
                <View style={styles.rowAlignCenter}>
                  <Image
                    source={
                      emmaProfileImage
                        ? { uri: emmaProfileImage }
                        : require('../../assets/image/girl_avatar.png')
                    }
                    style={styles.studentAvatar}
                  />

                  <View>
                    <Text style={[Typography.bold, styles.studentName]}>
                      Sophia Carter
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <MaterialIcons name="verified-user" size={14} color={colors.success} style={{ marginRight: 4 }} />
                      <Text style={[Typography.medium, styles.studentGrade, { marginTop: 0 }]}>
                        Battery: 92% • Safe Zone: Home
                      </Text>
                    </View>

                    <View style={styles.statusRow}>
                      <View style={styles.statusDotHome} />
                      <Text style={[Typography.bold, styles.statusTextHome]}>
                        Arrived home • 03:45 PM
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Call Child Button */}
                <TouchableOpacity
                  style={[styles.callDriverBtn, { borderColor: colors.success }]}
                  activeOpacity={0.7}
                  onPress={(e) => {
                    e.stopPropagation();
                    Alert.alert("Call Sophia", "Calling Sophia Carter...");
                  }}
                >
                  <MaterialIcons name="phone" size={20} color={colors.success} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}

        {/* Quick Actions Section */}
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 24, marginBottom: 20 }}>
          <Text style={[Typography.bold, { fontSize: 15, color: colors.textPrimary, marginBottom: 16, fontFamily: 'Poppins-Bold' }]}>
            Quick Actions
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            {/* History Action */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('History')}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <View style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.85)' : '#EFF4FA',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: isDark ? 1 : 0.5,
                borderColor: colors.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 3,
              }}>
                <MaterialIcons name="history" size={24} color={colors.primary} />
              </View>
              <Text style={[Typography.medium, { fontSize: 12, color: colors.textPrimary, marginTop: 8, fontFamily: 'Poppins-Medium' }]}>
                History
              </Text>
            </TouchableOpacity>

            {/* Reports Action */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Report')}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <View style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.85)' : '#EFF4FA',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: isDark ? 1 : 0.5,
                borderColor: colors.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 3,
              }}>
                <MaterialIcons name="assessment" size={24} color={colors.primary} />
              </View>
              <Text style={[Typography.medium, { fontSize: 12, color: colors.textPrimary, marginTop: 8, fontFamily: 'Poppins-Medium' }]}>
                Reports
              </Text>
            </TouchableOpacity>

            {/* Control Action */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Control')}
              style={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <View style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                backgroundColor: isDark ? 'rgba(30, 41, 59, 0.85)' : '#EFF4FA',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: isDark ? 1 : 0.5,
                borderColor: colors.border,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 3,
              }}>
                <MaterialIcons name="tune" size={24} color={colors.primary} />
              </View>
              <Text style={[Typography.medium, { fontSize: 12, color: colors.textPrimary, marginTop: 8, fontFamily: 'Poppins-Medium' }]}>
                Control
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Chat Bubble */}
      {showChatBubble && (
        <Animated.View
          style={[
            styles.chatBubbleContainer,
            {
              opacity: bubbleOpacity,
              transform: [{ scale: bubbleScale }],
            },
          ]}
        >
          <View style={styles.chatBubbleContent}>
            <View style={styles.chatBubbleHeader}>
              <View style={styles.chatBubbleTitleRow}>
                <Image
                  source={require('../../assets/image/sync_bot_head.png')}
                  style={styles.chatBubbleBotIcon}
                  resizeMode="contain"
                />
                <Text style={styles.chatBubbleBotName}>LiveSync Assist</Text>
                <View style={styles.chatBubbleOnlineDot} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  Animated.parallel([
                    Animated.timing(bubbleScale, {
                      toValue: 0,
                      duration: 150,
                      useNativeDriver: true,
                    }),
                    Animated.timing(bubbleOpacity, {
                      toValue: 0,
                      duration: 150,
                      useNativeDriver: true,
                    }),
                  ]).start(() => setShowChatBubble(false));
                }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons name="close" size={18} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <Text style={styles.chatBubbleText}>
              Your child is safely home. How can I help you today?
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                setShowChatBubble(false);
                navigation.navigate('SyncAssist');
              }}
              style={styles.chatBubbleButton}
            >
              <Text style={styles.chatBubbleButtonText}>Ask Assistant</Text>
              <MaterialIcons name="chevron-right" size={14} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.chatBubbleArrow} />
        </Animated.View>
      )}

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate('SyncAssist')}
      >
        <Image
          source={require('../../assets/image/sync_bot_head.png')}
          style={styles.fabIconImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* Minor Update Bottom Sheet */}
      <MinorUpdateBottomSheet />
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

export default DashboardScreen;
