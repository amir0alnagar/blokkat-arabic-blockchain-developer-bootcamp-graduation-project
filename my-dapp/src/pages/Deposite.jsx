import { useRef, useState } from "react";
import wagmiContractConfig from "../components/wagmiContractConfig";
import { useWriteContract } from "wagmi";
import { Link } from "react-router-dom";
import { parseEther } from "viem";
import Button from "../components/Button";

const Deposite = () => {
  const [ethAmount, setEthAmount] = useState(0);
  const formRef = useRef();
  const { writeContract } = useWriteContract();

  const handleDeposite = async (e) => {
    e.preventDefault();
    if (!ethAmount || isNaN(ethAmount) || Number(ethAmount) <= 0) {
      alert("❌Please enter a valid amount greater than 0");
      return;
    }
    try {
      await writeContract({
        ...wagmiContractConfig,
        functionName: "deposit",
        value: parseEther(ethAmount || 0),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container text-center w-2/3 ">
      <div className="text-6xl  text-[#1E3A8A]">Deposit Ether to vote </div>
      <div className="text-4xl m-7 text-[#374151]">
        You must deposit at least 0.01 ETH to unlock voting. Every 0.01 ETH
        counts as one point, up to a maximum of 5 points.
      </div>
      <form ref={formRef} onSubmit={handleDeposite}>
        <input
          className="w-3xl text-3xl p-3 h-13 border-5 border-[#1E3A8A] rounded-md"
          type="number"
          placeholder="Enter amount of ETH"
          step="0.01"
          value={ethAmount}
          onChange={(e) => {
            setEthAmount(e.target.value);
          }}
        />
      </form>
      <div className="w-full flex justify-center gap-x-20">
        <Button path="" text="Go To Home " />

        <button
          onClick={() => formRef.current.requestSubmit()}
          className="w-60 h-15 bg-[#1E3A8A] text-4xl text-[#FFFFFF] mt-10 cursor-pointer in-hover:[#374151]  rounded-2xl"
        >
          Confirm
        </button>

        <Button path="voting" text="Return to Vote" />
      </div>
    </div>
  );
};

export default Deposite;
