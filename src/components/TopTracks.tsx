import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Track = {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
  };
  duration_ms: number;
};

export default function TopTracks({ timeRange }: { timeRange: string }) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/spotify/top-tracks?timeRange=${timeRange}`);
        const data = await res.json();
        setTracks(data.items);
      } catch (error) {
        console.error('Failed to fetch top tracks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTracks();
  }, [timeRange]);

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 gradient-text">Top Tracks</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {tracks.slice(0, 20).map((track, index) => (
            <motion.li
              key={track.id}
              className="flex items-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={track.album.images[0]?.url || '/placeholder.svg'}
                alt={track.name}
                width={50}
                height={50}
                className="rounded-sm mr-4"
              />
              <div>
                <p>{track.name}</p>
                <p className="text-sm text-gray-400">Duration: {Math.round(track.duration_ms / 60000)} min</p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
