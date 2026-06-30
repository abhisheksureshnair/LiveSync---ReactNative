import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme';

const { width, height } = Dimensions.get('window');

export const getStyles = (colors) => {
  const isDark = colors.theme === 'dark';
  
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: height,
    },
    overlaySafe: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'space-between',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      marginHorizontal: width * 0.04,
      marginTop: height * 0.015,
      padding: width * 0.035,
      borderRadius: width * 0.05,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: height * 0.0075 },
      shadowOpacity: 0.08,
      shadowRadius: width * 0.04,
      elevation: 8,
      borderWidth: isDark ? 1 : 0.5,
      borderColor: colors.border,
    },
    backButton: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: (width * 0.1) / 2,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: width * 0.03,
    },
    headerTextContainer: {
      flex: 1,
    },
    headerTitle: {
      fontSize: width * 0.04,
      color: colors.textPrimary,
    },
    headerSubtitle: {
      fontSize: width * 0.03,
      color: colors.textSecondarySlate,
      marginTop: height * 0.0025,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.errorLight,
      paddingHorizontal: width * 0.025,
      paddingVertical: height * 0.006,
      borderRadius: width * 0.03,
    },
    statusDot: {
      width: width * 0.015,
      height: width * 0.015,
      borderRadius: (width * 0.015) / 2,
      backgroundColor: colors.errorDark,
      marginRight: width * 0.015,
    },
    statusText: {
      fontSize: width * 0.025,
      fontWeight: '700',
      color: colors.errorDark,
      letterSpacing: 0.5,
    },
    statsBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.9)',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 12,
      marginRight: 10,
      borderWidth: 0.5,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    statsLabel: {
      fontSize: 10,
      color: isDark ? 'rgba(255, 255, 255, 0.6)' : colors.textSecondary,
      fontFamily: 'Poppins-Regular',
      lineHeight: 12,
    },
    statsValue: {
      fontSize: 11,
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : colors.textPrimary,
      fontFamily: 'Poppins-Bold',
      lineHeight: 14,
      marginTop: 1,
    },
    bottomOverlayCard: {
      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.88)' : 'rgba(255, 255, 255, 0.95)',
      borderRadius: 24,
      padding: 20,
      borderWidth: 0.5,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 10,
    },
    actionBtnContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionBtnIconCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    actionBtnLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: colors.textPrimary,
      marginTop: 6,
      fontFamily: 'Poppins-Medium',
    },
  });
};

export default getStyles(Colors);
