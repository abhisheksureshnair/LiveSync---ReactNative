import React from 'react';
import Svg, {
  Rect,
  Circle,
  Path,
  G,
  Line,
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop
} from 'react-native-svg';

const SchoolBusSvg = ({ width = 50, height = 100 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 120 240">
      <Defs>
        {/* Yellow/Orange body gradient for 3D curvature */}
        <LinearGradient id="busYellow" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#CA8A04" />
          <Stop offset="20%" stopColor="#EAB308" />
          <Stop offset="50%" stopColor="#FDE047" />
          <Stop offset="80%" stopColor="#EAB308" />
          <Stop offset="100%" stopColor="#CA8A04" />
        </LinearGradient>

        {/* Tinted glass gradient */}
        <LinearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#1E293B" />
          <Stop offset="40%" stopColor="#475569" />
          <Stop offset="100%" stopColor="#0F172A" />
        </LinearGradient>

        {/* Bumper/Black trim gradient */}
        <LinearGradient id="blackTrim" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#0F172A" />
          <Stop offset="50%" stopColor="#334155" />
          <Stop offset="100%" stopColor="#0F172A" />
        </LinearGradient>

        {/* 3D shadow under the bus */}
        <LinearGradient id="shadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0.05" />
        </LinearGradient>
      </Defs>

      {/* Drop Shadows */}
      <Rect x="38" y="23" width="44" height="30" rx="8" ry="8" fill="url(#shadow)" />
      <Rect x="25" y="55" width="70" height="162" rx="10" ry="10" fill="url(#shadow)" />

      {/* Front Crossview Mirrors */}
      <Path d="M 36,22 C 30,20 28,24 28,28" stroke="#1E293B" strokeWidth="1.5" fill="none" />
      <Circle cx="28" cy="28" r="3.5" fill="#000000" />
      <Path d="M 84,22 C 90,20 92,24 92,28" stroke="#1E293B" strokeWidth="1.5" fill="none" />
      <Circle cx="92" cy="28" r="3.5" fill="#000000" />

      {/* Left Mirror */}
      <Path d="M 22,50 L 10,48" stroke="#0F172A" strokeWidth="2.5" />
      <Rect x="7" y="38" width="5" height="15" rx="2" fill="url(#blackTrim)" stroke="#EAB308" strokeWidth="1" />

      {/* Right Mirror */}
      <Path d="M 98,50 L 110,48" stroke="#0F172A" strokeWidth="2.5" />
      <Rect x="108" y="38" width="5" height="15" rx="2" fill="url(#blackTrim)" stroke="#EAB308" strokeWidth="1" />

      {/* Front Bumper */}
      <Rect x="32" y="14" width="56" height="8" rx="3" fill="url(#blackTrim)" />

      {/* Front Hood (Narrower part) */}
      <Rect x="35" y="20" width="50" height="30" rx="6" fill="url(#busYellow)" />
      <Rect x="42" y="26" width="6" height="12" rx="1" fill="#1E293B" opacity="0.8" />
      <Rect x="72" y="26" width="6" height="12" rx="1" fill="#1E293B" opacity="0.8" />
      <Rect x="44" y="17" width="32" height="4" rx="1" fill="#0F172A" />

      {/* Windshield */}
      <Path d="M 35,50 L 85,50 L 92,56 L 28,56 Z" fill="url(#glass)" />
      <Line x1="45" y1="54" x2="52" y2="51" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      <Line x1="68" y1="54" x2="75" y2="51" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />

      {/* Main Cabin */}
      <Rect x="22" y="55" width="76" height="156" rx="8" fill="url(#busYellow)" />

      {/* Side Rub Rails */}
      <Rect x="22" y="55" width="2.5" height="156" fill="#0F172A" />
      <Rect x="95.5" y="55" width="2.5" height="156" fill="#0F172A" />

      {/* Left Windows */}
      <Rect x="25" y="70" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="25" y="90" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="25" y="110" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="25" y="130" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="25" y="150" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="25" y="170" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="25" y="190" width="4.5" height="12" rx="1" fill="url(#glass)" />

      {/* Right Windows */}
      <Rect x="90.5" y="70" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="90.5" y="90" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="90.5" y="110" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="90.5" y="130" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="90.5" y="150" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="90.5" y="170" width="4.5" height="15" rx="1" fill="url(#glass)" />
      <Rect x="90.5" y="190" width="4.5" height="12" rx="1" fill="url(#glass)" />

      {/* White Roof Panel */}
      <Rect x="33" y="66" width="54" height="138" rx="6" fill="#FFFFFF" />
      <Line x1="42" y1="72" x2="42" y2="198" stroke="#E5E7EB" strokeWidth="1.5" />
      <Line x1="78" y1="72" x2="78" y2="198" stroke="#E5E7EB" strokeWidth="1.5" />
      <Line x1="60" y1="125" x2="60" y2="198" stroke="#E5E7EB" strokeWidth="1.5" />

      {/* Emergency Escape Hatches */}
      <G>
        <Rect x="48" y="92" width="24" height="18" rx="3" fill="#F97316" stroke="#C2410C" strokeWidth="1" />
        <Rect x="52" y="96" width="16" height="10" rx="1.5" fill="#FFFFFF" />
      </G>
      <G>
        <Rect x="48" y="152" width="24" height="18" rx="3" fill="#F97316" stroke="#C2410C" strokeWidth="1" />
        <Rect x="52" y="156" width="16" height="10" rx="1.5" fill="#FFFFFF" />
      </G>

      {/* SCHOOL BUS Text */}
      <SvgText
        x="60"
        y="62"
        fill="#000000"
        fontSize="6.5"
        fontWeight="900"
        fontFamily="System"
        textAnchor="middle"
        letterSpacing="0.8"
      >
        SCHOOL BUS
      </SvgText>

      {/* Stop Sign Arm (Extended from left side) */}
      <G>
        <Rect x="15" y="75" width="8" height="4" fill="#0F172A" />
        <Path d="M 9,67 L 15,67 L 18,72 L 18,78 L 15,83 L 9,83 L 6,78 L 6,72 Z" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />
        <SvgText x="12" y="77" fill="#FFFFFF" fontSize="4.5" fontWeight="900" fontFamily="System" textAnchor="middle">STOP</SvgText>
      </G>

      {/* Front Warning Lights */}
      <Circle cx="32" cy="53" r="2" fill="#EF4444" stroke="#7F1D1D" strokeWidth="0.5" />
      <Circle cx="44" cy="53" r="2" fill="#F59E0B" stroke="#78350F" strokeWidth="0.5" />
      <Circle cx="76" cy="53" r="2" fill="#F59E0B" stroke="#78350F" strokeWidth="0.5" />
      <Circle cx="88" cy="53" r="2" fill="#EF4444" stroke="#7F1D1D" strokeWidth="0.5" />

      {/* Front Lights */}
      <Circle cx="39" cy="21" r="2.5" fill="#FEF08A" />
      <Circle cx="81" cy="21" r="2.5" fill="#FEF08A" />
      <Circle cx="35" cy="23" r="1.5" fill="#F59E0B" />
      <Circle cx="85" cy="23" r="1.5" fill="#F59E0B" />

      {/* Rear Bumper */}
      <Rect x="18" y="211" width="84" height="9" rx="3.5" fill="url(#blackTrim)" />

      {/* Rear Warning Lights */}
      <Circle cx="28" cy="208" r="2" fill="#EF4444" />
      <Circle cx="40" cy="208" r="2" fill="#F59E0B" />
      <Circle cx="80" cy="208" r="2" fill="#F59E0B" />
      <Circle cx="92" cy="208" r="2" fill="#EF4444" />

      {/* Rear Lights */}
      <Circle cx="24" cy="215" r="3" fill="#EF4444" />
      <Circle cx="96" cy="215" r="3" fill="#EF4444" />
      <Circle cx="30" cy="215" r="2" fill="#F59E0B" />
      <Circle cx="90" cy="215" r="2" fill="#F59E0B" />
    </Svg>
  );
};

export default SchoolBusSvg;
