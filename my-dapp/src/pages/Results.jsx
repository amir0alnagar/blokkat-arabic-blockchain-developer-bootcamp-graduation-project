import { useReadContract } from "wagmi";
import wagmiContractConfig from "../components/wagmiContractConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Results = () => {
  const [results, setResults] = useState([]);
  const { refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getResults",
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const result = await refetch();
        if (result?.data) {
          setResults(
            result.data.map((item) => ({
              candidate: item.candidate,
              votes: Number(item.votes),
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };
    fetchResults();
  }, [refetch]);
  

   console.log(results[0]);

  return (
    <div className="container text-center w-full items-start">
      <div className=" mb-9 text-center text-6xl text-[#1E3A8A]">Results</div>
      {results.length ? (
        <div className="flex flex-wrap justify-center mb-5 gap-4 text-2xl text-[#1E3A8A]">
          {results.map((value, i) => (
            <div
              key={i}
              className={`flex justify-center text-2xl rounded-4xl p-5
                ${
                  value.votes ==
                  Math.max(...results.map((value) => value.votes))
                    ? "bg-amber-300 text-white"
                    : "bg-[#1E3A8A] text-white"
                }
                  `}
            >
              <div>
                {value.candidate} : {value.votes} votes
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" text-3xl">nothing to show</div>
      )}
      <div className="w-full flex justify-center gap-x-20">
        <Button path="" text="Go To Home " />
        <Button path="voting" text="Return to Vote" />
        <Button path="withdraw" text="withdraw" />
      </div>
    </div>
  );
};

export default Results;
