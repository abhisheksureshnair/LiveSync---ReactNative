import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../theme';

const { width, height } = Dimensions.get('window');

export const getStyles = (colors) => StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: 'center',
  },

  logo: {
    marginTop: height * 0.07,
    alignItems: 'center',
    marginBottom: height * 0.09
  },



  logoSubtitle: {
    fontSize: width * 0.035,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: height * 0.005,
    textAlign: 'center',
  },

  card: {
    width: width * 0.9,
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Glassmorphism
    borderWidth: 1.2,
    borderColor: 'rgba(255, 255, 255, 0.18)', // White glass highlight border
    borderRadius: 28,
    padding: 28,
    marginTop: height * 0.085,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  headerIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTextContainer: {
    marginLeft: 14,
  },

  headerTitle: {
    fontSize: width * 0.048,
    color: '#FFFFFF', // Clean White text
    fontWeight: '700',
  },

  headerSubtitle: {
    fontSize: width * 0.03,
    color: 'rgba(255, 255, 255, 0.7)',
  },

  inputLabel: {
    fontSize: width * 0.033,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },

  inputContainer: {
    height: height * 0.07,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    paddingHorizontal: width * 0.04,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputFocused: {
    borderColor: '#1E88E5',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#1E88E5',
    shadowOffset: {
      width: 0,
      height: height * 0.005,
    },
    shadowOpacity: 0.1,
    shadowRadius: width * 0.025,
    elevation: 2,
  },

  input: {
    flex: 1,
    alignSelf: 'stretch',
    fontSize: width * 0.0425,
    paddingVertical: 0,
  },

  button: {
    width: width * 0.78,
    height: 54,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.042,
    fontWeight: '700',
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height * 0.025,
  },

  otpBox: {
    width: width * 0.16,
    height: width * 0.16,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },

  otpInput: {
    fontSize: width * 0.055,
    textAlign: 'center',
    color: '#FFFFFF',
    width: '100%',
    height: '100%',
  },

  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.04,
  },

  secureText: {
    fontSize: width * 0.03,
    color: 'rgba(255, 255, 255, 0.5)',
    marginLeft: 6,
  },
});
