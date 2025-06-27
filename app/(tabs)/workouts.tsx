import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Filter, Clock, Zap, Users, BookOpen } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { lessons, categories } from '@/data/workouts';

export default function WorkoutsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLessons = lessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const handleLessonPress = (lessonId: number) => {
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#FDF2F8', '#FCE7F3']}
        style={styles.header}>
        <Text style={styles.headerTitle}>Lessons</Text>
        <Text style={styles.headerSubtitle}>Master the Lagree method</Text>
      </LinearGradient>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lessons..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#FF6B9D" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lessons List */}
      <ScrollView style={styles.lessonsList} showsVerticalScrollIndicator={false}>
        {filteredLessons.map((lesson) => (
          <TouchableOpacity 
            key={lesson.id} 
            style={styles.lessonCard}
            onPress={() => handleLessonPress(lesson.id)}>
            <LinearGradient
              colors={['#FFFFFF', '#FAFAFA']}
              style={styles.lessonGradient}>
              <View style={styles.lessonContent}>
                <View style={styles.lessonHeader}>
                  <View style={styles.lessonTitleSection}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <View style={styles.lessonMeta}>
                      <View style={styles.metaItem}>
                        <Clock size={14} color="#64748B" />
                        <Text style={styles.metaText}>{lesson.duration} min</Text>
                      </View>
                      <View style={styles.metaItem}>
                        {getDifficultyIcon(lesson.difficulty)}
                        <Text style={[styles.metaText, { color: getDifficultyColor(lesson.difficulty) }]}>
                          {lesson.difficulty}
                        </Text>
                      </View>
                      <View style={styles.metaItem}>
                        <BookOpen size={14} color="#64748B" />
                        <Text style={styles.metaText}>{lesson.exercises.length} exercises</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{lesson.category}</Text>
                  </View>
                </View>
                
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                
                {/* Learning Objectives */}
                <View style={styles.objectivesSection}>
                  <Text style={styles.objectivesTitle}>You'll learn:</Text>
                  <View style={styles.objectivesList}>
                    {lesson.learningObjectives.slice(0, 2).map((objective, index) => (
                      <Text key={index} style={styles.objectiveItem}>• {objective}</Text>
                    ))}
                    {lesson.learningObjectives.length > 2 && (
                      <Text style={styles.moreObjectives}>
                        +{lesson.learningObjectives.length - 2} more
                      </Text>
                    )}
                  </View>
                </View>

                <View style={styles.lessonFooter}>
                  <TouchableOpacity style={styles.startButton}>
                    <Text style={styles.startButtonText}>Start Lesson</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B9D',
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  lessonsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  lessonCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  lessonGradient: {
    padding: 24,
  },
  lessonContent: {
    flex: 1,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lessonTitleSection: {
    flex: 1,
    marginRight: 12,
  },
  lessonTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#1E293B',
    marginBottom: 8,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  metaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#64748B',
    marginLeft: 4,
  },
  categoryBadge: {
    backgroundColor: '#FF6B9D20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FF6B9D',
  },
  lessonDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 16,
  },
  objectivesSection: {
    marginBottom: 20,
  },
  objectivesTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 8,
  },
  objectivesList: {
    gap: 4,
  },
  objectiveItem: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  moreObjectives: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A855F7',
    fontStyle: 'italic',
  },
  lessonFooter: {
    alignItems: 'flex-end',
  },
  startButton: {
    backgroundColor: '#FF6B9D',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});