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
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.015,
      backgroundColor: isDark ? 'transparent' : colors.cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: borderLt,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
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
    clearText: {
      fontSize: width * 0.035,
      color: colors.primary,
    },
    container: {
      flex: 1,
      backgroundColor: isDark ? 'transparent' : colors.backgroundLight,
    },
    notificationList: {
      padding: width * 0.04,
    },
    card: {
      backgroundColor: cardBg,
      borderRadius: width * 0.04,
      padding: width * 0.04,
      marginBottom: height * 0.015,
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderWidth: isDark ? 1.2 : 0,
      borderColor: cardBorder,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.02,
      shadowRadius: 4,
      elevation: 1,
    },
    iconContainer: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: width * 0.03,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: width * 0.035,
    },
    badgeTransit: {
      backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : colors.primaryLight,
    },
    badgeSchool: {
      backgroundColor: isDark ? 'rgba(168, 85, 247, 0.15)' : colors.purpleAccentBg,
    },
    contentContainer: {
      flex: 1,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    category: {
      fontSize: width * 0.03,
      color: isDark ? 'rgba(255, 255, 255, 0.5)' : colors.textSecondaryMuted,
      letterSpacing: 0.5,
    },
    time: {
      fontSize: width * 0.0275,
      color: isDark ? 'rgba(255, 255, 255, 0.4)' : colors.textMuted,
    },
    title: {
      fontSize: width * 0.0375,
      color: textPri,
      marginTop: height * 0.005,
    },
    message: {
      fontSize: width * 0.0325,
      color: textSec,
      marginTop: height * 0.004,
      lineHeight: width * 0.048,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: width * 0.08,
      paddingTop: height * 0.15,
    },
    emptyTitle: {
      fontSize: width * 0.045,
      color: textPri,
      marginTop: height * 0.02,
    },
    emptyDesc: {
      fontSize: width * 0.035,
      color: textSec,
      textAlign: 'center',
      marginTop: height * 0.01,
      lineHeight: width * 0.05,
    },
  });
};

export default getStyles(Colors);
