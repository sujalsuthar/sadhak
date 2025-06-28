import Lotus from '../components/Lotus';

export default function GitaLotusPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-saffron mb-8">
          Bhagavad Gita Lotus
        </h1>
        <p className="text-white text-center mb-8 max-w-2xl mx-auto">
          Explore the 18 chapters of the Bhagavad Gita through this interactive 3D lotus visualization. 
          Hover over each petal to discover key verses and their meanings.
        </p>
        <Lotus />
      </div>
    </div>
  );
} 