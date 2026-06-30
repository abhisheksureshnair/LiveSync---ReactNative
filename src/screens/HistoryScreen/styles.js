import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme';

const { width, height } = Dimensions.get('window');

export const getStyles = (colors) => {
  const isDark = colors.theme === 'dark';
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardBackground,
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.015,
      borderBottomWidth: 0.5,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3,
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
      alignItems: 'center',
      marginRight: width * 0.13, // Balance back button to center title
    },
    headerTitle: {
      fontSize: width * 0.045,
      color: colors.textPrimary,
      fontFamily: 'Poppins-Bold',
    },
    calendarContainer: {
      paddingVertical: height * 0.015,
      backgroundColor: colors.cardBackground,
      borderBottomWidth: 0.5,
      borderColor: colors.border,
      alignItems: 'center',
    },
    monthText: {
      fontSize: width * 0.04,
      color: colors.textPrimary,
      fontFamily: 'Poppins-Bold',
      marginBottom: height * 0.0125,
    },
    daysRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: width,
      paddingHorizontal: width * 0.02,
    },
    dayPill: {
      width: width * 0.11,
      height: height * 0.07,
      borderRadius: width * 0.055,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    dayPillActive: {
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 4,
    },
    dayLabel: {
      fontSize: width * 0.025,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Medium',
    },
    dayLabelActive: {
      color: '#FFFFFF',
    },
    dayNum: {
      fontSize: width * 0.035,
      color: colors.textPrimary,
      fontFamily: 'Poppins-Bold',
      marginTop: 2,
    },
    dayNumActive: {
      color: '#FFFFFF',
    },
    listContent: {
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.04,
    },
    card: {
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      padding: 16,
      marginBottom: height * 0.02,
      borderWidth: 0.5,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 4,
    },
    cardTop: {
      flexDirection: 'row',
      marginBottom: 16,
    },
    thumbnailContainer: {
      width: width * 0.32,
      height: height * 0.11,
      borderRadius: 14,
      overflow: 'hidden',
      borderWidth: 0.5,
      borderColor: colors.border,
    },
    thumbnailMap: {
      width: '100%',
      height: '100%',
    },
    statsColumn: {
      flex: 1,
      marginLeft: 16,
      justifyContent: 'center',
    },
    statRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    statIconBox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      backgroundColor: colors.backgroundLight,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    statTextContainer: {
      justifyContent: 'center',
    },
    statLabel: {
      fontSize: 9,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Regular',
      lineHeight: 11,
    },
    statValue: {
      fontSize: 11,
      color: colors.textPrimary,
      fontFamily: 'Poppins-Bold',
      lineHeight: 13,
      marginTop: 1,
    },
    replayBtn: {
      width: '100%',
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 3,
    },
    replayBtnText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: 'Poppins-Bold',
    },
    noDataContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: height * 0.1,
    },
    noDataText: {
      fontSize: 14,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Medium',
      marginTop: 12,
    },
  });
};

export default getStyles(Colors);
