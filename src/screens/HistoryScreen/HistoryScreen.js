import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';

const HistoryScreen = () => {
  const navigation = useNavigation();
  const { theme, colors } = useContext(AppContext);
  const styles = getStyles(colors);
  const isDark = theme === 'dark';

  // State to track selected day in calendar (default: 25th)
  const [selectedDay, setSelectedDay] = useState(25);

  const daysData = [
    { label: 'Mon', num: 21 },
    { label: 'Tue', num: 22 },
    { label: 'Wed', num: 23 },
    { label: 'Thu', num: 24 },
    { label: 'Fri', num: 25 },
    { label: 'Sat', num: 26 },
    { label: 'Sun', num: 27 },
  ];

  // Simulated mock travel history logs keyed by date number
  const tripsData = {
    25: [
      {
        id: 1,
        title: 'Morning School Commute',
        distance: '6.4 km',
        duration: '18 mins',
        location: 'Green Valley School Safe Zone',
        time: '08:15 AM - 08:33 AM',
      },
      {
        id: 2,
        title: 'Afternoon Sports Club Commute',
        distance: '4.2 km',
        duration: '12 mins',
        location: 'City Sports Center Area',
        time: '03:30 PM - 03:42 PM',
      },
      {
        id: 3,
        title: 'Commute Back Home',
        distance: '10.6 km',
        duration: '26 mins',
        location: 'Home Safe Zone',
        time: '05:10 PM - 05:36 PM',
      },
    ],
    24: [
      {
        id: 1,
        title: 'School Outing Commute',
        distance: '12.8 km',
        duration: '35 mins',
        location: 'Science Museum Outing Zone',
        time: '09:00 AM - 09:35 AM',
      },
      {
        id: 2,
        title: 'Return Trip to School',
        distance: '12.5 km',
        duration: '32 mins',
        location: 'Green Valley School Safe Zone',
        time: '02:00 PM - 02:32 PM',
      },
    ],
    26: [
      {
        id: 1,
        title: 'Weekend Park Commute',
        distance: '3.1 km',
        duration: '9 mins',
        location: 'Central Leisure Park Zone',
        time: '11:15 AM - 11:24 AM',
      },
    ],
  };

  const handleReplay = (tripTitle) => {
    Alert.alert(
      'Interactive Replay',
      `Loading travel route replay for "${tripTitle}"...`
    );
  };

  const selectedTrips = tripsData[selectedDay] || [];

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
            Trip History
          </Text>
        </View>
      </View>

      {/* Calendar Header and Date Pill Selector */}
      <View style={styles.calendarContainer}>
        <Text style={[Typography.bold, styles.monthText]}>
          June 2026
        </Text>
        
        <View style={styles.daysRow}>
          {daysData.map((day) => {
            const isActive = day.num === selectedDay;
            return (
              <TouchableOpacity
                key={day.num}
                activeOpacity={0.85}
                onPress={() => setSelectedDay(day.num)}
                style={[
                  styles.dayPill,
                  isActive && styles.dayPillActive,
                ]}
              >
                <Text style={[
                  styles.dayLabel,
                  isActive && styles.dayLabelActive,
                ]}>
                  {day.label}
                </Text>
                <Text style={[
                  styles.dayNum,
                  isActive && styles.dayNumActive,
                ]}>
                  {day.num}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Trips list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {selectedTrips.length > 0 ? (
          selectedTrips.map((trip) => (
            <View key={trip.id} style={styles.card}>
              <View style={styles.cardTop}>
                {/* Stylized Static Map Preview Thumbnail */}
                <View style={styles.thumbnailContainer}>
                  <Image
                    source={require('../../assets/image/map.png')}
                    style={styles.thumbnailMap}
                    resizeMode="cover"
                  />
                  {/* Overlay tiny path line to make it look like a route */}
                  <View style={{
                    position: 'absolute',
                    top: '25%',
                    left: '20%',
                    right: '30%',
                    height: 3,
                    backgroundColor: colors.primary,
                    borderRadius: 2,
                    transform: [{ rotate: '35deg' }],
                  }} />
                </View>

                {/* Stat details on the right */}
                <View style={styles.statsColumn}>
                  {/* Title & Time */}
                  <Text style={[Typography.bold, { fontSize: 13, color: colors.textPrimary, marginBottom: 8, lineHeight: 16 }]} numberOfLines={1}>
                    {trip.title}
                  </Text>
                  
                  {/* Stat: Distance */}
                  <View style={styles.statRow}>
                    <View style={styles.statIconBox}>
                      <MaterialIcons name="navigation" size={13} color={colors.primary} />
                    </View>
                    <View style={styles.statTextContainer}>
                      <Text style={styles.statLabel}>Distance:</Text>
                      <Text style={styles.statValue}>{trip.distance}</Text>
                    </View>
                  </View>

                  {/* Stat: Duration */}
                  <View style={styles.statRow}>
                    <View style={styles.statIconBox}>
                      <MaterialIcons name="access-time" size={13} color={colors.primary} />
                    </View>
                    <View style={styles.statTextContainer}>
                      <Text style={styles.statLabel}>Duration:</Text>
                      <Text style={styles.statValue}>{trip.duration}</Text>
                    </View>
                  </View>

                  {/* Stat: Destination */}
                  <View style={[styles.statRow, { marginBottom: 0 }]}>
                    <View style={styles.statIconBox}>
                      <MaterialIcons name="place" size={13} color={colors.primary} />
                    </View>
                    <View style={styles.statTextContainer}>
                      <Text style={styles.statLabel}>Destination:</Text>
                      <Text style={styles.statValue} numberOfLines={1}>{trip.location}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Button: Interactive Replay */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleReplay(trip.title)}
                style={styles.replayBtn}
              >
                <Text style={styles.replayBtnText}>Interactive Replay</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <MaterialIcons name="event-busy" size={48} color={colors.textSecondary} />
            <Text style={styles.noDataText}>No tracking history log on this date.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryScreen;
