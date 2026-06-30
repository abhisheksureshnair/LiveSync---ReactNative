import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';

const ControlScreen = () => {
  const navigation = useNavigation();
  const { theme, colors } = useContext(AppContext);
  const styles = getStyles(colors);
  const isDark = theme === 'dark';

  // Child selection states
  const [selectedChild, setSelectedChild] = useState('liam'); // 'liam' or 'sophia'
  const [showDropdown, setShowDropdown] = useState(false);

  // App control toggle states (grouped by child)
  const [liamControls, setLiamControls] = useState({
    socialMedia: true,
    screenTimeLimit: true,
    homeworkMode: false,
  });

  const [sophiaControls, setSophiaControls] = useState({
    socialMedia: false,
    screenTimeLimit: true,
    homeworkMode: true,
  });

  // Geofence lists states (grouped by child)
  const [liamGeofences, setLiamGeofences] = useState([
    { id: 1, name: 'School Safe Zone', radius: 200, icon: 'school' },
    { id: 2, name: 'Home Safe Zone', radius: 150, icon: 'home' },
  ]);

  const [sophiaGeofences, setSophiaGeofences] = useState([
    { id: 1, name: 'Home Safe Zone', radius: 150, icon: 'home' },
    { id: 2, name: 'Leisure Park Safe Zone', radius: 300, icon: 'park' },
  ]);

  // Form states for creating a new geofence
  const [zoneName, setZoneName] = useState('');
  const [zoneRadius, setZoneRadius] = useState(200);

  // Active getters/setters based on selection
  const activeControls = selectedChild === 'liam' ? liamControls : sophiaControls;
  const activeGeofences = selectedChild === 'liam' ? liamGeofences : sophiaGeofences;

  const handleToggleControl = (key) => {
    if (selectedChild === 'liam') {
      setLiamControls(prev => ({ ...prev, [key]: !prev[key] }));
    } else {
      setSophiaControls(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleAddGeofence = () => {
    if (!zoneName.trim()) {
      Alert.alert("Invalid Input", "Please enter a name for the Safe Zone.");
      return;
    }

    const newGeofence = {
      id: Date.now(),
      name: zoneName.trim(),
      radius: zoneRadius,
      icon: 'location-on',
    };

    if (selectedChild === 'liam') {
      setLiamGeofences(prev => [...prev, newGeofence]);
    } else {
      setSophiaGeofences(prev => [...prev, newGeofence]);
    }

    Alert.alert("Safe Zone Added", `"${zoneName.trim()}" has been set up with a ${zoneRadius}m radius boundary.`);
    setZoneName('');
    setZoneRadius(200);
  };

  const handleDeleteGeofence = (id, name) => {
    Alert.alert(
      "Remove Safe Zone",
      `Are you sure you want to remove the "${name}" geofence?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            if (selectedChild === 'liam') {
              setLiamGeofences(prev => prev.filter(g => g.id !== id));
            } else {
              setSophiaGeofences(prev => prev.filter(g => g.id !== id));
            }
          }
        }
      ]
    );
  };

  // Adjust Radius Helper Toggles
  const incrementRadius = () => {
    setZoneRadius(prev => Math.min(prev + 50, 1000));
  };
  const decrementRadius = () => {
    setZoneRadius(prev => Math.max(prev - 50, 50));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
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
            Device Control
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      >
        {/* Child Selector Row */}
        <View style={styles.childToggleContainer}>
          <Text style={styles.childToggleText}>Configure Settings for:</Text>
          
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowDropdown(!showDropdown)}
              style={styles.dropdownTrigger}
            >
              <Text style={styles.dropdownTriggerText}>
                {selectedChild === 'liam' ? 'Liam Carter' : 'Sophia Carter'}
              </Text>
              <MaterialIcons name="expand-more" size={16} color={colors.textPrimary} />
            </TouchableOpacity>

            {showDropdown && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedChild('liam');
                    setShowDropdown(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    {
                      color: selectedChild === 'liam' ? colors.primary : colors.textPrimary,
                      fontFamily: selectedChild === 'liam' ? 'Poppins-Bold' : 'Poppins-Regular'
                    }
                  ]}>
                    Liam Carter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedChild('sophia');
                    setShowDropdown(false);
                  }}
                  style={[styles.dropdownItem, styles.dropdownItemBorder]}
                >
                  <Text style={[
                    styles.dropdownItemText,
                    {
                      color: selectedChild === 'sophia' ? colors.primary : colors.textPrimary,
                      fontFamily: selectedChild === 'sophia' ? 'Poppins-Bold' : 'Poppins-Regular'
                    }
                  ]}>
                    Sophia Carter
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Section 1: Child App Restrictions */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>App Control on Child Phone</Text>
          <Text style={styles.sectionSubtitle}>Restrict phone usage and set schedule alerts</Text>

          {/* Toggle 1: Social Media Blocking */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.toggleLabel}>Block Social Media</Text>
              <Text style={styles.toggleDescription}>Restrict access to TikTok, IG, and Snapchat during study hours</Text>
            </View>
            <Switch
              value={activeControls.socialMedia}
              onValueChange={() => handleToggleControl('socialMedia')}
              trackColor={{ false: '#BDC3C7', true: colors.primary }}
              thumbColor={isDark ? '#F5F6FA' : '#FFFFFF'}
            />
          </View>

          {/* Toggle 2: Screen Time Limit */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.toggleLabel}>Screen Time Limits</Text>
              <Text style={styles.toggleDescription}>Apply a maximum screen limit of 2 hours daily</Text>
            </View>
            <Switch
              value={activeControls.screenTimeLimit}
              onValueChange={() => handleToggleControl('screenTimeLimit')}
              trackColor={{ false: '#BDC3C7', true: colors.primary }}
              thumbColor={isDark ? '#F5F6FA' : '#FFFFFF'}
            />
          </View>

          {/* Toggle 3: Homework Mode */}
          <View style={[styles.toggleRow, styles.toggleRowLast]}>
            <View style={styles.toggleLabelContainer}>
              <Text style={styles.toggleLabel}>Homework Focus Mode</Text>
              <Text style={styles.toggleDescription}>Mute gaming and messaging notifications after school</Text>
            </View>
            <Switch
              value={activeControls.homeworkMode}
              onValueChange={() => handleToggleControl('homeworkMode')}
              trackColor={{ false: '#BDC3C7', true: colors.primary }}
              thumbColor={isDark ? '#F5F6FA' : '#FFFFFF'}
            />
          </View>
        </View>

        {/* Section 2: Create Geofence */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Add Safe Zone Geofence</Text>
          <Text style={styles.sectionSubtitle}>Get notified immediately when they enter or leave these bounds</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Zone Name:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Grandma's House, City Library"
              placeholderTextColor={colors.textSecondarySlate}
              value={zoneName}
              onChangeText={setZoneName}
            />
          </View>

          {/* Interactive Geofence Map Preview */}
          <View style={{
            height: 120,
            borderRadius: 14,
            overflow: 'hidden',
            marginBottom: 16,
            borderWidth: 0.5,
            borderColor: colors.border,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image
              source={require('../../assets/image/map.png')}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
            />
            
            {/* Dynamic Geofence Circle Boundary */}
            <View style={{
              width: 30 + (zoneRadius / 6),
              height: 30 + (zoneRadius / 6),
              borderRadius: (30 + (zoneRadius / 6)) / 2,
              backgroundColor: 'rgba(59, 130, 246, 0.22)',
              borderWidth: 1.5,
              borderColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            }}>
              {/* Centered Pin Icon */}
              <MaterialIcons name="place" size={24} color={colors.primary} />
            </View>
          </View>

          <Text style={styles.inputLabel}>Safe Zone Radius Range:</Text>
          <View style={styles.sliderRow}>
            <TouchableOpacity onPress={decrementRadius} style={{ padding: 4 }}>
              <MaterialIcons name="remove-circle-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.sliderValue}>{zoneRadius} meters</Text>
            <TouchableOpacity onPress={incrementRadius} style={{ padding: 4 }}>
              <MaterialIcons name="add-circle-outline" size={22} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleAddGeofence}
            activeOpacity={0.8}
          >
            <Text style={styles.actionBtnText}>Add Safe Zone</Text>
          </TouchableOpacity>
        </View>

        {/* Section 3: Geofence List */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Active Safe Zones</Text>
          <Text style={styles.sectionSubtitle}>Currently configured geofence parameters</Text>

          {activeGeofences.length > 0 ? (
            activeGeofences.map((item, index) => {
              const isLast = index === activeGeofences.length - 1;
              return (
                <View
                  key={item.id}
                  style={[
                    styles.geofenceItem,
                    isLast && styles.geofenceItemLast
                  ]}
                >
                  <View style={styles.geofenceIconContainer}>
                    <MaterialIcons
                      name={item.icon === 'school' ? 'school' : item.icon === 'home' ? 'home' : 'place'}
                      size={18}
                      color={colors.primary}
                    />
                  </View>

                  <View style={styles.geofenceDetails}>
                    <Text style={styles.geofenceTitle}>{item.name}</Text>
                    <Text style={styles.geofenceSub}>Radius: {item.radius}m boundary</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteGeofence(item.id, item.name)}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name="delete-outline" size={20} color={colors.error || '#EF4444'} />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text style={[Typography.medium, { fontSize: 12, color: colors.textSecondarySlate, textAlign: 'center', marginTop: 12 }]}>
              No Safe Zones set up yet.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ControlScreen;
