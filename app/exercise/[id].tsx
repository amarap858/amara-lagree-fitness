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
import { ArrowLeft, Clock, Target, Lightbulb, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, TrendingUp, TrendingDown, Play } from 'lucide-react-native';
import { exercises } from '@/data/workouts';

const { width } = Dimensions.get('window');

export default function ExerciseDetailScreen() {
  const { id } = useLocalSearchParams();
  const [showModifications, setShowModifications] = useState(false);

  const exercise = exercises.find(e => e.id === parseInt(id as string));

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text>Exercise not found</Text>
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
          <View style={[
            styles.difficultyBadge,
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
        
        <View style={styles.headerContent}>
          <Text style={styles.exerciseName}>{exercise.name}</Text>
          <Text style={styles.exerciseDescription}>{exercise.description}</Text>
          
          <View style={styles.exerciseMeta}>
            <View style={styles.metaItem}>
              <Clock size={16} color="#64748B" />
              <Text style={styles.metaText}>{exercise.duration}s work</Text>
            </View>
            <View style={styles.metaItem}>
              <Target size={16} color="#64748B" />
              <Text style={styles.metaText}>{exercise.rest}s rest</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Target Muscles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Muscles</Text>
          <View style={styles.muscleGrid}>
            {exercise.targetMuscles.map((muscle, index) => (
              <View key={index} style={styles.muscleTag}>
                <Text style={styles.muscleText}>{muscle}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How to Perform</Text>
          <View style={styles.instructionsList}>
            {exercise.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Lightbulb size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Pro Tips</Text>
          </View>
          <View style={styles.tipsList}>
            {exercise.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <CheckCircle2 size={16} color="#10B981" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Equipment */}
        {exercise.equipment && exercise.equipment.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Equipment Needed</Text>
            <View style={styles.equipmentList}>
              {exercise.equipment.map((item, index) => (
                <View key={index} style={styles.equipmentItem}>
                  <CheckCircle2 size={16} color="#FF6B9D" />
                  <Text style={styles.equipmentText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Modifications */}
        {exercise.modifications && (
          <View style={styles.section}>
            <TouchableOpacity 
              style={styles.modificationsHeader}
              onPress={() => setShowModifications(!showModifications)}>
              <Text style={styles.sectionTitle}>Modifications</Text>
              <Text style={styles.toggleText}>
                {showModifications ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
            
            {showModifications && (
              <View style={styles.modificationsContent}>
                <View style={styles.modificationCard}>
                  <LinearGradient
                    colors={['#DCFCE7', '#F0FDF4']}
                    style={styles.modificationGradient}>
                    <View style={styles.modificationHeader}>
                      <TrendingDown size={20} color="#10B981" />
                      <Text style={styles.modificationTitle}>Make it Easier</Text>
                    </View>
                    <Text style={styles.modificationText}>
                      {exercise.modifications.easier}
                    </Text>
                  </LinearGradient>
                </View>
                
                <View style={styles.modificationCard}>
                  <LinearGradient
                    colors={['#FEF3C7', '#FFFBEB']}
                    style={styles.modificationGradient}>
                    <View style={styles.modificationHeader}>
                      <TrendingUp size={20} color="#F59E0B" />
                      <Text style={styles.modificationTitle}>Make it Harder</Text>
                    </View>
                    <Text style={styles.modificationText}>
                      {exercise.modifications.harder}
                    </Text>
                  </LinearGradient>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Safety Note */}
        <View style={styles.section}>
          <View style={styles.safetyCard}>
            <LinearGradient
              colors={['#FEF2F2', '#FEF7F7']}
              style={styles.safetyGradient}>
              <View style={styles.safetyHeader}>
                <AlertCircle size={20} color="#EF4444" />
                <Text style={styles.safetyTitle}>Safety First</Text>
              </View>
              <Text style={styles.safetyText}>
                Listen to your body and stop if you feel pain. Focus on proper form over speed or intensity. 
                If you're new to exercise or have any health concerns, consult with a healthcare provider before starting.
              </Text>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

      {/* Practice Button */}
      <View style={styles.practiceButtonContainer}>
        <TouchableOpacity style={styles.practiceButton}>
          <LinearGradient
            colors={['#FF6B9D', '#F472B6']}
            style={styles.practiceButtonGradient}>
            <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
            <Text style={styles.practiceButtonText}>Practice This Exercise</Text>
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
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
  headerContent: {
    alignItems: 'flex-start',
  },
  exerciseName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
    marginBottom: 8,
  },
  exerciseDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 16,
  },
  exerciseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
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
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginLeft: 8,
  },
  muscleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  muscleTag: {
    backgroundColor: '#FF6B9D20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  muscleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FF6B9D',
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    flex: 1,
  },
  tipsList: {
    gap: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  equipmentList: {
    gap: 8,
  },
  equipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equipmentText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    marginLeft: 8,
  },
  modificationsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  toggleText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF6B9D',
  },
  modificationsContent: {
    gap: 12,
  },
  modificationCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  modificationGradient: {
    padding: 16,
  },
  modificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modificationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 8,
  },
  modificationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  safetyCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  safetyGradient: {
    padding: 16,
  },
  safetyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  safetyTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    marginLeft: 8,
  },
  safetyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  practiceButtonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  practiceButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  practiceButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  practiceButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});