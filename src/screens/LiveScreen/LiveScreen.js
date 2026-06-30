import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';

const { width } = Dimensions.get('window');

const LiveScreen = () => {
  const navigation = useNavigation();
  const { theme, colors, alexProfileImage } = useContext(AppContext);
  const styles = getStyles(colors);
  const insets = useSafeAreaInsets();
  const avatarSource = alexProfileImage ? { uri: alexProfileImage } : require('../../assets/image/boy_avatar.png');
  const isDark = theme === 'dark';

  const handleCall = () => {
    Alert.alert("Call Liam", "Calling Liam Carter at +91 98765 43210...");
  };

  const handleMessage = () => {
    // Navigate to SyncBot Chat Assistant
    navigation.navigate('SyncAssist');
  };

  const handleHistory = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      {/* Static Map Background */}
      <Image
        source={require('../../assets/image/map.png')}
        style={styles.map}
        resizeMode="cover"
      />

      {/* Centered child locator overlay aligned to cover the printed map bus icon */}
      <View style={{
        position: 'absolute',
        top: '45%',
        left: '50%',
        marginLeft: -25,
        marginTop: -30,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
      }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {/* Outer glowing border ring */}
          <View style={{
            position: 'absolute',
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: isDark ? 'rgba(30, 41, 59, 0.25)' : 'rgba(11, 34, 64, 0.15)',
            borderWidth: 1.5,
            borderColor: isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(11, 34, 64, 0.25)',
          }} />
          
          <View style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: colors.white || '#FFFFFF',
            borderWidth: 2.5,
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
              source={avatarSource}
              style={{ width: 44, height: 44, borderRadius: 22 }}
            />
          </View>
          <View style={{
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 6,
            borderRightWidth: 6,
            borderTopWidth: 8,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: colors.primary,
            marginTop: -1,
          }} />
        </View>
      </View>

      {/* Container for Floating Controls */}
      <View
        style={[styles.overlaySafe, { paddingTop: insets.top, paddingBottom: insets.bottom + 12 }]}
        pointerEvents="box-none"
      >
        {/* Top Header & Stats Section Stacked Naturally */}
        <View style={{ width: '100%', pointerEvents: 'box-none' }}>
          {/* Floating Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={[Typography.bold, styles.headerTitle]}>
                Live Tracking Map
              </Text>
              <Text style={[Typography.medium, styles.headerSubtitle]}>
                Liam Carter • Active Tracking
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>LIVE</Text>
            </View>
          </View>

          {/* Stats Badges Row (3 columns, perfectly centered) */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 12 }}>
            {/* Speed Badge */}
            <View style={[styles.statsBadge, { flex: 1, marginRight: 8, justifyContent: 'center' }]}>
              <MaterialIcons name="speed" size={18} color="#EAB308" style={{ marginRight: 6 }} />
              <View>
                <Text style={styles.statsLabel}>Speed:</Text>
                <Text style={styles.statsValue}>12 km/h</Text>
              </View>
            </View>

            {/* Battery Badge */}
            <View style={[styles.statsBadge, { flex: 1, marginRight: 8, justifyContent: 'center' }]}>
              <MaterialIcons name="battery-charging-full" size={18} color="#10B981" style={{ marginRight: 6 }} />
              <View>
                <Text style={styles.statsLabel}>Battery:</Text>
                <Text style={styles.statsValue}>84%</Text>
              </View>
            </View>

            {/* Network Badge */}
            <View style={[styles.statsBadge, { flex: 1, justifyContent: 'center' }]}>
              <MaterialIcons name="wifi" size={18} color="#3B82F6" style={{ marginRight: 6 }} />
              <View>
                <Text style={styles.statsLabel}>Network:</Text>
                <Text style={styles.statsValue}>5G Excellent</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Frosted Card */}
        <View style={{ paddingHorizontal: 16, width: '100%' }}>
          <View style={styles.bottomOverlayCard}>
            {/* User Info Row */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={avatarSource}
                style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1.5, borderColor: colors.primary }}
              />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[Typography.bold, { fontSize: 16, color: colors.textPrimary, fontFamily: 'Poppins-Bold' }]}>
                    Liam Carter
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8, backgroundColor: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.12)', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
                    <MaterialIcons name="star" size={12} color="#10B981" />
                    <Text style={{ fontSize: 10, fontWeight: '700', color: '#10B981', marginLeft: 2, fontFamily: 'Poppins-Bold' }}>Active</Text>
                  </View>
                </View>
                <Text style={[Typography.medium, { fontSize: 12, color: colors.textSecondary, marginTop: 2, fontFamily: 'Poppins-Regular' }]}>
                  Device: iPhone 15 Pro • GPS Online
                </Text>
              </View>
            </View>

            {/* Action Buttons Row */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              {/* Call Button */}
              <TouchableOpacity activeOpacity={0.8} onPress={handleCall} style={styles.actionBtnContainer}>
                <View style={[styles.actionBtnIconCircle, { backgroundColor: '#10B981' }]}>
                  <MaterialIcons name="phone" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionBtnLabel}>Call</Text>
              </TouchableOpacity>

              {/* Message Button */}
              <TouchableOpacity activeOpacity={0.8} onPress={handleMessage} style={styles.actionBtnContainer}>
                <View style={[styles.actionBtnIconCircle, { backgroundColor: '#3B82F6' }]}>
                  <MaterialIcons name="chat" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionBtnLabel}>Message</Text>
              </TouchableOpacity>

              {/* History Button */}
              <TouchableOpacity activeOpacity={0.8} onPress={handleHistory} style={styles.actionBtnContainer}>
                <View style={[styles.actionBtnIconCircle, { backgroundColor: '#8B5CF6' }]}>
                  <MaterialIcons name="history" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionBtnLabel}>History</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LiveScreen;
