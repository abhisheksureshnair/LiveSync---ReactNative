import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme';

const { width, height } = Dimensions.get('window');

export const getStyles = (colors) => StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: height * 0.08,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  logo: {
    height: height * 0.09,
    width: width * 0.65,
    marginTop: height * 0.055
  },
  logoSubtitle: {
    fontSize: width * 0.026,
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 3,
    marginTop: height * 0.005,
    fontWeight: '500',
  },
  contentCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 28,
    paddingTop: 34,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: width * 0.076,
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'left',
    lineHeight: width * 0.076 * 1.1,
  },
  subtitle: {
    fontSize: width * 0.038,
    color: 'rgba(255, 255, 255, 0.72)',
    textAlign: 'left',
    lineHeight: width * 0.038 * 1.5,
    marginTop: 10,
  },
  chipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  chipText: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 5,
    fontWeight: '500',
  },
  swipeTrack: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 28,
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginTop: 28,
  },
  swipeText: {
    fontSize: width * 0.042,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  swipeHandle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  legalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 18,
  },
  legalText: {
    fontSize: width * 0.03,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  legalLink: {
    fontSize: width * 0.03,
    color: colors.accent,
    textDecorationLine: 'underline',
  },
});

export default getStyles(Colors);
