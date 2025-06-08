import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import wagmiContractConfig from './wagmiContractConfig';

const useVotingStatus = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(true);
  const { refetch: refetchIsPaused } = useReadContract({
    ...wagmiContractConfig,
    functionName: "isPaused",
  });

  useEffect(() => {
    const fetchPaused = async () => {
      try {
        const res = await refetchIsPaused();
        if (res?.data !== undefined) {
          setIsPaused(res.data);
        }
      } catch (err) {
        console.error("Error fetching isPaused:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPaused();
  }, [refetchIsPaused]);

  return { isPaused, loading, refetchIsPaused };
};

export default useVotingStatus;
