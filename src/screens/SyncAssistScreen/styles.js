import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme';

const { width, height } = Dimensions.get('window');

export const getStyles = (colors, isDark = false) => {
  const cardBg = isDark ? 'rgba(255, 255, 255, 0.07)' : colors.cardBackground;
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.15)' : colors.border;
  const textPri = isDark ? '#FFFFFF' : colors.textPrimary;
  const textSec = isDark ? 'rgba(255, 255, 255, 0.65)' : colors.textSecondary;
  const borderLt = isDark ? 'rgba(255, 255, 255, 0.08)' : colors.borderLight;
  const inputBg = isDark ? 'rgba(255, 255, 255, 0.06)' : colors.cardBackground;

  return StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: isDark ? 'transparent' : colors.cardBackground,
    },
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.015,
      backgroundColor: isDark ? 'transparent' : colors.cardBackground,
      borderBottomWidth: isDark ? 1 : 0,
      borderBottomColor: borderLt,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButtonRaw: {
      marginRight: width * 0.04,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTextContainer: {
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: width * 0.045,
      color: isDark ? '#FFFFFF' : colors.primary,
    },
    onlineBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: height * 0.0025,
    },
    onlineDot: {
      width: width * 0.015,
      height: width * 0.015,
      borderRadius: (width * 0.015) / 2,
      backgroundColor: colors.success,
      marginRight: width * 0.015,
    },
    onlineText: {
      fontSize: width * 0.025,
      fontWeight: '700',
      color: colors.success,
      letterSpacing: 0.5,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    resetButtonRaw: {
      marginRight: width * 0.045,
      justifyContent: 'center',
      alignItems: 'center',
    },
    profileAvatar: {
      width: width * 0.09,
      height: width * 0.09,
      borderRadius: (width * 0.09) / 2,
      borderWidth: 1.5,
      borderColor: isDark ? cardBorder : colors.border,
    },
    contentArea: {
      flex: 1,
      backgroundColor: isDark ? 'transparent' : colors.backgroundLight,
    },
    contentAreaContent: {
      flexGrow: 1,
    },
    welcomeContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: width * 0.06,
      paddingTop: height * 0.035,
      paddingBottom: height * 0.05,
    },
    speechBubble: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : colors.cardBackground,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : colors.border,
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.01,
      borderRadius: width * 0.04,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: height * 0.005 },
      shadowOpacity: 0.04,
      shadowRadius: width * 0.02,
      elevation: 3,
      marginBottom: height * 0.0125,
      zIndex: 10,
      position: 'relative',
    },
    speechIconContainer: {
      width: width * 0.055,
      height: width * 0.055,
      borderRadius: (width * 0.055) / 2,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.15)' : colors.primaryLighter,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: width * 0.02,
    },
    speechText: {
      fontSize: width * 0.03,
      color: textPri,
    },
    speechBubbleBeak: {
      position: 'absolute',
      bottom: -width * 0.015,
      left: '50%',
      marginLeft: -width * 0.015,
      width: width * 0.03,
      height: width * 0.03,
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : colors.cardBackground,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : colors.border,
      transform: [{ rotate: '45deg' }],
    },
    botImage: {
      width: width * 0.45,
      height: width * 0.45,
      resizeMode: 'contain',
      marginBottom: height * 0.03,
    },
    welcomeTitle: {
      fontSize: width * 0.07,
      color: isDark ? '#FFFFFF' : colors.primaryDark,
      textAlign: 'center',
    },
    welcomeSubtitle: {
      fontSize: width * 0.0375,
      color: textSec,
      textAlign: 'center',
      marginTop: height * 0.0125,
      lineHeight: width * 0.055,
      paddingHorizontal: width * 0.03,
      marginBottom: height * 0.04,
    },
    gridContainer: {
      width: '100%',
    },
    gridRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: height * 0.015,
    },
    gridCard: {
      flex: 1,
      backgroundColor: cardBg,
      borderRadius: width * 0.04,
      paddingVertical: height * 0.0175,
      paddingHorizontal: width * 0.04,
      marginHorizontal: width * 0.015,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: isDark ? 1.2 : 0,
      borderColor: cardBorder,
      shadowColor: colors.primaryDark,
      shadowOffset: { width: 0, height: height * 0.005 },
      shadowOpacity: 0.04,
      shadowRadius: width * 0.03,
      elevation: 2,
    },
    cardIconBadge: {
      width: width * 0.09,
      height: width * 0.09,
      borderRadius: width * 0.03,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: width * 0.03,
    },
    cardText: {
      fontSize: width * 0.035,
      color: textPri,
      flex: 1,
    },
    chatList: {
      padding: width * 0.04,
      paddingBottom: height * 0.03,
    },
    messageBubbleContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: height * 0.02,
      maxWidth: '82%',
    },
    userAlign: {
      alignSelf: 'flex-end',
    },
    botAlign: {
      alignSelf: 'flex-start',
    },
    avatarMini: {
      width: width * 0.06,
      height: width * 0.06,
      borderRadius: (width * 0.06) / 2,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: width * 0.02,
      marginBottom: height * 0.005,
    },
    messageBubble: {
      borderRadius: width * 0.05,
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.015,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: height * 0.0025 },
      shadowOpacity: 0.02,
      shadowRadius: width * 0.01,
      elevation: 1,
    },
    userBubble: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: 4,
    },
    botBubble: {
      backgroundColor: cardBg,
      borderBottomLeftRadius: 4,
      borderWidth: isDark ? 1.2 : 0,
      borderColor: cardBorder,
    },
    messageText: {
      fontSize: width * 0.035,
      lineHeight: width * 0.05,
    },
    userText: {
      color: colors.white,
    },
    botText: {
      color: textPri,
    },
    timeText: {
      fontSize: width * 0.0225,
      marginTop: height * 0.0075,
      alignSelf: 'flex-end',
    },
    userTime: {
      color: colors.white70,
    },
    botTime: {
      color: isDark ? 'rgba(255, 255, 255, 0.4)' : colors.textMuted,
    },
    inputArea: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.015,
      backgroundColor: isDark ? 'transparent' : colors.backgroundLight,
    },
    inputBar: {
      flex: 1,
      height: height * 0.0675,
      backgroundColor: inputBg,
      borderRadius: (height * 0.0675) / 2,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.02,
      marginRight: width * 0.025,
      borderWidth: isDark ? 1.2 : 0,
      borderColor: cardBorder,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: height * 0.005 },
      shadowOpacity: 0.05,
      shadowRadius: width * 0.025,
      elevation: 3,
    },
    plusOutlineCircle: {
      width: width * 0.07,
      height: width * 0.07,
      borderRadius: (width * 0.07) / 2,
      borderWidth: 1.5,
      borderColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: width * 0.02,
    },
    inputBarIcon: {
      padding: width * 0.02,
      marginRight: width * 0.01,
    },
    textInput: {
      flex: 1,
      height: '100%',
      fontSize: width * 0.035,
      color: textPri,
      paddingHorizontal: width * 0.03,
    },
    sendButton: {
      width: width * 0.125,
      height: width * 0.125,
      borderRadius: (width * 0.125) / 2,
      backgroundColor: colors.accent,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: height * 0.0075 },
      shadowOpacity: 0.25,
      shadowRadius: width * 0.02,
      elevation: 4,
    },
    sendButtonDisabled: {
      backgroundColor: isDark ? 'rgba(255, 255, 255, 0.08)' : colors.accentDisabled,
      shadowOpacity: 0.1,
      elevation: 0,
      opacity: 0.8,
    },
    sendIconWrapper: {
      transform: [{ rotate: '-45deg' }],
      marginLeft: width * 0.005,
      marginTop: -height * 0.0025,
    },
  });
};

export default getStyles(Colors);
