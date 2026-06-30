import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme';

const { width, height } = Dimensions.get('window');

export const getStyles = (colors) => {
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
    },
    headerTitle: {
      fontSize: width * 0.045,
      color: colors.textPrimary,
      fontFamily: 'Poppins-Bold',
    },
    filterButton: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: (width * 0.1) / 2,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: colors.border,
    },
    contentList: {
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.04,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: height * 0.02,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.cardBackground,
      borderRadius: 16,
      padding: 16,
      marginRight: 8,
      borderWidth: 0.5,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.04,
      shadowRadius: 6,
      elevation: 2,
    },
    statCardLast: {
      marginRight: 0,
      marginLeft: 8,
    },
    statIconContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    statTitle: {
      fontSize: 10,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Medium',
      lineHeight: 12,
    },
    statValue: {
      fontSize: 18,
      color: colors.textPrimary,
      fontFamily: 'Poppins-Bold',
      marginTop: 4,
      lineHeight: 22,
    },
    statSubtext: {
      fontSize: 9,
      color: colors.textSecondarySlate,
      fontFamily: 'Poppins-Regular',
      marginTop: 2,
    },
    chartCard: {
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      padding: 18,
      marginBottom: height * 0.02,
      borderWidth: 0.5,
      borderColor: colors.border,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.04,
      shadowRadius: 8,
      elevation: 3,
    },
    chartTitle: {
      fontSize: 14,
      color: colors.textPrimary,
      fontFamily: 'Poppins-Bold',
      lineHeight: 18,
    },
    chartSubtitle: {
      fontSize: 10,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Regular',
      marginTop: 2,
    },
    barChartContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 140,
      marginTop: 20,
      paddingHorizontal: 4,
    },
    barWrapper: {
      alignItems: 'center',
      flex: 1,
    },
    barValue: {
      fontSize: 8,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Medium',
      marginBottom: 4,
    },
    bar: {
      width: 14,
      borderRadius: 7,
    },
    barLabel: {
      fontSize: 9,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Medium',
      marginTop: 8,
    },
    breakdownList: {
      marginTop: 16,
    },
    breakdownRow: {
      marginBottom: 14,
    },
    breakdownHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    breakdownLabel: {
      fontSize: 11,
      color: colors.textPrimary,
      fontFamily: 'Poppins-Medium',
    },
    breakdownValue: {
      fontSize: 11,
      color: colors.textSecondary,
      fontFamily: 'Poppins-Bold',
    },
    progressBarBg: {
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.backgroundLight,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: '100%',
      borderRadius: 4,
    },
  });
};

export default getStyles(Colors);
