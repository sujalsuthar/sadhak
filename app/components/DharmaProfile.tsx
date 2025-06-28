"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";

interface DharmaProfile {
  spiritualPath: string;
  recommendedMantras: string[];
  deityConnection: string;
  dailyPractices: string[];
  progress: {
    current: number;
    total: number;
  };
}

export default function DharmaProfile() {
  const [profile, setProfile] = useState<DharmaProfile | null>(null);
  const [completedPractices, setCompletedPractices] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const savedProfile = localStorage.getItem('dharmaProfile');
    const savedProgress = localStorage.getItem('completedPractices');
    
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    
    if (savedProgress) {
      setCompletedPractices(JSON.parse(savedProgress));
    }
  }, []);

  const togglePractice = (practice: string) => {
    const newCompleted = {
      ...completedPractices,
      [practice]: !completedPractices[practice]
    };
    
    setCompletedPractices(newCompleted);
    localStorage.setItem('completedPractices', JSON.stringify(newCompleted));
    
    if (profile) {
      const completedCount = Object.values(newCompleted).filter(Boolean).length;
      const updatedProfile = {
        ...profile,
        progress: {
          current: completedCount,
          total: profile.dailyPractices.length
        }
      };
      
      setProfile(updatedProfile);
      localStorage.setItem('dharmaProfile', JSON.stringify(updatedProfile));
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-black py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-saffron mb-4">
            Dharma Profile
          </h1>
          <p className="text-white mb-8">
            Complete the self-discovery quiz to create your personalized Dharma Profile.
          </p>
          <Button
            className="bg-saffron hover:bg-saffron/90"
            onClick={() => window.location.href = '/self-discovery'}
          >
            Take the Quiz
          </Button>
        </div>
      </div>
    );
  }

  const progressPercentage = (profile.progress.current / profile.progress.total) * 100;

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-saffron mb-8">
          Your Dharma Profile
        </h1>
        
        <Card className="p-6 bg-black/50 border-saffron mb-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-saffron mb-4">Progress</h2>
              <Progress value={progressPercentage} className="mb-2" />
              <p className="text-white text-right">
                {profile.progress.current} of {profile.progress.total} practices completed
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-saffron mb-4">Spiritual Path</h2>
              <p className="text-white">{profile.spiritualPath}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-saffron mb-4">Deity Connection</h2>
              <p className="text-white">{profile.deityConnection}</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-saffron mb-4">Recommended Mantras</h2>
              <ul className="space-y-2">
                {profile.recommendedMantras.map((mantra, index) => (
                  <li key={index} className="text-white">
                    {mantra}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-black/50 border-saffron">
          <h2 className="text-2xl font-semibold text-saffron mb-6">Daily Practices</h2>
          <div className="space-y-4">
            {profile.dailyPractices.map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {completedPractices[practice] ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <Circle className="text-gray-500" />
                  )}
                  <span className="text-white">{practice}</span>
                </div>
                <Button
                  variant="outline"
                  className="border-saffron hover:bg-saffron/10"
                  onClick={() => togglePractice(practice)}
                >
                  {completedPractices[practice] ? 'Completed' : 'Mark Complete'}
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 