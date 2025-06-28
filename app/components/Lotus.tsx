"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import Link from 'next/link';

interface ChapterData {
  chapter: number;
  title: string;
  verse: string;
  audioUrl: string;
}

// Gita chapter verses with audio URLs
const chapterVerses: ChapterData[] = [
  { 
    chapter: 1, 
    title: "Arjuna Vishada Yoga",
    verse: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः | मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ||",
    audioUrl: "/audio/chapter1.mp3"
  },
  { 
    chapter: 2, 
    title: "Sankhya Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 2 - सांख्ययोग",
    audioUrl: "/audio/chapter2.mp3"
  },
  { 
    chapter: 3, 
    title: "Karma Yoga",
    verse: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन | मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ||",
    audioUrl: "/audio/chapter3.mp3"
  },
  { 
    chapter: 4, 
    title: "Jnana Karma Sanyasa Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 4 - ज्ञानकर्मसंन्यासयोग",
    audioUrl: "/audio/chapter4.mp3"
  },
  { 
    chapter: 5, 
    title: "Karma Sanyasa Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 5 - कर्मसंन्यासयोग",
    audioUrl: "/audio/chapter5.mp3"
  },
  { 
    chapter: 6, 
    title: "Atma Samyama Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 6 - आत्मसंयमयोग",
    audioUrl: "/audio/chapter6.mp3"
  },
  { 
    chapter: 7, 
    title: "Jnana Vijnana Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 7 - ज्ञानविज्ञानयोग",
    audioUrl: "/audio/chapter7.mp3"
  },
  { 
    chapter: 8, 
    title: "Akshara Brahma Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 8 - अक्षरब्रह्मयोग",
    audioUrl: "/audio/chapter8.mp3"
  },
  { 
    chapter: 9, 
    title: "Raja Vidya Raja Guhya Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 9 - राजविद्याराजगुह्ययोग",
    audioUrl: "/audio/chapter9.mp3"
  },
  { 
    chapter: 10, 
    title: "Vibhuti Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 10 - विभूतियोग",
    audioUrl: "/audio/chapter10.mp3"
  },
  { 
    chapter: 11, 
    title: "Vishvarupa Darshana Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 11 - विश्वरूपदर्शनयोग",
    audioUrl: "/audio/chapter11.mp3"
  },
  { 
    chapter: 12, 
    title: "Bhakti Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 12 - भक्तियोग",
    audioUrl: "/audio/chapter12.mp3"
  },
  { 
    chapter: 13, 
    title: "Kshetra Kshetrajna Vibhaga Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 13 - क्षेत्रक्षेत्रज्ञविभागयोग",
    audioUrl: "/audio/chapter13.mp3"
  },
  { 
    chapter: 14, 
    title: "Guna Traya Vibhaga Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 14 - गुणत्रयविभागयोग",
    audioUrl: "/audio/chapter14.mp3"
  },
  { 
    chapter: 15, 
    title: "Purushottama Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 15 - पुरुषोत्तमयोग",
    audioUrl: "/audio/chapter15.mp3"
  },
  { 
    chapter: 16, 
    title: "Daivasura Sampad Vibhaga Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 16 - दैवासुरसम्पद्विभागयोग",
    audioUrl: "/audio/chapter16.mp3"
  },
  { 
    chapter: 17, 
    title: "Shraddhatraya Vibhaga Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 17 - श्रद्धात्रयविभागयोग",
    audioUrl: "/audio/chapter17.mp3"
  },
  { 
    chapter: 18, 
    title: "Moksha Sanyasa Yoga",
    verse: "श्रीमद्भगवद्गीता अध्याय 18 - मोक्षसंन्यासयोग",
    audioUrl: "/audio/chapter18.mp3"
  }
];

const Lotus = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const lotusRef = useRef<THREE.Group | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hoveredVerse, setHoveredVerse] = useState<string | null>(null);
  const [hoveredChapter, setHoveredChapter] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.005);
  const [colorTransition, setColorTransition] = useState(0);

  // Vedic colors with enhanced values
  const colors = {
    saffron: new THREE.Color(0xFF9933),
    white: new THREE.Color(0xFFFFFF),
    emerald: new THREE.Color(0x50C878),
    gold: new THREE.Color(0xFFD700),
    deepMaroon: new THREE.Color(0x800000)
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene with better lighting
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Add multiple directional lights for better depth
    const lights = [
      { pos: [1, 1, 1] as [number, number, number], intensity: 0.6 },
      { pos: [-1, -1, -1] as [number, number, number], intensity: 0.4 },
      { pos: [0, 1, 0] as [number, number, number], intensity: 0.5 }
    ];

    lights.forEach(light => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, light.intensity);
      directionalLight.position.set(...light.pos);
      scene.add(directionalLight);
    });

    // Initialize camera with better position
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;
    cameraRef.current = camera;

    // Initialize renderer with better settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create lotus group
    const lotus = new THREE.Group();
    lotusRef.current = lotus;
    scene.add(lotus);

    // Create petals with better geometry
    chapterVerses.forEach((data, index) => {
      const petalGeometry = new THREE.ConeGeometry(0.5, 2, 4);
      const petalMaterial = new THREE.MeshPhongMaterial({
        color: colors.saffron,
        shininess: 100,
        transparent: true,
        opacity: 0.8,
        specular: colors.gold
      });
      const petal = new THREE.Mesh(petalGeometry, petalMaterial);
      
      // Position petals in a more dynamic pattern
      const angle = (index / 18) * Math.PI * 2;
      const radius = 3;
      const height = Math.sin(angle * 2) * 0.5; // Add some height variation
      
      petal.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        height
      );
      
      petal.rotation.z = angle + Math.PI / 2;
      petal.userData = data;
      lotus.add(petal);
    });

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Handle mouse move for hover effect
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current!);
      const intersects = raycasterRef.current.intersectObjects(lotus.children);
      
      if (intersects.length > 0) {
        const petal = intersects[0].object as THREE.Mesh;
        setHoveredVerse(petal.userData.verse);
        setHoveredChapter(petal.userData.chapter);
        
        if (petal instanceof THREE.Mesh) {
          (petal.material as THREE.MeshPhongMaterial).color = colors.emerald;
          (petal.material as THREE.MeshPhongMaterial).emissive = colors.gold;
        }
      } else {
        setHoveredVerse(null);
        setHoveredChapter(null);
        
        lotus.children.forEach((petal: THREE.Object3D) => {
          if (petal instanceof THREE.Mesh) {
            (petal.material as THREE.MeshPhongMaterial).color = colors.saffron;
            (petal.material as THREE.MeshPhongMaterial).emissive = new THREE.Color(0x000000);
          }
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop with color transitions
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (lotusRef.current) {
        lotusRef.current.rotation.z += rotationSpeed;
        lotusRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        
        // Update color transition
        setColorTransition((prev) => (prev + 0.001) % 1);
        
        // Apply color transitions to petals
        lotus.children.forEach((petal, index) => {
          if (petal instanceof THREE.Mesh) {
            const material = petal.material as THREE.MeshPhongMaterial;
            const t = (colorTransition + index / 18) % 1;
            
            if (t < 0.33) {
              material.color.lerp(colors.saffron, 0.1);
            } else if (t < 0.66) {
              material.color.lerp(colors.white, 0.1);
            } else {
              material.color.lerp(colors.emerald, 0.1);
            }
          }
        });
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [rotationSpeed]);

  // Audio control functions
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const resetRotation = () => {
    if (lotusRef.current) {
      lotusRef.current.rotation.z = 0;
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />
      
      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 flex gap-4">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-saffron rounded-full text-white shadow-lg"
          >
            <Home size={24} />
          </motion.button>
        </Link>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleAudio}
          className="p-2 bg-saffron rounded-full text-white shadow-lg"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={resetRotation}
          className="p-2 bg-saffron rounded-full text-white shadow-lg"
        >
          <RotateCcw size={24} />
        </motion.button>
      </div>

      {/* Verse Display */}
      <AnimatePresence>
        {hoveredVerse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 p-6 rounded-lg max-w-2xl w-full mx-4"
          >
            <h3 className="text-2xl font-bold text-saffron mb-2">
              Chapter {hoveredChapter}
            </h3>
            <p className="text-white text-lg leading-relaxed">
              {hoveredVerse}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src={hoveredChapter ? chapterVerses[hoveredChapter - 1].audioUrl : undefined}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Lotus;