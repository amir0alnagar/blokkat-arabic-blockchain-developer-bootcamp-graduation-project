import { useReadContract } from "wagmi";
import wagmiContractConfig from "./wagmiContractConfig";
import { useEffect, useState } from "react";

const useCandidatesArray = () => {
    const [candidates, setCandidates] = useState([]);
    const { refetch } = useReadContract({
      ...wagmiContractConfig,
      functionName: "candidateNames",
    });
    
    useEffect(() => {
      const fetchCandidates = async () => {
        try {
          const result = await refetch();
          if (result?.data) {
            setCandidates(result.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      fetchCandidates();
    }, [refetch]);
    return candidates;
/*
    try {
        const result = refetch();
        if (result?.data) {
          setCandidates(result.data);
        }
        console.log(candidates);
      } catch (err) {
        console.log(err);
      }
    return candidates;
    */
};
    


export default useCandidatesArray;