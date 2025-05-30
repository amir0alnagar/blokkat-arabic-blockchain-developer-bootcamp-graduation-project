import { useRef, useState } from "react";
import wagmiContractConfig from "../components/wagmiContractConfig";
import { useWriteContract } from "wagmi";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Dashboard = () => {
  const [candidate, setCandidate] = useState("");
  const formRef = useRef();
  const { writeContract } = useWriteContract();

  const handleCreateCandidate = async (e) => {
    e.preventDefault();
    if (!candidate.trim()) {
      alert("❌Please enter the candidate's name");
      return;
    }
    try {
      console.log("Creating candidate...", candidate);
      const tx = await writeContract({
        ...wagmiContractConfig,
        functionName: "createCandidate",
        args: [candidate],
      });
      console.log("Transaction sent:", tx);
    } catch (err) {
      console.error("Error creating candidate:", err);
    }
    setCandidate("");
  };

  return (
    <div className="container text-center w-2/3 ">
      <div className="text-6xl mb-6 text-[#1E3A8A]"> Add a Candidate </div>
      <form ref={formRef} onSubmit={handleCreateCandidate}>
        <input
          className="w-3xl text-3xl p-3 h-13 border-5 border-[#1E3A8A] rounded-md"
          type="text"
          placeholder="Enter a new candidate name"
          value={candidate}
          onChange={(e) => {
            setCandidate(e.target.value);
          }}
        />
      </form>
      <div className="w-full flex justify-center gap-x-20">
        <Button path="" text="Go To Home " />

        <button
          onClick={() => formRef.current.requestSubmit()}
          className="w-60 h-15 bg-[#1E3A8A] text-4xl text-[#FFFFFF] mt-10 cursor-pointer rounded-2xl"
        >
          Confirm
        </button>
        <Button path="voting" text="Return to Vote" />
      </div>
    </div>
  );
};

export default Dashboard;
