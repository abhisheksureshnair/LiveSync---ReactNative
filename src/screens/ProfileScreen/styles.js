import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme';

const { width, height } = Dimensions.get('window');

export const getStyles = (colors, isDark = false) => {
  const cardBg = isDark ? 'rgba(255, 255, 255, 0.07)' : colors.cardBackground;
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.15)' : colors.border;
  const textPri = isDark ? '#FFFFFF' : colors.textPrimary;
  const textSec = isDark ? 'rgba(255, 255, 255, 0.65)' : colors.textSecondary;
  const borderLt = isDark ? 'rgba(255, 255, 255, 0.08)' : colors.borderLight;

  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: isDark ? 'transparent' : colors.cardBackground,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.015,
      backgroundColor: isDark ? 'transparent' : colors.cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: borderLt,
    },
    backButton: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: (width * 0.1) / 2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.06)' : colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: width * 0.04,
      borderWidth: isDark ? 1.2 : 0,
      borderColor: cardBorder,
    },
    headerTitle: {
      fontSize: width * 0.045,
      color: textPri,
    },
    container: {
      flex: 1,
      backgroundColor: isDark ? 'transparent' : colors.backgroundLight,
    },
    profileCard: {
      backgroundColor: cardBg,
      margin: width * 0.04,
      borderRadius: width * 0.05,
      padding: width * 0.05,
      alignItems: 'center',
      borderWidth: isDark ? 1.2 : 0,
      borderColor: cardBorder,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: height * 0.005 },
      shadowOpacity: 0.05,
      shadowRadius: width * 0.02,
      elevation: 3,
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: height * 0.015,
    },
    avatar: {
      width: width * 0.22,
      height: width * 0.22,
      borderRadius: (width * 0.22) / 2,
      borderWidth: 2.5,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : colors.primaryLight,
    },
    editBadge: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.primary,
      width: width * 0.075,
      height: width * 0.075,
      borderRadius: (width * 0.075) / 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: isDark ? '#1E293B' : '#FFFFFF',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    },
    name: {
      fontSize: width * 0.045,
      color: textPri,
    },
    email: {
      fontSize: width * 0.035,
      color: textSec,
      marginTop: height * 0.0025,
    },
    phone: {
      fontSize: width * 0.035,
      color: isDark ? 'rgba(255, 255, 255, 0.5)' : colors.textSecondaryMuted,
      marginTop: height * 0.0025,
    },
    section: {
      marginHorizontal: width * 0.04,
      marginBottom: height * 0.02,
    },
    sectionTitle: {
      fontSize: width * 0.0375,
      color: textSec,
      marginBottom: height * 0.01,
    },
    childrenContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    childCard: {
      flex: 1,
      backgroundColor: cardBg,
      borderRadius: width * 0.04,
      padding: width * 0.04,
      marginHorizontal: width * 0.01,
      alignItems: 'center',
      borderWidth: isDark ? 1.2 : 0,
      borderColor: cardBorder,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.02,
      shadowRadius: 4,
      elevation: 1,
    },
    childAvatarContainer: {
      position: 'relative',
      marginBottom: height * 0.0075,
    },
    childAvatar: {
      width: width * 0.14,
      height: width * 0.14,
      borderRadius: (width * 0.14) / 2,
    },
    childEditBadge: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      backgroundColor: colors.primary,
      width: width * 0.05,
      height: width * 0.05,
      borderRadius: (width * 0.05) / 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1.2,
      borderColor: isDark ? '#1E293B' : '#FFFFFF',
      elevation: 2,
    },
    childName: {
      fontSize: width * 0.035,
      color: textPri,
    },
    childGrade: {
      fontSize: width * 0.03,
      color: textSec,
      marginTop: 2,
    },
    settingsCard: {
      backgroundColor: cardBg,
      borderRadius: width * 0.04,
      padding: width * 0.02,
      borderWidth: isDark ? 1.2 : 0,
      borderColor: cardBorder,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.02,
      shadowRadius: 4,
      elevation: 1,
    },
    settingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.015,
      borderBottomWidth: 1,
      borderBottomColor: borderLt,
    },
    settingRowLast: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.015,
    },
    settingLeft: {
      flex: 1,
      paddingRight: width * 0.02,
    },
    settingText: {
      fontSize: width * 0.035,
      color: textPri,
    },
    settingDesc: {
      fontSize: width * 0.03,
      color: textSec,
      marginTop: 2,
    },
    logoutButton: {
      margin: width * 0.04,
      height: height * 0.065,
      backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : colors.errorLight,
      borderRadius: width * 0.04,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1.2,
      borderColor: colors.error,
      marginBottom: height * 0.04,
    },
    logoutText: {
      fontSize: width * 0.04,
      color: colors.errorDark,
      marginLeft: width * 0.02,
    },
  });
};

export default getStyles(Colors);
