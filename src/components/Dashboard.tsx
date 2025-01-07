'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';
import TopGenres from './TopGenres';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type TimeRange = '4weeks' | '6months' | 'year' | 'allTime';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>('4weeks');
  const [isLoading, setIsLoading] = useState(true);
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [topGenres, setTopGenres] = useState([]);
  const [totalMinutes, setTotalMinutes] = useState(0);

  // Redirect if unauthenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  // Fetch data when session and timeRange change
  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [artistsRes, tracksRes, genresRes] = await Promise.all([
          fetch(`/api/spotify/top-artists?timeRange=${timeRange}`),
          fetch(`/api/spotify/top-tracks?timeRange=${timeRange}`),
          fetch(`/api/spotify/top-genres?timeRange=${timeRange}`),
        ]);

        const [artistsData, tracksData, genresData] = await Promise.all([
          artistsRes.json(),
          tracksRes.json(),
          genresRes.json(),
        ]);

        setTopArtists(artistsData.items);
        setTopTracks(tracksData.items);
        setTopGenres(genresData);

        const totalDuration = tracksData.items.reduce(
          (sum: number, track: any) => sum + track.duration_ms,
          0
        );
        setTotalMinutes(Math.floor(totalDuration / 60000)); // Convert ms to minutes
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [session, timeRange]);

  if (status === 'loading' || isLoading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-4xl font-bold mb-8 text-center gradient-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Spotify Insights
        </motion.h1>

        <div className="text-center mb-8">
          <TimeRangeSelector timeRange={timeRange} setTimeRange={setTimeRange} />
          <p className="mt-4 text-gray-400">
            Total Minutes Listened: <span className="text-white">{totalMinutes}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TopTracks timeRange={timeRange} />
        <TopArtists timeRange={timeRange} />
        <TopGenres timeRange={timeRange} />
        </div>
      </main>
    </div>
  );
}

function TimeRangeSelector({
  timeRange,
  setTimeRange,
}: {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
}) {
  const options: { value: TimeRange; label: string }[] = [
    { value: '4weeks', label: 'Last 4 Weeks' },
    { value: '6months', label: 'Last 6 Months' },
    { value: 'year', label: 'Last Year' },
    { value: 'allTime', label: 'All Time' },
  ];

  return (
    <div className="flex justify-center space-x-4">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => setTimeRange(option.value)}
          className={`px-4 py-2 rounded-full transition-colors duration-200 ${
            timeRange === option.value
              ? 'bg-green-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
