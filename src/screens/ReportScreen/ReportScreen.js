import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';

const ReportScreen = () => {
  const navigation = useNavigation();
  const { theme, colors } = useContext(AppContext);
  const styles = getStyles(colors);
  const isDark = theme === 'dark';

  const [selectedChild, setSelectedChild] = useState('liam'); // 'liam' or 'sophia'
  const [showDropdown, setShowDropdown] = useState(false);

  const handleFilterPress = () => {
    const childName = selectedChild === 'liam' ? 'Liam' : 'Sophia';
    Alert.alert("Filter Reports", `Filter options for ${childName}: Last 7 Days, Last 30 Days, Custom Range.`);
  };

  // Mock data for weekly commute distance (km)
  const liamDistanceData = [
    { day: 'Mon', dist: 8.5 },
    { day: 'Tue', dist: 7.2 },
    { day: 'Wed', dist: 9.1 },
    { day: 'Thu', dist: 6.8 },
    { day: 'Fri', dist: 10.2 },
    { day: 'Sat', dist: 4.5 },
    { day: 'Sun', dist: 2.3 },
  ];

  const sophiaDistanceData = [
    { day: 'Mon', dist: 3.2 },
    { day: 'Tue', dist: 2.8 },
    { day: 'Wed', dist: 3.5 },
    { day: 'Thu', dist: 2.4 },
    { day: 'Fri', dist: 4.1 },
    { day: 'Sat', dist: 1.2 },
    { day: 'Sun', dist: 0.5 },
  ];

  const weeklyDistanceData = selectedChild === 'liam' ? liamDistanceData : sophiaDistanceData;

  // Helper to scale bar heights dynamically
  const maxDistance = selectedChild === 'liam' ? 10.2 : 4.1;
  const chartHeight = 100;

  // Mock data for safe zones distribution
  const liamZoneDistribution = [
    { zone: 'School Safe Zone', percentage: 45, color: '#3B82F6' },
    { zone: 'Home Safe Zone', percentage: 35, color: '#10B981' },
    { zone: 'Sports Club Safe Zone', percentage: 12, color: '#8B5CF6' },
    { zone: 'Other / In Transit', percentage: 8, color: '#EAB308' },
  ];

  const sophiaZoneDistribution = [
    { zone: 'School Safe Zone', percentage: 30, color: '#3B82F6' },
    { zone: 'Home Safe Zone', percentage: 62, color: '#10B981' },
    { zone: 'Sports Club Safe Zone', percentage: 5, color: '#8B5CF6' },
    { zone: 'Other / In Transit', percentage: 3, color: '#EAB308' },
  ];

  const zoneDistribution = selectedChild === 'liam' ? liamZoneDistribution : sophiaZoneDistribution;

  const activeHours = selectedChild === 'liam' ? '34.5 Hrs' : '12.8 Hrs';
  const avgSpeed = selectedChild === 'liam' ? '14.2 km/h' : '8.5 km/h';
  const totalCommute = selectedChild === 'liam' ? 'Total: 48.6 km traveled' : 'Total: 17.7 km traveled';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <MaterialIcons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.headerTextContainer}>
          <Text style={[Typography.bold, styles.headerTitle]}>
            Analytics & Reports
          </Text>
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
          activeOpacity={0.8}
        >
          <MaterialIcons name="filter-list" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Child Selector Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 16, zIndex: 10 }}>
        <Text style={[Typography.medium, { fontSize: 13, color: colors.textSecondary, fontFamily: 'Poppins-Medium' }]}>
          Showing reports for:
        </Text>
        
        <View style={{ position: 'relative' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowDropdown(!showDropdown)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : '#EFF4FA',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
              borderWidth: 0.5,
              borderColor: colors.border,
            }}
          >
            <Text style={[Typography.bold, { fontSize: 12, color: colors.textPrimary, marginRight: 4, fontFamily: 'Poppins-Bold' }]}>
              {selectedChild === 'liam' ? 'Liam Carter' : 'Sophia Carter'}
            </Text>
            <MaterialIcons name="expand-more" size={16} color={colors.textPrimary} />
          </TouchableOpacity>

          {showDropdown && (
            <View style={{
              position: 'absolute',
              top: 36,
              right: 0,
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              borderRadius: 12,
              borderWidth: 0.5,
              borderColor: colors.border,
              paddingVertical: 4,
              width: 130,
              zIndex: 50,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 6,
              elevation: 5,
            }}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedChild('liam');
                  setShowDropdown(false);
                }}
                style={{ paddingVertical: 8, paddingHorizontal: 12 }}
              >
                <Text style={[Typography.medium, { fontSize: 12, color: selectedChild === 'liam' ? colors.primary : colors.textPrimary, fontFamily: selectedChild === 'liam' ? 'Poppins-Bold' : 'Poppins-Regular' }]}>
                  Liam Carter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedChild('sophia');
                  setShowDropdown(false);
                }}
                style={{ paddingVertical: 8, paddingHorizontal: 12, borderTopWidth: 0.5, borderTopColor: colors.border }}
              >
                <Text style={[Typography.medium, { fontSize: 12, color: selectedChild === 'sophia' ? colors.primary : colors.textPrimary, fontFamily: selectedChild === 'sophia' ? 'Poppins-Bold' : 'Poppins-Regular' }]}>
                  Sophia Carter
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Content Scroll container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      >
        {/* Row of stats cards */}
        <View style={styles.statsContainer}>
          {/* Card 1: Active Tracking */}
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
              <MaterialIcons name="access-time" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statTitle}>Active Tracking</Text>
            <Text style={styles.statValue}>{activeHours}</Text>
            <Text style={styles.statSubtext}>This Week</Text>
          </View>

          {/* Card 2: Average Commute Speed */}
          <View style={[styles.statCard, styles.statCardLast]}>
            <View style={[styles.statIconContainer, { backgroundColor: 'rgba(234, 179, 8, 0.15)' }]}>
              <MaterialIcons name="speed" size={20} color="#EAB308" />
            </View>
            <Text style={styles.statTitle}>Avg Commute</Text>
            <Text style={styles.statValue}>{avgSpeed}</Text>
            <Text style={styles.statSubtext}>GPS Sensors</Text>
          </View>
        </View>

        {/* Card 2: Weekly Distance Bar Chart */}
        <View style={styles.chartCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.chartTitle}>Weekly Commute Distance</Text>
              <Text style={styles.chartSubtitle}>{totalCommute}</Text>
            </View>
            <Text style={[Typography.bold, { fontSize: 13, color: colors.primary }]}>June 2026</Text>
          </View>

          {/* Bar Chart Bars */}
          <View style={styles.barChartContainer}>
            {weeklyDistanceData.map((data, index) => {
              // Calculate scaled bar height
              const barHeight = (data.dist / maxDistance) * chartHeight;
              return (
                <View key={index} style={styles.barWrapper}>
                  <Text style={styles.barValue}>{data.dist} km</Text>
                  <View style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: index === 4 ? colors.primary : 'rgba(59, 130, 246, 0.4)', // Highlight Friday
                    }
                  ]} />
                  <Text style={styles.barLabel}>{data.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Card 3: Zone Activity Breakdown Progress Bars */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Zone Activity Distribution</Text>
          <Text style={styles.chartSubtitle}>Time spent in Safe Zones vs Transit</Text>

          {/* Breakdown progress rows */}
          <View style={styles.breakdownList}>
            {zoneDistribution.map((item, index) => (
              <View key={index} style={styles.breakdownRow}>
                <View style={styles.breakdownHeader}>
                  <Text style={styles.breakdownLabel}>{item.zone}</Text>
                  <Text style={styles.breakdownValue}>{item.percentage}%</Text>
                </View>

                {/* Progress bar line */}
                <View style={styles.progressBarBg}>
                  <View style={[
                    styles.progressBarFill,
                    {
                      width: `${item.percentage}%`,
                      backgroundColor: item.color,
                    }
                  ]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReportScreen;
