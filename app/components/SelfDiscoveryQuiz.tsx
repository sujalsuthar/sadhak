"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    value: string;
    label: string;
    description: string;
  }[];
}

interface QuizResult {
  spiritualPath: string;
  recommendedMantras: string[];
  deityConnection: string;
  dailyPractices: string[];
  progress: {
    current: number;
    total: number;
  };
}

const questions: Question[] = [
  {
    id: 1,
    text: "What draws you most to spiritual practice?",
    options: [
      {
        value: "knowledge",
        label: "Knowledge & Wisdom",
        description: "Seeking deeper understanding of life's mysteries"
      },
      {
        value: "devotion",
        label: "Devotion & Love",
        description: "Yearning for divine connection and love"
      },
      {
        value: "peace",
        label: "Inner Peace",
        description: "Finding calm and balance in life"
      },
      {
        value: "service",
        label: "Service & Action",
        description: "Making a positive impact in the world"
      }
    ]
  },
  {
    id: 2,
    text: "How do you prefer to connect with the divine?",
    options: [
      {
        value: "meditation",
        label: "Meditation",
        description: "Through silent contemplation and mindfulness"
      },
      {
        value: "chanting",
        label: "Chanting",
        description: "Through sacred sounds and mantras"
      },
      {
        value: "ritual",
        label: "Ritual",
        description: "Through traditional practices and ceremonies"
      },
      {
        value: "nature",
        label: "Nature",
        description: "Through connection with natural elements"
      }
    ]
  },
  {
    id: 3,
    text: "What time of day do you feel most spiritually connected?",
    options: [
      {
        value: "dawn",
        label: "Dawn (Brahma Muhurta)",
        description: "Early morning hours before sunrise"
      },
      {
        value: "noon",
        label: "Noon",
        description: "Midday when the sun is at its peak"
      },
      {
        value: "sunset",
        label: "Sunset",
        description: "Evening hours during sunset"
      },
      {
        value: "night",
        label: "Night",
        description: "Late night when the world is quiet"
      }
    ]
  },
  {
    id: 4,
    text: "Which aspect of your life needs the most spiritual attention?",
    options: [
      {
        value: "mind",
        label: "Mental Clarity",
        description: "Finding peace and focus in thoughts"
      },
      {
        value: "heart",
        label: "Emotional Balance",
        description: "Cultivating love and compassion"
      },
      {
        value: "body",
        label: "Physical Well-being",
        description: "Maintaining health and vitality"
      },
      {
        value: "spirit",
        label: "Spiritual Growth",
        description: "Deepening spiritual connection"
      }
    ]
  },
  {
    id: 5,
    text: "What is your primary goal in spiritual practice?",
    options: [
      {
        value: "moksha",
        label: "Liberation",
        description: "Seeking ultimate freedom and enlightenment"
      },
      {
        value: "dharma",
        label: "Righteous Living",
        description: "Living in alignment with cosmic order"
      },
      {
        value: "bhakti",
        label: "Divine Love",
        description: "Cultivating love for the divine"
      },
      {
        value: "karma",
        label: "Selfless Service",
        description: "Serving others and the world"
      }
    ]
  }
];

const generateRecommendations = (answers: Record<number, string>): QuizResult => {
  // This is a simplified version - in a real app, this would use more sophisticated AI
  const spiritualPath = determineSpiritualPath(answers);
  const recommendedMantras = getRecommendedMantras(answers);
  const deityConnection = getDeityConnection(answers);
  const dailyPractices = getDailyPractices(answers);

  return {
    spiritualPath,
    recommendedMantras,
    deityConnection,
    dailyPractices,
    progress: {
      current: 0,
      total: dailyPractices.length
    }
  };
};

const determineSpiritualPath = (answers: Record<number, string>): string => {
  const pathCounts: Record<string, number> = {
    jnana: 0,
    bhakti: 0,
    karma: 0,
    raja: 0
  };

  // Analyze answers to determine primary path
  if (answers[1] === "knowledge") pathCounts.jnana += 2;
  if (answers[1] === "devotion") pathCounts.bhakti += 2;
  if (answers[1] === "service") pathCounts.karma += 2;
  if (answers[2] === "meditation") pathCounts.raja += 2;

  const maxPath = Object.entries(pathCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
  
  return {
    jnana: "Jnana Yoga (Path of Knowledge)",
    bhakti: "Bhakti Yoga (Path of Devotion)",
    karma: "Karma Yoga (Path of Selfless Action)",
    raja: "Raja Yoga (Path of Meditation)"
  }[maxPath];
};

const getRecommendedMantras = (answers: Record<number, string>): string[] => {
  const mantras = [
    "ॐ नमः शिवाय (Om Namah Shivaya)",
    "हरे कृष्ण हरे राम (Hare Krishna Hare Rama)",
    "ॐ गं गणपतये नमः (Om Gam Ganapataye Namah)",
    "ॐ मणि पद्मे हूं (Om Mani Padme Hum)",
    "गायत्री मंत्र (Gayatri Mantra)"
  ];
  
  // Select mantras based on answers
  return mantras.slice(0, 3);
};

const getDeityConnection = (answers: Record<number, string>): string => {
  const deities = {
    knowledge: "Saraswati - Goddess of Knowledge",
    devotion: "Krishna - Embodiment of Divine Love",
    peace: "Shiva - Lord of Meditation",
    service: "Hanuman - Embodiment of Selfless Service"
  };
  
  return deities[answers[1] as keyof typeof deities] || "Krishna - Embodiment of Divine Love";
};

const getDailyPractices = (answers: Record<number, string>): string[] => {
  const practices = [
    "Morning Meditation (15 minutes)",
    "Mantra Japa (108 repetitions)",
    "Pranayama (10 minutes)",
    "Evening Reflection",
    "Reading Sacred Texts"
  ];
  
  return practices;
};

export default function SelfDiscoveryQuiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const recommendations = generateRecommendations(answers);
      setResult(recommendations);
      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="absolute top-4 left-4 z-10">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-saffron text-white px-4 py-2 rounded-full text-sm flex items-center gap-2"
          onClick={() => router.push('/')}
        >
          <Home className="w-4 h-4" />
          Go Home
        </motion.button>
      </div>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-saffron mb-8">
          Discover Your Spiritual Path
        </h1>
        
        <Progress value={progress} className="mb-8" />
        
        <AnimatePresence mode="wait">
          {!showResults ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Card className="p-6 bg-black/50 border-saffron">
                <h2 className="text-2xl font-semibold text-white mb-6">
                  {questions[currentQuestion].text}
                </h2>
                
                <div className="grid gap-4">
                  {questions[currentQuestion].options.map((option) => (
                    <Button
                      key={option.value}
                      variant="outline"
                      className="w-full p-4 text-left border-saffron hover:bg-saffron/10"
                      onClick={() => handleAnswer(option.value)}
                    >
                      <div>
                        <div className="font-medium text-white">{option.label}</div>
                        <div className="text-sm text-gray-400">{option.description}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <Card className="p-6 bg-black/50 border-saffron">
                <h2 className="text-2xl font-semibold text-saffron mb-6">
                  Your Personalized Sadhana Plan
                </h2>
                
                {result && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">Spiritual Path</h3>
                      <p className="text-gray-300">{result.spiritualPath}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">Recommended Mantras</h3>
                      <ul className="list-disc list-inside text-gray-300">
                        {result.recommendedMantras.map((mantra, index) => (
                          <li key={index}>{mantra}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">Deity Connection</h3>
                      <p className="text-gray-300">{result.deityConnection}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium text-white mb-2">Daily Practices</h3>
                      <ul className="list-disc list-inside text-gray-300">
                        {result.dailyPractices.map((practice, index) => (
                          <li key={index}>{practice}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        className="w-full bg-saffron hover:bg-saffron/90"
                        onClick={() => {
                          // Save to Dharma Profile
                          localStorage.setItem('dharmaProfile', JSON.stringify(result));
                        }}
                      >
                        Save to Dharma Profile
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 