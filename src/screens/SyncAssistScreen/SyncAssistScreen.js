import React, { useState, useRef, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../../theme';
import { AppContext } from '../../context/AppContext';
import { getStyles } from './styles';

const SyncAssistScreen = () => {
  const navigation = useNavigation();
  const { theme, colors, parentProfileImage } = useContext(AppContext);
  const isDark = theme === 'dark';
  const styles = getStyles(colors, isDark);

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      text: text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate AI typing and response
    setTimeout(() => {
      let botResponseText = "I'm looking into that for you. One moment please...";

      const lowerText = text.toLowerCase();
      if (lowerText.includes('liam') || lowerText.includes('track') || lowerText.includes('bus')) {
        botResponseText = 'Liam Carter is currently on the way home. His phone GPS is online and active. Liam is 1.5 km away from your location and is estimated to arrive in approximately 8 minutes.';
      } else if (lowerText.includes('sophia') || lowerText.includes('home')) {
        botResponseText = 'Sophia Carter safely arrived home at 03:45 PM. She is currently within the Home Safe Zone.';
      } else if (lowerText.includes('late') || lowerText.includes('delay') || lowerText.includes('battery')) {
        botResponseText = 'All devices are connecting properly. Sophia\'s phone battery is at 92% and Liam\'s phone battery is at 84%.';
      } else if (lowerText.includes('driver') || lowerText.includes('call') || lowerText.includes('phone')) {
        botResponseText = 'You can reach Liam directly at +91 98765 43210, or press the Call button on the live tracking screen.';
      } else if (lowerText.includes('update') || lowerText.includes('school') || lowerText.includes('safe')) {
        botResponseText = 'Safe zone updates: Sophia is at the Home Safe Zone. Liam has left the School Safe Zone. Both devices are transmitting location data.';
      }

      const botMsg = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  const mainContent = (
    <SafeAreaView style={[styles.safe, isDark && { backgroundColor: 'transparent' }]}>
      <StatusBar
        backgroundColor={isDark ? 'transparent' : colors.cardBackground}
        barStyle={isDark || colors.textPrimary === '#F8FAFC' ? 'light-content' : 'dark-content'}
        translucent={isDark}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButtonRaw}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-back" size={24} color={isDark ? '#FFFFFF' : colors.primary} />
            </TouchableOpacity>

            <View style={styles.headerTextContainer}>
              <Text style={[Typography.bold, styles.headerTitle]}>
                LiveSync AI
              </Text>
              <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>ONLINE</Text>
              </View>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Profile')}
            >
              <Image
                source={
                  parentProfileImage
                    ? { uri: parentProfileImage }
                    : require('../../assets/image/parent_avatar.png')
                }
                style={styles.profileAvatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Conversation / Landing Area */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.contentArea}
          contentContainerStyle={styles.contentAreaContent}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.length === 0 ? (
            /* Welcome Landing State */
            <View style={styles.welcomeContainer}>
              {/* Floating Speech Bubble Above Bot */}
              <View style={styles.speechBubble}>
                <View style={styles.speechIconContainer}>
                  <MaterialIcons name="school" size={14} color={colors.primary} />
                </View>
                <Text style={[Typography.bold, styles.speechText]}>How can I help?</Text>
                {/* Custom Beak */}
                <View style={styles.speechBubbleBeak} />
              </View>

              {/* Central Bot Image */}
              <Image
                source={require('../../assets/image/sync_bot.png')}
                style={styles.botImage}
              />

              {/* Title & Subtitle */}
              <Text style={[Typography.bold, styles.welcomeTitle]}>
                Hello, I'm SyncBot!
              </Text>
              <Text style={[Typography.medium, styles.welcomeSubtitle]}>
                Your personal family locator assistant. How can I help you today?
              </Text>

              {/* 2x2 Grid of Actions */}
              <View style={styles.gridContainer}>
                {/* Row 1 */}
                <View style={styles.gridRow}>
                  <TouchableOpacity
                    style={styles.gridCard}
                    activeOpacity={0.9}
                    onPress={() => handleSend('Where is Liam right now?')}
                  >
                    <View style={[styles.cardIconBadge, { backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : colors.primaryLight }]}>
                      <MaterialIcons name="person-pin-circle" size={20} color={colors.primary} />
                    </View>
                    <Text style={[Typography.bold, styles.cardText]}>Track Child</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.gridCard}
                    activeOpacity={0.9}
                    onPress={() => handleSend("Call Liam")}
                  >
                    <View style={[styles.cardIconBadge, { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : colors.successLight }]}>
                      <MaterialIcons name="phone" size={20} color={colors.success} />
                    </View>
                    <Text style={[Typography.bold, styles.cardText]}>Call Child</Text>
                  </TouchableOpacity>
                </View>

                {/* Row 2 */}
                <View style={styles.gridRow}>
                  <TouchableOpacity
                    style={styles.gridCard}
                    activeOpacity={0.9}
                    onPress={() => handleSend('Show Safe Zones')}
                  >
                    <View style={[styles.cardIconBadge, { backgroundColor: isDark ? 'rgba(168, 85, 247, 0.15)' : colors.purpleAccentBg }]}>
                      <MaterialIcons name="place" size={20} color={colors.purpleAccent} />
                    </View>
                    <Text style={[Typography.bold, styles.cardText]}>Safe Zones</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.gridCard}
                    activeOpacity={0.9}
                    onPress={() => handleSend('Show battery status')}
                  >
                    <View style={[styles.cardIconBadge, { backgroundColor: isDark ? 'rgba(56, 189, 248, 0.15)' : colors.skyBlueAccentBg }]}>
                      <MaterialIcons name="battery-std" size={20} color={colors.skyBlueAccent} />
                    </View>
                    <Text style={[Typography.bold, styles.cardText]}>Battery Status</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            /* Active Chat Bubble View */
            <View style={styles.chatList}>
              {/* Initial Bot Welcome Bubble */}
              <View style={[styles.messageBubbleContainer, styles.botAlign]}>
                <View style={styles.avatarMini}>
                  <MaterialIcons name="smart-toy" size={14} color={colors.white} />
                </View>
                <View style={[styles.messageBubble, styles.botBubble]}>
                  <Text style={[Typography.medium, styles.messageText, styles.botText]}>
                    Hello! I am LiveSync Assist, your AI family locator assistant. How can I help you today?
                  </Text>
                  <Text style={[styles.timeText, styles.botTime]}>10:30 AM</Text>
                </View>
              </View>

              {/* Dynamic message bubbles */}
              {messages.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.messageBubbleContainer,
                    item.sender === 'user' ? styles.userAlign : styles.botAlign,
                  ]}
                >
                  {item.sender === 'bot' && (
                    <View style={styles.avatarMini}>
                      <MaterialIcons name="smart-toy" size={14} color={colors.white} />
                    </View>
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      item.sender === 'user' ? styles.userBubble : styles.botBubble,
                    ]}
                  >
                    <Text
                      style={[
                        Typography.medium,
                        styles.messageText,
                        item.sender === 'user' ? styles.userText : styles.botText,
                      ]}
                    >
                      {item.text}
                    </Text>
                    <Text
                      style={[
                        styles.timeText,
                        item.sender === 'user' ? styles.userTime : styles.botTime,
                      ]}
                    >
                      {item.time}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Bottom Input Area */}
        <View style={styles.inputArea}>
          <View style={styles.inputBar}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask anything about location tracking"
              placeholderTextColor={isDark ? 'rgba(255, 255, 255, 0.4)' : colors.textMuted}
              style={[Typography.medium, styles.textInput]}
            />
          </View>
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            disabled={!inputText.trim()}
            onPress={() => handleSend()}
            activeOpacity={0.8}
          >
            <View style={styles.sendIconWrapper}>
              <MaterialIcons name="send" size={18} color={colors.white} />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  if (isDark) {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={[
            'rgba(6, 13, 31, 1)',
            'rgba(10, 31, 68, 1)',
            'rgba(6, 13, 31, 1)',
          ]}
          locations={[0.0, 0.4, 1.0]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {mainContent}
      </View>
    );
  }

  return mainContent;
};

export default SyncAssistScreen;
