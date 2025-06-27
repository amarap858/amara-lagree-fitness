export interface Exercise {
  id: number;
  name: string;
  duration: number; // in seconds
  rest: number; // in seconds
  description: string;
  instructions: string[];
  targetMuscles: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipment?: string[];
  modifications?: {
    easier: string;
    harder: string;
  };
  tips: string[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  exercises: Exercise[];
  learningObjectives: string[];
  warmUp?: Exercise[];
  coolDown?: Exercise[];
}

export const exercises: Exercise[] = [
  {
    id: 1,
    name: 'Plank to Pike',
    duration: 45,
    rest: 15,
    description: 'Dynamic core movement transitioning from plank to downward dog',
    instructions: [
      'Start in a high plank position with hands under shoulders',
      'Engage your core and keep your body in a straight line',
      'Slowly lift your hips up and back into downward dog position',
      'Hold for 2 seconds, then return to plank',
      'Move with control, focusing on core engagement'
    ],
    targetMuscles: ['Core', 'Shoulders', 'Hip Flexors'],
    difficulty: 'Intermediate',
    equipment: ['Mat'],
    modifications: {
      easier: 'Perform on knees or use an incline surface',
      harder: 'Add leg lifts or hold pike position longer'
    },
    tips: [
      'Keep your core tight throughout the movement',
      'Don\'t let your hips sag in plank position',
      'Focus on smooth, controlled transitions'
    ]
  },
  {
    id: 2,
    name: 'Slow Motion Squats',
    duration: 60,
    rest: 15,
    description: 'Ultra-slow squats focusing on time under tension',
    instructions: [
      'Stand with feet hip-width apart, toes slightly turned out',
      'Take 4 seconds to lower into squat position',
      'Keep chest up and weight in your heels',
      'Pause at the bottom for 2 seconds',
      'Take 4 seconds to return to standing',
      'Focus on muscle engagement throughout'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core'],
    difficulty: 'Beginner',
    equipment: ['None'],
    modifications: {
      easier: 'Use a chair for support or reduce range of motion',
      harder: 'Hold weights or add a pulse at the bottom'
    },
    tips: [
      'Keep your knees tracking over your toes',
      'Don\'t let your knees cave inward',
      'Breathe steadily throughout the movement'
    ]
  },
  {
    id: 3,
    name: 'Modified Push-ups',
    duration: 45,
    rest: 15,
    description: 'Controlled push-ups with emphasis on form and tempo',
    instructions: [
      'Start in plank position or on knees',
      'Lower your body slowly over 3 seconds',
      'Keep your body in a straight line',
      'Push back up with control over 2 seconds',
      'Focus on chest and arm engagement'
    ],
    targetMuscles: ['Chest', 'Triceps', 'Shoulders', 'Core'],
    difficulty: 'Beginner',
    equipment: ['Mat'],
    modifications: {
      easier: 'Perform on knees or against a wall',
      harder: 'Add a pause at the bottom or single-arm variations'
    },
    tips: [
      'Keep your core engaged to maintain alignment',
      'Don\'t let your hips sag or pike up',
      'Focus on quality over quantity'
    ]
  },
  {
    id: 4,
    name: 'Side Plank Pulses',
    duration: 30,
    rest: 15,
    description: 'Isometric side plank with dynamic hip pulses',
    instructions: [
      'Lie on your side with elbow under shoulder',
      'Lift your hips to create a straight line',
      'Hold the side plank position',
      'Pulse your hips up and down in small movements',
      'Keep your core tight throughout',
      'Repeat on both sides'
    ],
    targetMuscles: ['Obliques', 'Core', 'Shoulders', 'Glutes'],
    difficulty: 'Intermediate',
    equipment: ['Mat'],
    modifications: {
      easier: 'Drop to knees or hold static side plank',
      harder: 'Add leg lifts or hold for longer'
    },
    tips: [
      'Keep your body in a straight line',
      'Don\'t let your hips drop',
      'Breathe steadily while pulsing'
    ]
  },
  {
    id: 5,
    name: 'Lunge Hold & Pulse',
    duration: 45,
    rest: 15,
    description: 'Static lunge hold with small pulsing movements',
    instructions: [
      'Step into a deep lunge position',
      'Lower your back knee toward the ground',
      'Hold the lunge position',
      'Pulse up and down in small movements',
      'Keep most of your weight on your front heel',
      'Switch legs and repeat'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'],
    difficulty: 'Intermediate',
    equipment: ['None'],
    modifications: {
      easier: 'Use a wall for balance or reduce range of motion',
      harder: 'Hold weights or add a twist'
    },
    tips: [
      'Keep your front knee over your ankle',
      'Don\'t let your front knee cave inward',
      'Engage your core for stability'
    ]
  },
  {
    id: 6,
    name: 'Dead Bug',
    duration: 60,
    rest: 15,
    description: 'Core stability exercise with opposite arm and leg extension',
    instructions: [
      'Lie on your back with arms extended toward ceiling',
      'Bring knees to 90-degree angle',
      'Slowly extend opposite arm and leg',
      'Keep your lower back pressed to the floor',
      'Return to starting position with control',
      'Alternate sides'
    ],
    targetMuscles: ['Core', 'Hip Flexors', 'Shoulders'],
    difficulty: 'Beginner',
    equipment: ['Mat'],
    modifications: {
      easier: 'Move only arms or only legs',
      harder: 'Hold extensions longer or add resistance'
    },
    tips: [
      'Keep your core engaged throughout',
      'Don\'t let your back arch off the floor',
      'Move slowly and with control'
    ]
  },
  {
    id: 7,
    name: 'Bear Crawl Hold',
    duration: 30,
    rest: 15,
    description: 'Isometric hold in bear crawl position with micro-movements',
    instructions: [
      'Start on hands and knees',
      'Lift knees 2 inches off the ground',
      'Hold this position while engaging your core',
      'Make small movements forward and back',
      'Keep your back flat and core tight'
    ],
    targetMuscles: ['Core', 'Shoulders', 'Hip Flexors', 'Quadriceps'],
    difficulty: 'Advanced',
    equipment: ['Mat'],
    modifications: {
      easier: 'Hold static position without movement',
      harder: 'Add leg lifts or arm reaches'
    },
    tips: [
      'Keep your hips level',
      'Don\'t let your knees touch the ground',
      'Breathe steadily while holding'
    ]
  },
  {
    id: 8,
    name: 'Wall Sit Pulses',
    duration: 45,
    rest: 15,
    description: 'Isometric wall sit with small pulsing movements',
    instructions: [
      'Stand with your back against a wall',
      'Slide down until thighs are parallel to floor',
      'Hold this position',
      'Pulse up and down in small movements',
      'Keep your core engaged'
    ],
    targetMuscles: ['Quadriceps', 'Glutes', 'Calves', 'Core'],
    difficulty: 'Intermediate',
    equipment: ['Wall'],
    modifications: {
      easier: 'Don\'t go as low or hold static position',
      harder: 'Add single leg variations or hold longer'
    },
    tips: [
      'Keep your knees at 90 degrees',
      'Don\'t let your knees cave inward',
      'Press your back firmly against the wall'
    ]
  }
];

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Lagree Fundamentals',
    description: 'Master the basic principles of Lagree method with slow, controlled movements',
    duration: 25,
    difficulty: 'Beginner',
    category: 'Foundation',
    learningObjectives: [
      'Understand the Lagree method principles',
      'Learn proper form for basic movements',
      'Develop mind-muscle connection',
      'Practice controlled tempo'
    ],
    exercises: [
      exercises[1], // Slow Motion Squats
      exercises[2], // Modified Push-ups
      exercises[5], // Dead Bug
    ],
    warmUp: [
      {
        id: 101,
        name: 'Gentle Stretching',
        duration: 300,
        rest: 0,
        description: 'Light stretching to prepare the body',
        instructions: ['Gentle arm circles', 'Leg swings', 'Torso twists'],
        targetMuscles: ['Full Body'],
        difficulty: 'Beginner',
        tips: ['Move slowly and breathe deeply']
      }
    ],
    coolDown: [
      {
        id: 102,
        name: 'Relaxation Stretch',
        duration: 300,
        rest: 0,
        description: 'Gentle stretches to cool down',
        instructions: ['Child\'s pose', 'Gentle spinal twists', 'Deep breathing'],
        targetMuscles: ['Full Body'],
        difficulty: 'Beginner',
        tips: ['Hold stretches for 30 seconds each']
      }
    ]
  },
  {
    id: 2,
    title: 'Core Power Flow',
    description: 'Intensive core workout focusing on stability and strength',
    duration: 20,
    difficulty: 'Intermediate',
    category: 'Core',
    learningObjectives: [
      'Strengthen deep core muscles',
      'Improve core stability',
      'Learn advanced core exercises',
      'Develop core endurance'
    ],
    exercises: [
      exercises[0], // Plank to Pike
      exercises[3], // Side Plank Pulses
      exercises[5], // Dead Bug
      exercises[6], // Bear Crawl Hold
    ]
  },
  {
    id: 3,
    title: 'Lower Body Burn',
    description: 'Intense lower body workout targeting legs and glutes',
    duration: 30,
    difficulty: 'Advanced',
    category: 'Lower Body',
    learningObjectives: [
      'Build lower body strength',
      'Improve muscle endurance',
      'Master advanced leg exercises',
      'Develop functional movement patterns'
    ],
    exercises: [
      exercises[1], // Slow Motion Squats
      exercises[4], // Lunge Hold & Pulse
      exercises[7], // Wall Sit Pulses
    ]
  },
  {
    id: 4,
    title: 'Full Body Flow',
    description: 'Complete workout targeting all major muscle groups',
    duration: 35,
    difficulty: 'Intermediate',
    category: 'Full Body',
    learningObjectives: [
      'Work all major muscle groups',
      'Improve overall fitness',
      'Practice exercise transitions',
      'Build total body strength'
    ],
    exercises: [
      exercises[0], // Plank to Pike
      exercises[1], // Slow Motion Squats
      exercises[2], // Modified Push-ups
      exercises[3], // Side Plank Pulses
      exercises[4], // Lunge Hold & Pulse
      exercises[5], // Dead Bug
    ]
  },
  {
    id: 5,
    title: 'Quick Morning Energizer',
    description: 'Short, energizing workout perfect for starting your day',
    duration: 15,
    difficulty: 'Beginner',
    category: 'Quick',
    learningObjectives: [
      'Activate your body for the day',
      'Improve circulation',
      'Boost energy levels',
      'Practice basic movements'
    ],
    exercises: [
      exercises[1], // Slow Motion Squats
      exercises[2], // Modified Push-ups
      exercises[5], // Dead Bug
    ]
  },
  {
    id: 6,
    title: 'Advanced Challenge',
    description: 'High-intensity workout for experienced practitioners',
    duration: 40,
    difficulty: 'Advanced',
    category: 'Challenge',
    learningObjectives: [
      'Push your limits safely',
      'Master advanced techniques',
      'Build exceptional strength',
      'Develop mental toughness'
    ],
    exercises: [
      exercises[0], // Plank to Pike
      exercises[3], // Side Plank Pulses
      exercises[6], // Bear Crawl Hold
      exercises[7], // Wall Sit Pulses
      exercises[4], // Lunge Hold & Pulse
    ]
  }
];

export const categories = [
  'All',
  'Foundation',
  'Core',
  'Lower Body',
  'Upper Body',
  'Full Body',
  'Quick',
  'Challenge'
];

export const difficulties = ['Beginner', 'Intermediate', 'Advanced'];