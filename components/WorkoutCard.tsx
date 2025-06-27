import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Users, Zap, Play } from 'lucide-react-native';

interface WorkoutCardProps {
  id: number;
  name: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: number;
  description: string;
  image?: string;
  onPress?: () => void;
}

export default function WorkoutCard({
  id,
  name,
  duration,
  difficulty,
  exercises,
  description,
  image,
  onPress,
}: WorkoutCardProps) {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return '#06B6D4';
      case 'Intermediate': return '#A855F7';
      case 'Advanced': return '#FF6B9D';
      default: return '#64748B';
    }
  };

  const getDifficultyIcon = (level: string) => {
    switch (level) {
      case 'Beginner': return <Users size={14} color="#06B6D4" />;
      case 'Intermediate': return <Zap size={14} color="#A855F7" />;
      case 'Advanced': return <Zap size={14} color="#FF6B9D" />;
      default: return <Users size={14} color="#64748B" />;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#FFFFFF', '#FAFAFA']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.meta}>
              <View style={styles.metaItem}>
                <Clock size={12} color="#64748B" />
                <Text style={styles.metaText}>{duration}</Text>
              </View>
              <View style={styles.metaItem}>
                {getDifficultyIcon(difficulty)}
                <Text style={[styles.metaText, { color: getDifficultyColor(difficulty) }]}>
                  {difficulty}
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.playButton}>
            <Play size={16} color="#FFFFFF" fill="#FF6B9D" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.exerciseCount}>{exercises} exercises</Text>
          <View style={styles.difficultyBadge}>
            <Text style={[styles.difficultyText, { color: getDifficultyColor(difficulty) }]}>
              {difficulty}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gradient: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 6,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B9D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  difficultyBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
  },
});