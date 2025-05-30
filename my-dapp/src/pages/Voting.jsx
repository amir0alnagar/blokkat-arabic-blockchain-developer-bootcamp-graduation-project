import { useEffect, useState } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import wagmiContractConfig from "../components/wagmiContractConfig";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Voting = () => {
  const { writeContract } = useWriteContract();
  const [chosen, setChosen] = useState("");

  const [candidates, setCandidates] = useState([]);
  const { refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCandidates",
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

  const handleVote = async (e) => {
    e.preventDefault();
    if (!chosen.trim()) {
      alert("❌ الرجاء اختيار أحد المرشحين");
      return;
    }
    try {
      await writeContract({
        ...wagmiContractConfig,
        functionName: "vote",
        args: [chosen],
      });
      console.log(chosen);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="text-center w-full items-start ">
      <div className="mb-10 container flex items-baseline justify-center gap-10 w-full text-4xl text-[#1E3A8A]">
        Vote for your favorite candidate :
      </div>
      <div className="flex flex-wrap justify-center mt-10 gap-7">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            onClick={() => setChosen(candidate)}
            className={`cursor-pointer rounded-xl ${
              chosen === candidate
                ? "border-4 border-blue-800"
                : "border border-gray-300"
            }`}
          >
            <Card candidate={candidate} isSelected={chosen === candidate} />
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center gap-x-20">
        <Button path="deposite" text="Deposit" />

        <button
          onClick={handleVote}
          className="w-65 h-15 bg-[#1E3A8A] text-3xl text-[#FFFFFF] mt-10 cursor-pointer in-hover:[#374151]  rounded-2xl"
        >
          Confirm
        </button>

        <Button path="results" text="Go to Results" />
      </div>
    </div>
  );
};

export default Voting;

