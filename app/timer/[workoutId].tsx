import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  SkipForward,
  RotateCcw,
  X,
  Info
} from 'lucide-react-native';
import { lessons } from '@/data/workouts';

const { width, height } = Dimensions.get('window');

export default function TimerScreen() {
  const { workoutId } = useLocalSearchParams();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const lesson = lessons.find(l => l.id === parseInt(workoutId as string));

  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text>Lesson not found</Text>
      </View>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  useEffect(() => {
    // Set initial time when exercise changes
    if (!isResting) {
      setTimeRemaining(currentExercise.duration);
    }
  }, [currentExerciseIndex, isResting]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeRemaining]);

  const handleTimerComplete = () => {
    if (!isResting) {
      // Exercise complete, start rest
      if (currentExercise.rest > 0) {
        setIsResting(true);
        setTimeRemaining(currentExercise.rest);
      } else {
        // No rest, move to next exercise
        moveToNextExercise();
      }
    } else {
      // Rest complete, move to next exercise
      moveToNextExercise();
    }
  };

  const moveToNextExercise = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsResting(false);
      setIsPlaying(false);
    } else {
      // Workout complete
      setWorkoutComplete(true);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = () => {
    setTimeRemaining(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    if (isResting) {
      setTimeRemaining(currentExercise.rest);
    } else {
      setTimeRemaining(currentExercise.duration);
    }
  };

  const handleExit = () => {
    router.back();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (workoutComplete) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#FDF2F8', '#FCE7F3']}
          style={styles.completeContainer}>
          <Text style={styles.completeTitle}>Lesson Complete!</Text>
          <Text style={styles.completeSubtitle}>
            Excellent work, Amara! You completed "{lesson.title}"
          </Text>
          <View style={styles.completionStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{lesson.exercises.length}</Text>
              <Text style={styles.statLabel}>Exercises</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{lesson.duration}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.doneButton} onPress={handleExit}>
            <LinearGradient
              colors={['#FF6B9D', '#F472B6']}
              style={styles.doneButtonGradient}>
              <Text style={styles.doneButtonText}>Complete</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FDF2F8', '#FCE7F3']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
            <X size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
          <TouchableOpacity 
            style={styles.infoButton}
            onPress={() => setShowInstructions(!showInstructions)}>
            <Info size={24} color="#1E293B" />
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}
          </Text>
        </View>

        {/* Timer Display */}
        <View style={styles.timerSection}>
          <Text style={styles.exerciseName}>{currentExercise.name}</Text>
          <Text style={[
            styles.phaseText,
            { color: isResting ? '#A855F7' : '#FF6B9D' }
          ]}>
            {isResting ? 'Rest Time' : 'Exercise Time'}
          </Text>
          
          <View style={[
            styles.timerCircle,
            { borderColor: isResting ? '#A855F7' : '#FF6B9D' }
          ]}>
            <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
          </View>
          
          <View style={styles.nextExercise}>
            {currentExerciseIndex < lesson.exercises.length - 1 && (
              <>
                <Text style={styles.nextLabel}>Next:</Text>
                <Text style={styles.nextName}>
                  {lesson.exercises[currentExerciseIndex + 1].name}
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Instructions Panel */}
        {showInstructions && (
          <View style={styles.instructionsPanel}>
            <Text style={styles.instructionsTitle}>How to perform:</Text>
            <Text style={styles.instructionsText}>
              {currentExercise.instructions[0]}
            </Text>
            {currentExercise.tips && currentExercise.tips.length > 0 && (
              <>
                <Text style={styles.tipsTitle}>Key tip:</Text>
                <Text style={styles.tipsText}>{currentExercise.tips[0]}</Text>
              </>
            )}
          </View>
        )}

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleReset}>
            <RotateCcw size={24} color="#64748B" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <LinearGradient
              colors={isResting ? ['#A855F7', '#C084FC'] : ['#FF6B9D', '#F472B6']}
              style={styles.playButtonGradient}>
              {isPlaying ? (
                <Pause size={32} color="#FFFFFF" />
              ) : (
                <Play size={32} color="#FFFFFF" fill="#FFFFFF" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={handleSkip}>
            <SkipForward size={24} color="#64748B" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
  },
  exitButton: {
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
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
    flex: 1,
    textAlign: 'center',
  },
  infoButton: {
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
  progressSection: {
    marginBottom: 40,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B9D',
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  timerSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  phaseText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 40,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  timerText: {
    fontFamily: 'Inter-Bold',
    fontSize: 48,
    color: '#1E293B',
  },
  nextExercise: {
    alignItems: 'center',
  },
  nextLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  nextName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    textAlign: 'center',
  },
  instructionsPanel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  instructionsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 8,
  },
  instructionsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 12,
  },
  tipsTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF6B9D',
    marginBottom: 4,
  },
  tipsText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  playButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  completeTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 12,
  },
  completeSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
  },
  completionStats: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FF6B9D',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  doneButton: {
    borderRadius: 16,
    overflow: 'hidden',
    width: 200,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  doneButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
});