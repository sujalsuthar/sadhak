"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  MapPin,
  Star,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Globe,
  Users,
  Award,
  Flower,
  Sun,
  Flame,
} from "lucide-react"
import Image from "next/image"

export default function SanatanaDharmaHub() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos');
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
      }
    };
    fetchVideos();
  }, []);

  const mahakavyaTourEvents = [
    {
      city: "Tooting",
      title: "Journey from Ram to Shree Ram",
      date: "March 15, 2024",
      description:
        "Exploring the divine transformation through sacred narratives and understanding the evolution of consciousness",
      venue: "Tooting Community Center",
      attendees: "250+",
      highlights: ["Divine consciousness", "Sacred transformation", "Spiritual evolution"],
    },
    {
      city: "Oxford",
      title: "Rāmāyaṇa in 21st Century",
      date: "March 22, 2024",
      description:
        "Ancient wisdom for modern seekers at the prestigious university, bridging timeless teachings with contemporary life",
      venue: "Oxford University Hall",
      attendees: "400+",
      highlights: ["Modern relevance", "Academic discourse", "Practical wisdom"],
    },
    {
      city: "Edinburgh",
      title: "Dharma in Rāmāyaṇa",
      date: "March 29, 2024",
      description: "Understanding righteous living through epic teachings and the eternal principles of dharmic life",
      venue: "Edinburgh Cultural Center",
      attendees: "300+",
      highlights: ["Righteous living", "Dharmic principles", "Ethical guidance"],
    },
  ]

  const mantras = [
    {
      title: "Gayatri Mantra",
      sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्",
      translation: "We meditate on the divine light of the Sun, may it illuminate our minds",
      benefits: "Enhances wisdom, purifies mind, brings divine protection",
    },
    {
      title: "Maha Mantra",
      sanskrit: "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे हरे राम हरे राम राम राम हरे हरे",
      translation: "O Lord Krishna, O Lord Rama, please engage me in Your service",
      benefits: "Purifies consciousness, brings peace, connects with divine love",
    },
    {
      title: "Om Namah Shivaya",
      sanskrit: "ॐ नमः शिवाय",
      translation: "I bow to Lord Shiva, the auspicious one",
      benefits: "Destroys negativity, brings transformation, awakens inner consciousness",
    },
  ]

  const deities = [
    {
      name: "Lord Rama",
      title: "Maryada Purushottam",
      description: "The ideal man, embodiment of dharma and righteousness",
      qualities: ["Dharma", "Compassion", "Leadership", "Devotion"],
      significance: "Central figure of Ramayana, represents perfect human conduct",
    },
    {
      name: "Lord Krishna",
      title: "Yogeshwar",
      description: "The divine teacher, source of Bhagavad Gita wisdom",
      qualities: ["Wisdom", "Love", "Playfulness", "Protection"],
      significance: "Guide of Arjuna, teacher of dharma and spiritual wisdom",
    },
    {
      name: "Goddess Sita",
      title: "Janaki Mata",
      description: "Embodiment of purity, devotion and feminine strength",
      qualities: ["Purity", "Devotion", "Strength", "Sacrifice"],
      significance: "Ideal of womanhood, represents unwavering faith and virtue",
    },
  ]

  const dharmaConceptsData = [
    {
      concept: "Dharma",
      definition: "Righteous duty and moral law that sustains the universe",
      application: "Living according to one's duty while maintaining ethical principles",
      example: "Rama's adherence to truth even in difficult circumstances",
    },
    {
      concept: "Karma",
      definition: "Law of cause and effect governing all actions and their consequences",
      application: "Performing actions without attachment to results",
      example: "Arjuna's duty as a warrior guided by Krishna's wisdom",
    },
    {
      concept: "Moksha",
      definition: "Liberation from the cycle of birth and death",
      application: "Spiritual practices leading to self-realization",
      example: "Hanuman's complete surrender and devotion to Rama",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mahakavyaTourEvents.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mahakavyaTourEvents.length) % mahakavyaTourEvents.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      {/* Floating Background Elements */}
      <motion.div className="fixed inset-0 z-0 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-saffron text-4xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            >
              ॐ
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="relative z-50 bg-saffron shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2">
                <Image src="/placeholder-logo.svg" alt="Sadhak Logo" width={100} height={40} priority style={{ background: 'transparent' }} />
                <h1 className="text-white font-bold text-2xl">Sadhak</h1>
              </div>
              <p className="text-white/90 text-sm">Spiritual Journey</p>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#mantras" className="text-white hover:text-golden-yellow transition-colors font-medium">
                Mantras
              </a>
              <a href="/gods" className="text-white hover:text-golden-yellow transition-colors font-medium">
                Gods & Mantras
              </a>
              <a href="#deities" className="text-white hover:text-golden-yellow transition-colors font-medium">
                Deities
              </a>
              <a href="#dharma" className="text-white hover:text-golden-yellow transition-colors font-medium">
                Dharma Concepts
              </a>
              <a href="#videos" className="text-white hover:text-golden-yellow transition-colors font-medium">
                Videos
              </a>
              <a
                href="https://www.instagram.com/sadhak.dharma/?igsh=dTZnN3l3NjMzNXBo#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-golden-yellow transition-colors font-medium"
              >
                Instagram
              </a>
              <a href="/admin" className="text-white hover:text-golden-yellow transition-colors font-medium">
                Admin
              </a>
            </div>

            {/* Mobile Navigation Toggle (Hamburger Icon) */}
            <div className="md:hidden">
              {/* Mobile navigation toggle content */}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-cream to-off-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8">
              <Sun className="w-16 h-16 text-golden-yellow mx-auto mb-4" />
              <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6 leading-tight">
                Sanatana Dharma
              </h1>
              <p className="text-lg text-dark-brown mb-8">
                Timeless Wisdom for a Modern World: Explore ancient spiritual teachings and practices to enrich your
                life.
              </p>
              <Button className="bg-saffron hover:bg-deep-maroon text-white font-bold py-3 px-8 rounded-md transition-colors">
                Explore Teachings
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mantras Section */}
      <section id="mantras" className="relative z-10 py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Flame className="w-12 h-12 text-saffron mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-charcoal mb-4">Sacred Mantras</h2>
            <p className="text-lg text-dark-brown max-w-2xl mx-auto">
              Divine vibrations that purify the mind and connect us with the eternal
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mantras.map((mantra, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full bg-white border-golden-yellow/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-saffron">{mantra.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-cream p-4 rounded-lg">
                      <p className="text-charcoal font-medium text-center leading-relaxed">{mantra.sanskrit}</p>
                    </div>
                    <p className="text-dark-brown italic text-center">"{mantra.translation}"</p>
                    <div className="border-t border-golden-yellow/30 pt-4">
                      <p className="text-sm text-dark-brown">
                        <strong>Benefits:</strong> {mantra.benefits}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deities Section */}
      <section id="deities" className="relative z-10 py-20 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Star className="w-12 h-12 text-golden-yellow mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-charcoal mb-4">Divine Personalities</h2>
            <p className="text-lg text-dark-brown max-w-2xl mx-auto">
              Learn about the divine beings who guide us on the path of righteousness
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deities.map((deity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-full bg-white border-saffron/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-saffron to-golden-yellow rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        alt={deity.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold text-charcoal">{deity.name}</CardTitle>
                    <p className="text-saffron font-medium">{deity.title}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-dark-brown text-center">{deity.description}</p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-charcoal">Divine Qualities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {deity.qualities.map((quality, idx) => (
                          <Badge key={idx} className="bg-golden-yellow/20 text-deep-maroon border-golden-yellow/50">
                            {quality}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-golden-yellow/30 pt-4">
                      <p className="text-sm text-dark-brown">
                        <strong>Significance:</strong> {deity.significance}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dharma Concepts Section */}
      <section id="dharma" className="relative z-10 py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <BookOpen className="w-12 h-12 text-deep-maroon mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-charcoal mb-4">Dharma Concepts</h2>
            <p className="text-lg text-dark-brown max-w-2xl mx-auto">
              Fundamental principles that guide righteous living and spiritual growth
            </p>
          </motion.div>

          <div className="space-y-8">
            {dharmaConceptsData.map((concept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white border-deep-maroon/20 shadow-lg">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-2xl font-bold text-saffron mb-2">{concept.concept}</h3>
                        <p className="text-dark-brown">{concept.definition}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal mb-2">Practical Application:</h4>
                        <p className="text-dark-brown">{concept.application}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal mb-2">Example from Scriptures:</h4>
                        <p className="text-dark-brown italic">{concept.example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-deep-maroon mb-4">Spiritual Lectures & Discourses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore spiritual wisdom through lectures at prestigious universities and discussions on modern challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-deep-maroon">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{video.description}</p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-saffron hover:text-deep-maroon transition-colors"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mahakavya Tour Events Section */}
      <section id="events" className="relative z-10 py-20 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Globe className="w-12 h-12 text-saffron mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-charcoal mb-4">Mahakavya Tour Highlights</h2>
            <p className="text-lg text-dark-brown max-w-2xl mx-auto">
              Bhavika Maheshwari's transformative sessions across the UK, bringing ancient wisdom to modern audiences
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {mahakavyaTourEvents.map((event, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <Card className="bg-white border-0 h-auto">
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <Badge className="bg-saffron text-white">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.city}
                              </Badge>
                              <Badge variant="outline" className="border-golden-yellow text-deep-maroon">
                                <Calendar className="w-4 h-4 mr-1" />
                                {event.date}
                              </Badge>
                            </div>

                            <h3 className="text-3xl font-bold text-charcoal mb-4">{event.title}</h3>
                            <p className="text-dark-brown text-lg mb-6 leading-relaxed">{event.description}</p>

                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-saffron" />
                                  <span className="text-dark-brown">{event.venue}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-saffron" />
                                  <span className="text-dark-brown">{event.attendees} attendees</span>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold text-charcoal mb-2">Key Highlights:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {event.highlights.map((highlight, idx) => (
                                    <Badge
                                      key={idx}
                                      className="bg-golden-yellow/20 text-deep-maroon border-golden-yellow/50"
                                    >
                                      {highlight}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="w-64 h-64 bg-gradient-to-br from-saffron/20 to-golden-yellow/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                              <Image
                                src="/placeholder.svg?height=200&width=200"
                                alt={`${event.city} Event`}
                                width={200}
                                height={200}
                                className="rounded-full object-cover"
                              />
                            </div>
                            <Button className="bg-deep-maroon hover:bg-deep-maroon/90 text-white">
                              <Play className="w-4 h-4 mr-2" />
                              Watch Highlights
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-saffron"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-saffron"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {mahakavyaTourEvents.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-saffron" : "bg-golden-yellow/50"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Sadhak Section */}
      <section id="about" className="relative z-10 py-20 bg-off-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Heart className="w-12 h-12 text-deep-maroon mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-charcoal mb-4">About Sadhak Organization</h2>
              <p className="text-lg text-dark-brown max-w-2xl mx-auto">
                Dedicated to preserving and sharing the timeless wisdom of Sanatana Dharma
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="bg-white border-saffron/30 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 bg-gradient-to-br from-saffron to-golden-yellow rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=100&width=100"
                          alt="Bhavika Maheshwari"
                          width={100}
                          height={100}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-charcoal">Bhavika Maheshwari</h3>
                      <p className="text-saffron font-medium">Spiritual Guide & Teacher</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-deep-maroon">16</div>
                          <div className="text-sm text-dark-brown">Years Old</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-deep-maroon">400+</div>
                          <div className="text-sm text-dark-brown">Sessions</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-deep-maroon">₹50L</div>
                          <div className="text-sm text-dark-brown">Ram Mandir</div>
                        </div>
                      </div>

                      <div className="border-t border-golden-yellow/30 pt-4">
                        <p className="text-dark-brown text-center italic">
                          "A young voice carrying the ancient wisdom of our scriptures, inspiring thousands to reconnect
                          with their spiritual heritage."
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold text-charcoal mb-4">Our Mission</h3>
                  <p className="text-dark-brown leading-relaxed">
                    To make the profound teachings of Sanatana Dharma accessible to modern seekers, bridging the gap
                    between ancient wisdom and contemporary life through engaging storytelling and practical
                    applications.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-charcoal mb-4">Our Vision</h3>
                  <p className="text-dark-brown leading-relaxed">
                    A world where the timeless principles of dharma, karma, and moksha guide individuals towards
                    righteous living, inner peace, and spiritual fulfillment.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-cream rounded-lg">
                    <Award className="w-8 h-8 text-saffron mx-auto mb-2" />
                    <div className="text-lg font-bold text-charcoal">Excellence</div>
                    <div className="text-sm text-dark-brown">In Teaching</div>
                  </div>
                  <div className="text-center p-4 bg-cream rounded-lg">
                    <Users className="w-8 h-8 text-saffron mx-auto mb-2" />
                    <div className="text-lg font-bold text-charcoal">Community</div>
                    <div className="text-sm text-dark-brown">Building</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-deep-maroon text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Flower className="w-8 h-8 text-golden-yellow" />
                <div>
                  <h3 className="text-xl font-bold">Sanatana Dharma</h3>
                  <p className="text-white/80 text-sm">Knowledge Hub</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Preserving and sharing the eternal wisdom of our sacred scriptures for the spiritual upliftment of
                humanity.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#mantras" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Sacred Mantras
                  </a>
                </li>
                <li>
                  <a href="#deities" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Divine Personalities
                  </a>
                </li>
                <li>
                  <a href="#dharma" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Dharma Concepts
                  </a>
                </li>
                <li>
                  <a href="#events" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Mahakavya Tour
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Scripture Library
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Audio Recordings
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Study Materials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Community Forum
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/80 hover:text-golden-yellow transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 Sanatana Dharma Knowledge Hub. Spreading divine wisdom with devotion and authenticity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
