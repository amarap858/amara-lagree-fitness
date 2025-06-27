import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { SplashScreen, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Clock, Flame, Target, Dumbbell, BookOpen, Award } from 'lucide-react-native';
import { lessons } from '@/data/workouts';

const { width } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const quickStats = [
    { icon: Flame, label: 'Streak', value: '7 days', color: '#FF6B9D' },
    { icon: Clock, label: 'This Week', value: '180 min', color: '#A855F7' },
    { icon: Target, label: 'Goal', value: '4/5 days', color: '#06B6D4' },
  ];

  const featuredLessons = lessons.slice(0, 3);

  const handleLessonPress = (lessonId: number) => {
    router.push(`/lesson/${lessonId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#06B6D4';
      case 'Intermediate': return '#A855F7';
      case 'Advanced': return '#FF6B9D';
      default: return '#64748B';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#FDF2F8', '#FCE7F3']}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.username}>Amara</Text>
          <Text style={styles.subtitle}>Ready for today's lesson?</Text>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <IconComponent size={20} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Featured Lessons */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Lessons</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/workouts')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {featuredLessons.map((lesson) => (
          <TouchableOpacity 
            key={lesson.id} 
            style={styles.lessonCard}
            onPress={() => handleLessonPress(lesson.id)}>
            <LinearGradient
              colors={['#FFFFFF', '#FAFAFA']}
              style={styles.lessonGradient}>
              <View style={styles.lessonInfo}>
                <View style={styles.lessonHeader}>
                  <Text style={styles.lessonName}>{lesson.title}</Text>
                  <View style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(lesson.difficulty) + '20' }
                  ]}>
                    <Text style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(lesson.difficulty) }
                    ]}>
                      {lesson.difficulty}
                    </Text>
                  </View>
                </View>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                <View style={styles.lessonMeta}>
                  <Text style={styles.lessonDuration}>{lesson.duration} min</Text>
                  <Text style={styles.lessonDivider}>•</Text>
                  <Text style={styles.lessonExercises}>{lesson.exercises.length} exercises</Text>
                  <Text style={styles.lessonDivider}>•</Text>
                  <Text style={styles.lessonCategory}>{lesson.category}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.playButton}>
                <Play size={20} color="#FFFFFF" fill="#FF6B9D" />
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(tabs)/workouts')}>
            <LinearGradient
              colors={['#FF6B9D', '#F472B6']}
              style={styles.actionGradient}>
              <BookOpen size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>Browse Lessons</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(tabs)/progress')}>
            <LinearGradient
              colors={['#A855F7', '#C084FC']}
              style={styles.actionGradient}>
              <Award size={24} color="#FFFFFF" />
              <Text style={styles.actionText}>View Progress</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Daily Tip */}
      <View style={styles.section}>
        <View style={styles.tipCard}>
          <LinearGradient
            colors={['#FEF3C7', '#FFFBEB']}
            style={styles.tipGradient}>
            <View style={styles.tipHeader}>
              <Target size={20} color="#F59E0B" />
              <Text style={styles.tipTitle}>Today's Tip for Amara</Text>
            </View>
            <Text style={styles.tipText}>
              Focus on slow, controlled movements. The Lagree method emphasizes time under tension 
              to maximize muscle engagement and build strength effectively.
            </Text>
          </LinearGradient>
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  username: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#475569',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 32,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1E293B',
  },
  seeAll: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF6B9D',
  },
  lessonCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lessonGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginRight: 12,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
  lessonDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
  },
  lessonDivider: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94A3B8',
    marginHorizontal: 8,
  },
  lessonExercises: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
  },
  lessonCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FF6B9D',
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 8,
    textAlign: 'center',
  },
  tipCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipGradient: {
    padding: 20,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 8,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
});