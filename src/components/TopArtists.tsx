import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Artist = {
  id: string;
  name: string;
  images: { url: string }[];
};

export default function TopArtists({ timeRange }: { timeRange: string }) {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/spotify/top-artists?timeRange=${timeRange}`);
        const data = await res.json();
        setArtists(data.items);
      } catch (error) {
        console.error('Failed to fetch top artists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, [timeRange]);

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 gradient-text">Top Artists</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {artists.slice(0, 20).map((artist, index) => (
            <motion.li
              key={artist.id}
              className="flex items-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={artist.images[0]?.url || '/placeholder.svg'}
                alt={artist.name}
                width={50}
                height={50}
                className="rounded-full mr-4"
              />
              <span>{artist.name}</span>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
