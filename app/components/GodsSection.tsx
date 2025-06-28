"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface God {
  id: string;
  name: string;
  sanskritName: string;
  image: string;
  description: string;
  mantras: {
    sanskrit: string;
    translation: string;
    benefits: string;
  }[];
  significance: {
    spiritual: string;
    historical: string;
    philosophical: string;
    yoga: string;
    relationships: string[];
  };
}

const gods: God[] = [
  {
    id: "shiva",
    name: "Lord Shiva",
    sanskritName: "शिव",
    image: "/images/shiva.jpg",
    description: "The destroyer and transformer, representing the eternal cycle of creation and destruction. Known as the Supreme Being who creates, protects, and transforms the universe.",
    mantras: [
      {
        sanskrit: "ॐ नमः शिवाय",
        translation: "Om Namah Shivaya",
        benefits: "Brings peace, removes obstacles, and connects with divine consciousness"
      }
    ],
    significance: {
      spiritual: "Shiva represents the eternal consciousness and the ultimate reality. He embodies the principle of transformation and the cyclical nature of existence.",
      historical: "Shiva worship dates back to the Indus Valley Civilization, with evidence of proto-Shiva figures in ancient seals. His worship evolved through various periods of Indian history.",
      philosophical: "Shiva represents the concept of 'Shivam' - the auspicious one who transcends dualities. His teachings emphasize detachment, meditation, and the realization of the self.",
      yoga: "Shiva is considered the first yogi (Adiyogi) and the source of all yoga practices. His teachings form the basis of Hatha Yoga and meditation techniques.",
      relationships: [
        "Consort of Parvati",
        "Father of Ganesha and Kartikeya",
        "Part of the Trimurti with Brahma and Vishnu",
        "Teacher of the Saptarishis"
      ]
    }
  },
  {
    id: "vishnu",
    name: "Lord Vishnu",
    sanskritName: "विष्णु",
    image: "/images/vishnu.jpg",
    description: "The preserver and protector of the universe, maintaining cosmic order. Known for his ten avatars and his role in maintaining dharma.",
    mantras: [
      {
        sanskrit: "ॐ नमो नारायणाय",
        translation: "Om Namo Narayanaya",
        benefits: "Brings prosperity, protection, and spiritual growth"
      }
    ],
    significance: {
      spiritual: "Vishnu represents the sustaining force of the universe and the principle of preservation. He maintains cosmic order and protects dharma.",
      historical: "Vishnu worship has ancient roots in Vedic traditions, evolving through various periods including the Gupta Empire and medieval India.",
      philosophical: "Vishnu's philosophy emphasizes dharma (righteousness), karma (action), and bhakti (devotion). His avatars teach different aspects of righteous living.",
      yoga: "Vishnu represents the sustaining energy in yoga practice. His teachings emphasize balance, harmony, and the path of devotion (Bhakti Yoga).",
      relationships: [
        "Consort of Lakshmi",
        "Part of the Trimurti with Brahma and Shiva",
        "Source of various avatars including Rama and Krishna",
        "Brother of Indra"
      ]
    }
  },
  {
    id: "ganesha",
    name: "Lord Ganesha",
    sanskritName: "गणेश",
    image: "/images/ganesha.jpg",
    description: "The remover of obstacles and the god of wisdom and new beginnings. Known for his elephant head and his role as the patron of arts and sciences.",
    mantras: [
      {
        sanskrit: "ॐ गं गणपतये नमः",
        translation: "Om Gam Ganapataye Namah",
        benefits: "Removes obstacles, brings success, and enhances wisdom"
      }
    ],
    significance: {
      spiritual: "Ganesha represents the power to overcome obstacles and the wisdom to navigate life's challenges. He embodies intelligence and success.",
      historical: "Ganesha worship became prominent during the Gupta period and continues to be one of the most popular forms of worship in modern Hinduism.",
      philosophical: "Ganesha's philosophy emphasizes the importance of wisdom, learning, and the removal of obstacles in spiritual progress.",
      yoga: "Ganesha represents the energy of new beginnings in yoga. His teachings relate to overcoming obstacles in spiritual practice.",
      relationships: [
        "Son of Shiva and Parvati",
        "Brother of Kartikeya",
        "Leader of the Ganas",
        "Patron of arts and sciences"
      ]
    }
  },
  {
    id: "durga",
    name: "Goddess Durga",
    sanskritName: "दुर्गा",
    image: "/images/durga.jpg",
    description: "The divine mother, representing power, protection, and victory over evil. Known for her role in defeating the demon Mahishasura.",
    mantras: [
      {
        sanskrit: "ॐ दुं दुर्गायै नमः",
        translation: "Om Dum Durgayai Namah",
        benefits: "Provides protection, courage, and removes fear"
      }
    ],
    significance: {
      spiritual: "Durga represents the supreme power that protects the universe from evil forces. She embodies courage, strength, and divine protection.",
      historical: "Durga worship has ancient roots, with her prominence growing during the medieval period, especially in Bengal and Eastern India.",
      philosophical: "Durga's philosophy emphasizes the victory of good over evil and the power of divine protection. She represents the active aspect of divine energy.",
      yoga: "Durga represents the protective and empowering energy in yoga. Her teachings relate to inner strength and overcoming obstacles.",
      relationships: [
        "Form of Parvati",
        "Mother of the universe",
        "Slayer of Mahishasura",
        "Protector of devotees"
      ]
    }
  },
  {
    id: "krishna",
    name: "Lord Krishna",
    sanskritName: "कृष्ण",
    image: "/images/krishna.jpg",
    description: "The eighth avatar of Vishnu, known for his divine play and teachings in the Bhagavad Gita. Symbolizes love, compassion, and divine wisdom.",
    mantras: [
      {
        sanskrit: "हरे कृष्ण हरे राम",
        translation: "Hare Krishna Hare Rama",
        benefits: "Brings divine love, peace, and spiritual enlightenment"
      }
    ],
    significance: {
      spiritual: "Krishna represents divine love and the highest form of consciousness. He embodies the perfect balance of power and compassion.",
      historical: "Krishna's worship evolved from ancient Vedic traditions, becoming prominent during the Gupta period and continuing through medieval times.",
      philosophical: "Krishna's philosophy, as expounded in the Bhagavad Gita, emphasizes dharma, karma, and bhakti. He teaches the path of selfless action.",
      yoga: "Krishna represents the highest state of yoga (Yogeshwara). His teachings form the basis of Karma Yoga and Bhakti Yoga.",
      relationships: [
        "Avatar of Vishnu",
        "Friend of Arjuna",
        "Teacher of the Bhagavad Gita",
        "Beloved of Radha"
      ]
    }
  },
  {
    id: "ram",
    name: "Lord Ram",
    sanskritName: "राम",
    image: "/images/ram.jpg",
    description: "The seventh avatar of Vishnu, known for his adherence to dharma and his role in the Ramayana. Symbolizes righteousness and ideal leadership.",
    mantras: [
      {
        sanskrit: "श्री राम जय राम जय जय राम",
        translation: "Shri Ram Jai Ram Jai Jai Ram",
        benefits: "Brings peace, prosperity, and spiritual strength"
      }
    ],
    significance: {
      spiritual: "Rama represents the ideal human being and the perfect embodiment of dharma. He symbolizes righteousness, duty, and moral values.",
      historical: "Rama's story in the Ramayana has influenced Indian culture for millennia, shaping social and moral values across generations.",
      philosophical: "Rama's philosophy emphasizes the importance of duty, honor, and moral conduct. He teaches the path of righteous living.",
      yoga: "Rama represents the ideal of self-control and moral discipline in yoga. His life teaches the importance of ethical conduct in spiritual practice.",
      relationships: [
        "Avatar of Vishnu",
        "Husband of Sita",
        "Brother of Lakshmana",
        "King of Ayodhya"
      ]
    }
  },
  {
    id: "hanuman",
    name: "Lord Hanuman",
    sanskritName: "हनुमान",
    image: "/images/hanuman.jpg",
    description: "The divine monkey god, known for his devotion to Lord Ram and his incredible strength. Symbolizes loyalty, courage, and selfless service.",
    mantras: [
      {
        sanskrit: "ॐ हं हनुमते रुद्रात्मकाय हुं फट्",
        translation: "Om Ham Hanumate Rudratmakaya Hum Phat",
        benefits: "Provides strength, courage, and protection"
      }
    ],
    significance: {
      spiritual: "Hanuman represents pure devotion and selfless service. He embodies strength, courage, and unwavering faith.",
      historical: "Hanuman's worship has ancient roots, with his prominence growing through the Ramayana and continuing in modern times.",
      philosophical: "Hanuman's philosophy emphasizes the power of devotion and selfless service. He represents the ideal of complete surrender to the divine.",
      yoga: "Hanuman represents the energy of devotion and service in yoga. His teachings relate to the power of faith and selfless action.",
      relationships: [
        "Devotee of Rama",
        "Son of Vayu (Wind God)",
        "Friend of Sugriva",
        "Protector of devotees"
      ]
    }
  },
  {
    id: "saraswati",
    name: "Goddess Saraswati",
    sanskritName: "सरस्वती",
    image: "/images/saraswati.jpg",
    description: "The goddess of knowledge, music, arts, and learning. Known for her role in bestowing wisdom and creative inspiration.",
    mantras: [
      {
        sanskrit: "ॐ ऐं सरस्वत्यै नमः",
        translation: "Om Aim Saraswatyai Namah",
        benefits: "Enhances learning, creativity, and wisdom"
      }
    ],
    significance: {
      spiritual: "Saraswati represents the flow of wisdom and the power of knowledge. She embodies creativity, learning, and artistic expression.",
      historical: "Saraswati worship dates back to the Vedic period, where she was associated with the sacred river and later became the goddess of knowledge.",
      philosophical: "Saraswati's philosophy emphasizes the importance of knowledge, wisdom, and creative expression in spiritual growth.",
      yoga: "Saraswati represents the energy of wisdom and creativity in yoga. Her teachings relate to the power of knowledge and artistic expression.",
      relationships: [
        "Consort of Brahma",
        "Mother of the Vedas",
        "Patron of arts and sciences",
        "Goddess of learning"
      ]
    }
  },
  {
    id: "lakshmi",
    name: "Goddess Lakshmi",
    sanskritName: "लक्ष्मी",
    image: "/images/lakshmi.jpg",
    description: "The goddess of wealth, prosperity, and fortune. Known for her role in bringing material and spiritual abundance.",
    mantras: [
      {
        sanskrit: "ॐ श्री महालक्ष्म्यै नमः",
        translation: "Om Shri Mahalakshmyai Namah",
        benefits: "Brings prosperity, abundance, and spiritual wealth"
      }
    ],
    significance: {
      spiritual: "Lakshmi represents abundance in all forms - material, spiritual, and emotional. She embodies prosperity, grace, and beauty.",
      historical: "Lakshmi worship has ancient roots in Vedic traditions, evolving through various periods of Indian history.",
      philosophical: "Lakshmi's philosophy emphasizes the importance of both material and spiritual prosperity. She represents the balance of wealth and wisdom.",
      yoga: "Lakshmi represents the energy of abundance and prosperity in yoga. Her teachings relate to the flow of energy and material well-being.",
      relationships: [
        "Consort of Vishnu",
        "Mother of Kamadeva",
        "Sister of Alakshmi",
        "Goddess of prosperity"
      ]
    }
  },
  {
    id: "dattatreya",
    name: "Lord Dattatreya",
    sanskritName: "दत्तात्रेय",
    image: "/images/dattatreya.jpg",
    description: "The combined form of the Hindu trinity (Brahma, Vishnu, and Shiva). Known for his role as a guru and his teachings on self-realization.",
    mantras: [
      {
        sanskrit: "ॐ श्री गुरु दत्तात्रेयाय नमः",
        translation: "Om Shri Guru Dattatreyaya Namah",
        benefits: "Brings spiritual wisdom and guidance"
      }
    ],
    significance: {
      spiritual: "Dattatreya represents the unity of the three main aspects of the divine - creation, preservation, and destruction. He embodies the perfect guru.",
      historical: "Dattatreya worship became prominent during the medieval period, especially in Maharashtra and Karnataka.",
      philosophical: "Dattatreya's philosophy emphasizes the importance of learning from all aspects of life. He represents the ideal of continuous learning.",
      yoga: "Dattatreya represents the energy of the guru in yoga. His teachings relate to self-realization and spiritual wisdom.",
      relationships: [
        "Combined form of Trimurti",
        "Teacher of the Avadhuta",
        "Guru of many sages",
        "Protector of devotees"
      ]
    }
  },
  {
    id: "ayyappa",
    name: "Lord Ayyappa",
    sanskritName: "अय्यप्पा",
    image: "/images/ayyappa.jpg",
    description: "The son of Shiva and Vishnu (in Mohini form). Known for his role in maintaining dharma and his connection with nature.",
    mantras: [
      {
        sanskrit: "स्वामी शरणम अय्यप्पा",
        translation: "Swami Sharanam Ayyappa",
        benefits: "Provides protection and spiritual guidance"
      }
    ],
    significance: {
      spiritual: "Ayyappa represents the unity of Shiva and Vishnu, embodying both preservation and transformation. He symbolizes celibacy and spiritual discipline.",
      historical: "Ayyappa worship became prominent in South India, particularly in Kerala, during the medieval period.",
      philosophical: "Ayyappa's philosophy emphasizes the importance of spiritual discipline and the unity of different aspects of the divine.",
      yoga: "Ayyappa represents the energy of spiritual discipline in yoga. His teachings relate to celibacy and self-control.",
      relationships: [
        "Son of Shiva and Mohini (Vishnu)",
        "Brother of Manikanta",
        "Protector of devotees",
        "Lord of Sabarimala"
      ]
    }
  },
  {
    id: "kartikeya",
    name: "Lord Kartikeya",
    sanskritName: "कार्तिकेय",
    image: "/images/kartikeya.jpg",
    description: "The god of war and victory, son of Shiva and Parvati. Known for his role in leading the divine armies and his wisdom.",
    mantras: [
      {
        sanskrit: "ॐ श्री स्कन्दाय नमः",
        translation: "Om Shri Skandaya Namah",
        benefits: "Brings victory, courage, and spiritual strength"
      }
    ],
    significance: {
      spiritual: "Kartikeya represents divine wisdom and the power to overcome obstacles. He embodies courage, leadership, and spiritual knowledge.",
      historical: "Kartikeya worship has ancient roots in South India, particularly in Tamil Nadu, where he is known as Murugan.",
      philosophical: "Kartikeya's philosophy emphasizes the importance of wisdom, courage, and leadership in spiritual growth.",
      yoga: "Kartikeya represents the energy of wisdom and courage in yoga. His teachings relate to overcoming obstacles in spiritual practice.",
      relationships: [
        "Son of Shiva and Parvati",
        "Brother of Ganesha",
        "Commander of the divine army",
        "Teacher of wisdom"
      ]
    }
  },
  {
    id: "brahma",
    name: "Lord Brahma",
    sanskritName: "ब्रह्मा",
    image: "/images/brahma.jpg",
    description: "The creator of the universe and the first of the Trimurti. Known for his role in creating the cosmos and all living beings.",
    mantras: [
      {
        sanskrit: "ॐ वेदात्मने ब्रह्मणे नमः",
        translation: "Om Vedatmane Brahmane Namah",
        benefits: "Enhances creativity and knowledge"
      }
    ],
    significance: {
      spiritual: "Brahma represents the creative aspect of the divine and the source of all knowledge. He embodies the principle of creation and cosmic intelligence.",
      historical: "Brahma worship was prominent in ancient times but gradually declined. His influence remains strong in philosophical and ritual contexts.",
      philosophical: "Brahma's philosophy emphasizes creation, knowledge, and the power of the mind. He represents the creative potential within all beings.",
      yoga: "Brahma represents the creative energy in yoga practice. His teachings relate to the awakening of higher consciousness and creative potential.",
      relationships: [
        "Part of the Trimurti with Vishnu and Shiva",
        "Father of the Saptarishis",
        "Creator of the four Vedas",
        "Husband of Saraswati"
      ]
    }
  },
  {
    id: "parvati",
    name: "Goddess Parvati",
    sanskritName: "पार्वती",
    image: "/images/parvati.jpg",
    description: "The divine mother and consort of Shiva. Known for her role as the mother of Ganesha and Kartikeya, and her various forms including Durga and Kali.",
    mantras: [
      {
        sanskrit: "ॐ ह्रीं श्रीं पर्वत्यै नमः",
        translation: "Om Hreem Shreem Parvatyai Namah",
        benefits: "Brings marital bliss and family harmony"
      }
    ],
    significance: {
      spiritual: "Parvati represents the divine feminine energy (Shakti) and the power of transformation. She embodies love, devotion, and spiritual strength.",
      historical: "Parvati's worship evolved from ancient mother goddess traditions, becoming prominent during the Gupta period and continuing through medieval times.",
      philosophical: "Parvati's philosophy emphasizes the balance of power and compassion, strength and gentleness. She represents the ideal of spiritual partnership.",
      yoga: "Parvati represents the nurturing and transformative energy in yoga. Her teachings relate to inner strength and spiritual devotion.",
      relationships: [
        "Consort of Shiva",
        "Mother of Ganesha and Kartikeya",
        "Manifestation of Shakti",
        "Sister of Ganga"
      ]
    }
  },
  {
    id: "venkateswara",
    name: "Lord Venkateswara",
    sanskritName: "वेंकटेश्वर",
    image: "/images/venkateswara.jpg",
    description: "A form of Vishnu, known as the Lord of the Seven Hills. One of the most worshipped deities in South India.",
    mantras: [
      {
        sanskrit: "ॐ नमो वेंकटेशाय",
        translation: "Om Namo Venkateshaya",
        benefits: "Brings prosperity and removes obstacles"
      }
    ],
    significance: {
      spiritual: "Venkateswara represents the compassionate aspect of Vishnu, known for granting wishes and removing obstacles. He embodies divine grace and protection.",
      historical: "Venkateswara worship became prominent in South India, particularly in Andhra Pradesh, during the medieval period.",
      philosophical: "Venkateswara's philosophy emphasizes the importance of devotion and surrender to the divine. He represents the power of divine grace.",
      yoga: "Venkateswara represents the energy of divine grace in yoga. His teachings relate to surrender and devotion in spiritual practice.",
      relationships: [
        "Form of Vishnu",
        "Consort of Padmavati",
        "Lord of Tirumala",
        "Protector of devotees"
      ]
    }
  },
  {
    id: "kali",
    name: "Goddess Kali",
    sanskritName: "काली",
    image: "/images/kali.jpg",
    description: "The fierce form of Durga, representing time, change, and destruction of evil. Known for her role in destroying demons and protecting devotees.",
    mantras: [
      {
        sanskrit: "ॐ क्रीं कालिकायै नमः",
        translation: "Om Kreem Kalikayai Namah",
        benefits: "Removes fear and provides protection"
      }
    ],
    significance: {
      spiritual: "Kali represents the transformative power of time and the destruction of ego. She embodies the fierce aspect of the divine mother.",
      historical: "Kali worship became prominent in Bengal and Eastern India during the medieval period, particularly in Tantric traditions.",
      philosophical: "Kali's philosophy emphasizes the importance of facing and overcoming fear. She represents the power of transformation and liberation.",
      yoga: "Kali represents the energy of transformation in yoga. Her teachings relate to overcoming fear and ego in spiritual practice.",
      relationships: [
        "Form of Durga",
        "Consort of Shiva",
        "Mother of the universe",
        "Destroyer of evil"
      ]
    }
  },
  {
    id: "jagannath",
    name: "Lord Jagannath",
    sanskritName: "जगन्नाथ",
    image: "/images/jagannath.jpg",
    description: "A form of Krishna, known as the Lord of the Universe. The main deity of the famous Jagannath Temple in Puri.",
    mantras: [
      {
        sanskrit: "ॐ ह्रीं क्लीं जगन्नाथाय स्वाहा",
        translation: "Om Hreem Kleem Jagannathaya Swaha",
        benefits: "Brings divine love and spiritual growth"
      }
    ],
    significance: {
      spiritual: "Jagannath represents the universal form of Krishna, embodying love and compassion for all beings. He symbolizes divine play and joy.",
      historical: "Jagannath worship has ancient roots in Odisha, with the current temple structure dating back to the 12th century.",
      philosophical: "Jagannath's philosophy emphasizes universal love and equality. He represents the divine in a form accessible to all.",
      yoga: "Jagannath represents the energy of divine love in yoga. His teachings relate to the joy and playfulness of spiritual practice.",
      relationships: [
        "Form of Krishna",
        "Brother of Balabhadra",
        "Sister of Subhadra",
        "Lord of Puri"
      ]
    }
  },
  {
    id: "shani",
    name: "Lord Shani",
    sanskritName: "शनि",
    image: "/images/shani.jpg",
    description: "The god of justice and karma, known for his role in delivering the results of one's actions. One of the Navagrahas.",
    mantras: [
      {
        sanskrit: "ॐ शं शनैश्चराय नमः",
        translation: "Om Sham Shanaischaraya Namah",
        benefits: "Reduces negative effects of Saturn"
      }
    ],
    significance: {
      spiritual: "Shani represents the principle of karma and justice. He embodies the law of cause and effect and the importance of righteous living.",
      historical: "Shani worship has ancient roots in Vedic astrology, with his influence growing through various periods of Indian history.",
      philosophical: "Shani's philosophy emphasizes the importance of karma and justice. He represents the consequences of our actions.",
      yoga: "Shani represents the energy of discipline and justice in yoga. His teachings relate to the importance of ethical conduct.",
      relationships: [
        "Son of Surya",
        "Brother of Yama",
        "One of the Navagrahas",
        "Lord of Saturday"
      ]
    }
  },
  {
    id: "surya",
    name: "Lord Surya",
    sanskritName: "सूर्य",
    image: "/images/surya.jpg",
    description: "The Sun God, source of light and life. One of the Navagrahas and a major deity in Vedic tradition.",
    mantras: [
      {
        sanskrit: "ॐ ह्रीं ह्रीं सूर्याय सहस्रकिरणराय मनोवांछित फलं देहि देहि स्वाहा",
        translation: "Om Hreem Hreem Suryaya Sahasrakiranaraya Manovaanchita Phalam Dehi Dehi Swaha",
        benefits: "Brings health, vitality, and success"
      }
    ],
    significance: {
      spiritual: "Surya represents the source of light and life, embodying energy and vitality. He symbolizes the power of consciousness and awareness.",
      historical: "Surya worship has ancient roots in Vedic traditions, with his importance continuing through various periods of Indian history.",
      philosophical: "Surya's philosophy emphasizes the importance of light, knowledge, and vitality. He represents the power of consciousness.",
      yoga: "Surya represents the energy of vitality in yoga. His teachings relate to the power of solar energy and consciousness.",
      relationships: [
        "Father of Shani and Yama",
        "One of the Navagrahas",
        "Source of light and life",
        "Lord of Sunday"
      ]
    }
  },
  {
    id: "chandra",
    name: "Lord Chandra",
    sanskritName: "चंद्र",
    image: "/images/chandra.jpg",
    description: "The Moon God, representing the mind and emotions. One of the Navagrahas and a significant deity in Vedic astrology.",
    mantras: [
      {
        sanskrit: "ॐ श्रां श्रीं श्रौं सः चंद्रमसे नमः",
        translation: "Om Shram Shreem Shraum Sah Chandramase Namah",
        benefits: "Enhances mental peace and emotional stability"
      }
    ],
    significance: {
      spiritual: "Chandra represents the mind and emotions, embodying the reflective and receptive aspects of consciousness. He symbolizes intuition and sensitivity.",
      historical: "Chandra worship has ancient roots in Vedic traditions, with his influence in astrology and spiritual practices continuing through the ages.",
      philosophical: "Chandra's philosophy emphasizes the importance of emotional balance and mental peace. He represents the power of the mind.",
      yoga: "Chandra represents the energy of the mind in yoga. His teachings relate to emotional balance and mental clarity.",
      relationships: [
        "One of the Navagrahas",
        "Husband of the 27 Nakshatras",
        "Father of Budha (Mercury)",
        "Lord of Monday"
      ]
    }
  },
  {
    id: "kuber",
    name: "Lord Kuber",
    sanskritName: "कुबेर",
    image: "/images/kuber.jpg",
    description: "The god of wealth and treasures, guardian of the north direction. Known for his role in bestowing material prosperity.",
    mantras: [
      {
        sanskrit: "ॐ श्रीं ह्रीं क्लीं कुबेराय असुराय नमः",
        translation: "Om Shreem Hreem Kleem Kuberaya Asuraya Namah",
        benefits: "Brings wealth and material abundance"
      }
    ],
    significance: {
      spiritual: "Kuber represents the principle of abundance and prosperity, embodying the proper use of wealth and resources. He symbolizes material and spiritual wealth.",
      historical: "Kuber worship has ancient roots in Vedic traditions, with his influence in wealth management and prosperity continuing through the ages.",
      philosophical: "Kuber's philosophy emphasizes the importance of proper wealth management and the balance of material and spiritual prosperity.",
      yoga: "Kuber represents the energy of abundance in yoga. His teachings relate to the proper use of resources and wealth.",
      relationships: [
        "Brother of Ravana",
        "Guardian of the North",
        "Lord of Wealth",
        "Friend of Shiva"
      ]
    }
  },
  {
    id: "yama",
    name: "Lord Yama",
    sanskritName: "यम",
    image: "/images/yama.jpg",
    description: "The god of death and justice, who presides over the realm of the departed. Known for his role in maintaining cosmic order.",
    mantras: [
      {
        sanskrit: "ॐ यमाय नमः",
        translation: "Om Yamaya Namah",
        benefits: "Provides protection from untimely death"
      }
    ],
    significance: {
      spiritual: "Yama represents the principle of death and justice, embodying the law of karma and the cycle of life and death. He symbolizes the importance of righteous living.",
      historical: "Yama worship has ancient roots in Vedic traditions, with his role in death and justice continuing through various periods of Indian history.",
      philosophical: "Yama's philosophy emphasizes the importance of righteous living and the consequences of our actions. He represents the law of karma.",
      yoga: "Yama represents the energy of discipline and justice in yoga. His teachings relate to the importance of ethical conduct and self-control.",
      relationships: [
        "Son of Surya",
        "Brother of Shani",
        "Lord of Death",
        "Judge of the departed"
      ]
    }
  }
];

export default function GodsSection() {
  const router = useRouter();

  const handleGodClick = (god: God) => {
    router.push(`/gods/${god.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Divine Deities</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {gods.map((god) => (
          <motion.div
            key={god.id}
            className="flex flex-col items-center"
          >
            <CardContent className="flex flex-col items-center p-4">
              <div
                className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden bg-red-500"
                onClick={() => handleGodClick(god)}
              >
                <Image
                  src={god.image}
                  alt={god.name}
                  fill
                  sizes="160px"
                  className="rounded-full object-cover object-top border-2 border-orange-400"
                  priority
                />
              </div>
              <p className="mt-2 text-center text-sm font-medium">{god.name}</p>
              <p className="text-xs text-saffron">{god.sanskritName}</p>
            </CardContent>
          </motion.div>
        ))}
      </div>
    </div>
  );
}