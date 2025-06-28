"use client";

import { useParams, notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, BookOpen, Heart, Brain, History, Lightbulb, Users } from "lucide-react";
import type { God } from "@/app/data/gods";
import Image from "next/image";

// Import the gods data from the GodsSection component
import { gods } from "@/app/data/gods";

export default function GodPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const god = gods.find((g) => g.id === params.id);

  if (!god) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header Section: Image, Name, Sanskrit Name, Description */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          {/* Main Image */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-full overflow-hidden border-4 border-orange-400 shadow-md">
            <Image
              src={god.image}
              alt={god.name}
              fill
              sizes="(max-width: 768px) 48vw, (max-width: 1200px) 25vw, 15vw"
              className="object-cover"
              priority
              quality={100}
            />
          </div>

          {/* Header Text */}
          <div className="text-center md:text-left flex-grow">
            <h1 className="text-4xl font-bold mb-2 text-gray-800">{god.name}</h1>
            <p className="text-2xl text-orange-600 mb-4">{god.sanskritName}</p>
            <p className="text-gray-700 leading-relaxed">{god.description}</p>
          </div>
        </div>

        {/* Educational Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Spiritual Significance</h2>
            </div>
            <p className="text-gray-600">{god.significance.spiritual}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <History className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Historical Context</h2>
            </div>
            <p className="text-gray-600">{god.significance.historical}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Philosophical Teachings</h2>
            </div>
            <p className="text-gray-600">{god.significance.philosophical}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-orange-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Yoga Connection</h2>
            </div>
            <p className="text-gray-600">{god.significance.yoga}</p>
          </div>
        </div>

        {/* Relationships */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-orange-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Relationships</h2>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {god.significance.relationships.map((relationship, index) => (
              <li key={index}>{relationship}</li>
            ))}
          </ul>
        </div>

        {/* Mantras */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mantras</h2>
          <div className="space-y-6">
            {god.mantras.map((mantra, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                <p className="text-xl font-medium text-orange-600 mb-2">{mantra.sanskrit}</p>
                <p className="text-gray-700 italic mb-2">{mantra.translation}</p>
                <p className="text-sm text-gray-600">Benefits: {mantra.benefits}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}