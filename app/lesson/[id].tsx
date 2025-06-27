import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Play, Clock, Users, Target, Zap, Heart, CircleCheck as CheckCircle2, BookOpen, Award } from 'lucide-react-native';
import { lessons } from '@/data/workouts';

const { width } = Dimensions.get('window');

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isFavorited, setIsFavorited] = useState(false);

  const lesson = lessons.find(l => l.id === parseInt(id as string));

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Lesson not found</Text>
      </View>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#06B6D4';
      case 'Intermediate': return '#A855F7';
      case 'Advanced': return '#FF6B9D';
      default: return '#64748B';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return <Users size={16} color="#06B6D4" />;
      case 'Intermediate': return <Zap size={16} color="#A855F7" />;
      case 'Advanced': return <Zap size={16} color="#FF6B9D" />;
      default: return <Users size={16} color="#64748B" />;
    }
  };

  const handleStartLesson = () => {
    router.push(`/timer/${lesson.id}`);
  };

  const totalDuration = lesson.exercises.reduce((sum, exercise) => sum + exercise.duration + exercise.rest, 0);
  const totalMinutes = Math.ceil(totalDuration / 60);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#FDF2F8', '#FCE7F3']}
        style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1E293B" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => setIsFavorited(!isFavorited)}>
            <Heart 
              size={24} 
              color={isFavorited ? "#FF6B9D" : "#64748B"}
              fill={isFavorited ? "#FF6B9D" : "transparent"}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerContent}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{lesson.category}</Text>
          </View>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
          
          <View style={styles.lessonMeta}>
            <View style={styles.metaItem}>
              <Clock size={16} color="#64748B" />
              <Text style={styles.metaText}>{totalMinutes} min</Text>
            </View>
            <View style={styles.metaItem}>
              {getDifficultyIcon(lesson.difficulty)}
              <Text style={[styles.metaText, { color: getDifficultyColor(lesson.difficulty) }]}>
                {lesson.difficulty}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Target size={16} color="#64748B" />
              <Text style={styles.metaText}>{lesson.exercises.length} exercises</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Learning Objectives */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Award size={20} color="#FF6B9D" />
            <Text style={styles.sectionTitle}>Learning Objectives</Text>
          </View>
          <View style={styles.objectivesList}>
            {lesson.learningObjectives.map((objective, index) => (
              <View key={index} style={styles.objectiveItem}>
                <CheckCircle2 size={16} color="#FF6B9D" />
                <Text style={styles.objectiveText}>{objective}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Lesson Structure */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <BookOpen size={20} color="#FF6B9D" />
            <Text style={styles.sectionTitle}>Lesson Structure</Text>
          </View>
          
          {/* Warm-up */}
          {lesson.warmUp && lesson.warmUp.length > 0 && (
            <View style={styles.phaseSection}>
              <Text style={styles.phaseTitle}>Warm-up</Text>
              {lesson.warmUp.map((exercise, index) => (
                <View key={exercise.id} style={styles.exercisePreview}>
                  <Text style={styles.exercisePreviewName}>{exercise.name}</Text>
                  <Text style={styles.exercisePreviewDuration}>
                    {Math.ceil(exercise.duration / 60)} min
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Main Exercises */}
          <View style={styles.phaseSection}>
            <Text style={styles.phaseTitle}>Main Workout</Text>
            {lesson.exercises.map((exercise, index) => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <LinearGradient
                  colors={['#FFFFFF', '#FAFAFA']}
                  style={styles.exerciseGradient}>
                  <View style={styles.exerciseHeader}>
                    <View style={styles.exerciseNumber}>
                      <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                    </View>
                    <View style={styles.exerciseInfo}>
                      <Text style={styles.exerciseName}>{exercise.name}</Text>
                      <Text style={styles.exerciseDuration}>
                        {exercise.duration}s work • {exercise.rest}s rest
                      </Text>
                      <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                    </View>
                    <View style={[
                      styles.difficultyIndicator,
                      { backgroundColor: getDifficultyColor(exercise.difficulty) + '20' }
                    ]}>
                      <Text style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(exercise.difficulty) }
                      ]}>
                        {exercise.difficulty}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.exerciseMuscles}>
                    {exercise.targetMuscles.map((muscle, idx) => (
                      <View key={idx} style={styles.muscleTag}>
                        <Text style={styles.muscleText}>{muscle}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Exercise Tips */}
                  {exercise.tips && exercise.tips.length > 0 && (
                    <View style={styles.tipsSection}>
                      <Text style={styles.tipsTitle}>Key Tips:</Text>
                      <Text style={styles.tipText}>• {exercise.tips[0]}</Text>
                      {exercise.tips.length > 1 && (
                        <Text style={styles.moreTips}>+{exercise.tips.length - 1} more tips</Text>
                      )}
                    </View>
                  )}
                </LinearGradient>
              </View>
            ))}
          </View>

          {/* Cool-down */}
          {lesson.coolDown && lesson.coolDown.length > 0 && (
            <View style={styles.phaseSection}>
              <Text style={styles.phaseTitle}>Cool-down</Text>
              {lesson.coolDown.map((exercise, index) => (
                <View key={exercise.id} style={styles.exercisePreview}>
                  <Text style={styles.exercisePreviewName}>{exercise.name}</Text>
                  <Text style={styles.exercisePreviewDuration}>
                    {Math.ceil(exercise.duration / 60)} min
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.startButtonContainer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartLesson}>
          <LinearGradient
            colors={['#FF6B9D', '#F472B6']}
            style={styles.startButtonGradient}>
            <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.startButtonText}>Start Lesson</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  categoryBadge: {
    backgroundColor: '#FF6B9D20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FF6B9D',
  },
  lessonTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 8,
  },
  lessonDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 16,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 4,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginLeft: 8,
  },
  objectivesList: {
    gap: 12,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  objectiveText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  phaseSection: {
    marginBottom: 24,
  },
  phaseTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 12,
  },
  exercisePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exercisePreviewName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
  },
  exercisePreviewDuration: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  exerciseCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  exerciseGradient: {
    padding: 16,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  exerciseInfo: {
    flex: 1,
    marginRight: 12,
  },
  exerciseName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  exerciseDuration: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF6B9D',
    marginBottom: 4,
  },
  exerciseDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  difficultyIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
  },
  exerciseMuscles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  muscleTag: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  muscleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#64748B',
  },
  tipsSection: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 12,
  },
  tipsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#1E293B',
    marginBottom: 4,
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#475569',
    lineHeight: 16,
  },
  moreTips: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#A855F7',
    fontStyle: 'italic',
    marginTop: 2,
  },
  startButtonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  startButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  startButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});