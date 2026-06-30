import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const LogoFullWhite = ({ width, height, style, fill = '#FFFFFF' }) => {
  return (
    <View style={[styles.container, style, width ? { width } : null, height ? { height } : null]}>
      <Image
        source={require('../assets/image/app_logo.png')}
        style={[
          styles.iconImage,
          fill !== '#FFFFFF' && { tintColor: fill }
        ]}
        resizeMode="contain"
      />
      <Text style={[styles.text, { color: fill }]}>
        Live<Text style={styles.textAccent}>Sync</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 36,
    height: 36,
    marginRight: 8,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    letterSpacing: 0.5,
  },
  textAccent: {
    fontFamily: 'Poppins-Medium',
    opacity: 0.85,
  },
});

export default LogoFullWhite;
