import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="relative z-50 bg-saffron shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Image src="/image.png" alt="Sadhak Logo Small" width={24} height={24} />
              <h1 className="text-white font-bold text-xl">Sadhak</h1>
            </div>
            <p className="text-white/90 text-sm">Spiritual Journey</p>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#mantras" className="text-white hover:text-golden-yellow transition-colors font-medium">
              Mantras
            </Link>
            <Link href="/gods" className="text-white hover:text-golden-yellow transition-colors font-medium">
              Gods & Mantras
            </Link>
            <Link href="/#deities" className="text-white hover:text-golden-yellow transition-colors font-medium">
              Deities
            </Link>
            <Link href="/#dharma" className="text-white hover:text-golden-yellow transition-colors font-medium">
              Dharma Concepts
            </Link>
            <Link href="/#videos" className="text-white hover:text-golden-yellow transition-colors font-medium">
              Videos
            </Link>
            <a
              href="https://www.instagram.com/sadhak.dharma/?igsh=dTZnN3l3NjMzNXBo#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-golden-yellow transition-colors font-medium"
            >
              Instagram
            </a>
            <Link href="/admin" className="text-white hover:text-golden-yellow transition-colors font-medium">
              Admin
            </Link>
          </div>
          <div className="md:hidden">
            {/* Mobile navigation toggle content */}
          </div>
        </div>
      </div>
    </nav>
  );
}
