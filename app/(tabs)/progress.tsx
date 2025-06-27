import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  Calendar, 
  TrendingUp, 
  Target, 
  Clock, 
  Flame, 
  Award,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('Week');
  const [selectedMonth, setSelectedMonth] = useState('December 2024');

  const periods = ['Week', 'Month', 'Year'];

  const weeklyStats = [
    { day: 'Mon', completed: true, duration: 25 },
    { day: 'Tue', completed: true, duration: 30 },
    { day: 'Wed', completed: false, duration: 0 },
    { day: 'Thu', completed: true, duration: 20 },
    { day: 'Fri', completed: true, duration: 35 },
    { day: 'Sat', completed: false, duration: 0 },
    { day: 'Sun', completed: true, duration: 40 },
  ];

  const achievements = [
    { 
      id: 1, 
      title: 'Week Warrior', 
      description: '5 workouts this week', 
      earned: true,
      color: '#FF6B9D' 
    },
    { 
      id: 2, 
      title: 'Consistency King', 
      description: '7 day streak', 
      earned: true,
      color: '#A855F7' 
    },
    { 
      id: 3, 
      title: 'Time Master', 
      description: '150+ minutes this week', 
      earned: true,
      color: '#06B6D4' 
    },
    { 
      id: 4, 
      title: 'Monthly Hero', 
      description: '20 workouts this month', 
      earned: false,
      color: '#F59E0B' 
    },
  ];

  const monthlyData = [
    { week: 'Week 1', workouts: 4, minutes: 120 },
    { week: 'Week 2', workouts: 5, minutes: 150 },
    { week: 'Week 3', workouts: 3, minutes: 90 },
    { week: 'Week 4', workouts: 5, minutes: 160 },
  ];

  const totalMinutes = weeklyStats.reduce((sum, day) => sum + day.duration, 0);
  const completedDays = weeklyStats.filter(day => day.completed).length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#FDF2F8', '#FCE7F3']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Progress</Text>
        <Text style={styles.headerSubtitle}>Track your fitness journey</Text>
      </LinearGradient>

      {/* Weekly Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <LinearGradient
          colors={['#FFFFFF', '#FAFAFA']}
          style={styles.overviewCard}>
          <View style={styles.overviewStats}>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#FF6B9D20' }]}>
                <Flame size={20} color="#FF6B9D" />
              </View>
              <Text style={styles.statValue}>{completedDays}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#A855F720' }]}>
                <Clock size={20} color="#A855F7" />
              </View>
              <Text style={styles.statValue}>{totalMinutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: '#06B6D420' }]}>
                <Target size={20} color="#06B6D4" />
              </View>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Calendar View */}
      <View style={styles.section}>
        <View style={styles.calendarHeader}>
          <Text style={styles.sectionTitle}>Activity Calendar</Text>
          <View style={styles.monthNavigation}>
            <TouchableOpacity style={styles.navButton}>
              <ChevronLeft size={20} color="#64748B" />
            </TouchableOpacity>
            <Text style={styles.monthText}>{selectedMonth}</Text>
            <TouchableOpacity style={styles.navButton}>
              <ChevronRight size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.weeklyActivity}>
          {weeklyStats.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <Text style={styles.dayLabel}>{day.day}</Text>
              <View 
                style={[
                  styles.dayIndicator, 
                  day.completed ? styles.dayCompleted : styles.dayIncomplete
                ]}>
                {day.completed && day.duration > 0 && (
                  <Text style={styles.dayDuration}>{day.duration}m</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Period Selector */}
      <View style={styles.section}>
        <View style={styles.periodSelector}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}>
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period && styles.periodTextActive,
                ]}>
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Charts/Stats Based on Selected Period */}
      {selectedPeriod === 'Month' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Breakdown</Text>
          <LinearGradient
            colors={['#FFFFFF', '#FAFAFA']}
            style={styles.chartCard}>
            {monthlyData.map((week, index) => (
              <View key={index} style={styles.weekRow}>
                <Text style={styles.weekLabel}>{week.week}</Text>
                <View style={styles.weekStats}>
                  <View style={styles.weekStat}>
                    <Text style={styles.weekStatValue}>{week.workouts}</Text>
                    <Text style={styles.weekStatLabel}>workouts</Text>
                  </View>
                  <View style={styles.weekStat}>
                    <Text style={styles.weekStatValue}>{week.minutes}m</Text>
                    <Text style={styles.weekStatLabel}>total</Text>
                  </View>
                </View>
              </View>
            ))}
          </LinearGradient>
        </View>
      )}

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <TouchableOpacity key={achievement.id} style={styles.achievementCard}>
              <LinearGradient
                colors={achievement.earned ? [achievement.color + '20', achievement.color + '10'] : ['#FFFFFF', '#FAFAFA']}
                style={styles.achievementGradient}>
                <View style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.earned ? achievement.color : '#E2E8F0' }
                ]}>
                  <Award size={20} color={achievement.earned ? '#FFFFFF' : '#94A3B8'} />
                </View>
                <Text style={[
                  styles.achievementTitle,
                  { color: achievement.earned ? '#1E293B' : '#94A3B8' }
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  { color: achievement.earned ? '#475569' : '#CBD5E1' }
                ]}>
                  {achievement.description}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E293B',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 16,
  },
  overviewCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    padding: 4,
  },
  monthText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginHorizontal: 12,
  },
  weeklyActivity: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  dayIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCompleted: {
    backgroundColor: '#FF6B9D',
  },
  dayIncomplete: {
    backgroundColor: '#E2E8F0',
  },
  dayDuration: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
  },
  periodButtonActive: {
    backgroundColor: '#FF6B9D',
  },
  periodText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#64748B',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  chartCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  weekLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  weekStats: {
    flexDirection: 'row',
  },
  weekStat: {
    alignItems: 'center',
    marginLeft: 20,
  },
  weekStatValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#FF6B9D',
  },
  weekStatLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: (width - 52) / 2,
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  achievementGradient: {
    padding: 16,
    alignItems: 'center',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
});