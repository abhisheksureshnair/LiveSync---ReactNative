let currentTheme = 'light';

export const setThemeMode = (mode) => {
  currentTheme = mode;
};

export const getThemeMode = () => {
  return currentTheme;
};

export const lightColors = {
  primary: '#0B2240',       // Brand Navy Blue
  primaryDark: '#061529',   // Shadow / Accent Navy
  primaryDeep: '#030A14',   // Title Deep Navy
  primaryLight: '#EFF4FA',  // Light Navy/Blue Background
  primaryLighter: '#F5F9FD', // Lighter Navy/Blue Background
  gradientStart: '#0A2540',
  gradientEnd: '#1E40AF',

  success: '#2ECC71',       // Success Green
  successLight: '#E8F8F0',  // Success Light BG

  error: '#FF4747',         // Error Red
  errorDark: '#EF4444',     // Dark Red text
  errorLight: '#FEE2E2',    // Light Red BG

  // Text
  textPrimary: '#1D2433',   // Dark Navy
  textPrimarySlate: '#1E293B', // Dark Slate
  textSecondary: '#5F6472', // Slate/Gray Secondary
  textSecondarySlate: '#64748B', // Slate 500
  textSecondaryDarkSlate: '#475569', // Slate 600
  textSecondaryMuted: '#687082', // Another slate-like gray
  textMuted: '#94A3B8',     // Muted light gray

  // Borders
  border: '#E2E8F0',        // Standard Border
  borderLight: '#F2F2F2',   // Light separator line
  borderLightBlue: '#E0E8F5', // Chat bubble border

  // Backgrounds
  background: '#F8F9FD',    // Main off-white background
  backgroundLight: '#F4F6FB', // Secondary light background
  backgroundTranslucent: '#F8F9FD8B', // Translucent off-white
  cardBackground: '#FFFFFF', // Card/Surface background
  white: '#FFFFFF',
  white85: 'rgba(255, 255, 255, 0.85)',
  white70: 'rgba(255, 255, 255, 0.7)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white20: 'rgba(255, 255, 255, 0.2)',
  black: '#000000',
  transparent: 'transparent',

  // Pulse & Translucent Grays/Colors
  errorTranslucent: 'rgba(255, 71, 71, 0.9)',
  primaryTranslucent10: 'rgba(11, 34, 64, 0.1)',
  primaryTranslucent15: 'rgba(11, 34, 64, 0.15)',
  primaryTranslucent25: 'rgba(11, 34, 64, 0.25)',
  primaryTranslucent30: 'rgba(11, 34, 64, 0.3)',
  primaryTranslucent40: 'rgba(11, 34, 64, 0.4)',

  // SyncAssist / Accents
  accent: '#6366F1',        // Indigo
  accentDisabled: '#C7D2FE',
  accentLight: '#EFF6FF',
  
  // Specific grid card colors
  purpleAccent: '#8B5CF6',
  purpleAccentBg: '#F3E8FF',
  skyBlueAccent: '#0284C7',
  skyBlueAccentBg: '#E0F2FE',
};

export const darkColors = {
  primary: '#3B82F6',       // Brand Blue (slightly lighter for dark mode readability)
  primaryDark: '#2563EB',   // Shadow / Accent Blue
  primaryDeep: '#60A5FA',   // Title Deep Blue
  primaryLight: '#1E293B',  // Light Blue Background -> Dark Slate
  primaryLighter: '#0F172A', // Lighter Blue Background -> Very Dark Slate
  gradientStart: '#1E3A8A',
  gradientEnd: '#3B82F6',

  success: '#10B981',       // Success Green
  successLight: '#064E3B',  // Success Light BG -> Dark Green

  error: '#EF4444',         // Error Red
  errorDark: '#F87171',     // Dark Red text -> Light Red
  errorLight: '#7F1D1D',    // Light Red BG -> Dark Red BG

  // Text
  textPrimary: '#F8FAFC',   // White/Light slate
  textPrimarySlate: '#F1F5F9', // Light Slate
  textSecondary: '#94A3B8', // Slate/Gray Secondary
  textSecondarySlate: '#CBD5E1', // Slate 300
  textSecondaryDarkSlate: '#E2E8F0', // Slate 200
  textSecondaryMuted: '#94A3B8', // Another slate-like gray
  textMuted: '#64748B',     // Muted gray

  // Borders
  border: '#334155',        // Slate 700
  borderLight: '#1E293B',   // Slate 800
  borderLightBlue: '#1E3A8A', // Dark blue border

  // Backgrounds
  background: '#0F172A',    // Main dark background (slate-900)
  backgroundLight: '#1E293B', // Secondary dark background (slate-800)
  backgroundTranslucent: '#0F172A8B', // Translucent dark background
  cardBackground: '#1E293B', // Card/Surface background (slate-800)
  white: '#FFFFFF',         // Literal white (button text, icons) stays white
  white85: 'rgba(255, 255, 255, 0.85)',
  white70: 'rgba(255, 255, 255, 0.7)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white20: 'rgba(255, 255, 255, 0.2)',
  black: '#000000',         // Literal black stays black
  transparent: 'transparent',

  // Pulse & Translucent Grays/Colors
  errorTranslucent: 'rgba(239, 68, 68, 0.9)',
  primaryTranslucent10: 'rgba(59, 130, 246, 0.2)',
  primaryTranslucent15: 'rgba(59, 130, 246, 0.25)',
  primaryTranslucent25: 'rgba(59, 130, 246, 0.35)',
  primaryTranslucent30: 'rgba(59, 130, 246, 0.4)',
  primaryTranslucent40: 'rgba(59, 130, 246, 0.5)',

  // SyncAssist / Accents
  accent: '#818CF8',        // Indigo 400
  accentDisabled: '#312E81',
  accentLight: '#1E1B4B',
  
  // Specific grid card colors
  purpleAccent: '#C084FC',
  purpleAccentBg: '#2E1065',
  skyBlueAccent: '#38BDF8',
  skyBlueAccentBg: '#082F49',
};

const getThemeColor = (colorName) => {
  return currentTheme === 'dark' ? darkColors[colorName] : lightColors[colorName];
};

export const Colors = {
  get primary() { return getThemeColor('primary'); },
  get primaryDark() { return getThemeColor('primaryDark'); },
  get primaryDeep() { return getThemeColor('primaryDeep'); },
  get primaryLight() { return getThemeColor('primaryLight'); },
  get primaryLighter() { return getThemeColor('primaryLighter'); },
  get gradientStart() { return getThemeColor('gradientStart'); },
  get gradientEnd() { return getThemeColor('gradientEnd'); },
  get success() { return getThemeColor('success'); },
  get successLight() { return getThemeColor('successLight'); },
  get error() { return getThemeColor('error'); },
  get errorDark() { return getThemeColor('errorDark'); },
  get errorLight() { return getThemeColor('errorLight'); },
  get textPrimary() { return getThemeColor('textPrimary'); },
  get textPrimarySlate() { return getThemeColor('textPrimarySlate'); },
  get textSecondary() { return getThemeColor('textSecondary'); },
  get textSecondarySlate() { return getThemeColor('textSecondarySlate'); },
  get textSecondaryDarkSlate() { return getThemeColor('textSecondaryDarkSlate'); },
  get textSecondaryMuted() { return getThemeColor('textSecondaryMuted'); },
  get textMuted() { return getThemeColor('textMuted'); },
  get border() { return getThemeColor('border'); },
  get borderLight() { return getThemeColor('borderLight'); },
  get borderLightBlue() { return getThemeColor('borderLightBlue'); },
  get background() { return getThemeColor('background'); },
  get backgroundLight() { return getThemeColor('backgroundLight'); },
  get backgroundTranslucent() { return getThemeColor('backgroundTranslucent'); },
  get cardBackground() { return getThemeColor('cardBackground'); },
  get white() { return getThemeColor('white'); },
  get white85() { return getThemeColor('white85'); },
  get white70() { return getThemeColor('white70'); },
  get white50() { return getThemeColor('white50'); },
  get white20() { return getThemeColor('white20'); },
  get black() { return getThemeColor('black'); },
  get transparent() { return getThemeColor('transparent'); },
  get errorTranslucent() { return getThemeColor('errorTranslucent'); },
  get primaryTranslucent10() { return getThemeColor('primaryTranslucent10'); },
  get primaryTranslucent15() { return getThemeColor('primaryTranslucent15'); },
  get primaryTranslucent25() { return getThemeColor('primaryTranslucent25'); },
  get primaryTranslucent30() { return getThemeColor('primaryTranslucent30'); },
  get primaryTranslucent40() { return getThemeColor('primaryTranslucent40'); },
  get accent() { return getThemeColor('accent'); },
  get accentDisabled() { return getThemeColor('accentDisabled'); },
  get accentLight() { return getThemeColor('accentLight'); },
  get purpleAccent() { return getThemeColor('purpleAccent'); },
  get purpleAccentBg() { return getThemeColor('purpleAccentBg'); },
  get skyBlueAccent() { return getThemeColor('skyBlueAccent'); },
  get skyBlueAccentBg() { return getThemeColor('skyBlueAccentBg'); },
};
