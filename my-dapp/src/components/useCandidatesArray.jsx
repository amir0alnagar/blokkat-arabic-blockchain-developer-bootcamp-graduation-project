import { useReadContract } from "wagmi";
import wagmiContractConfig from "./logic/wagmiContractConfig";
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

};
    


export default useCandidatesArray;