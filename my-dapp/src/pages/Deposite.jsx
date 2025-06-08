import { useEffect, useRef, useState } from "react";
import wagmiContractConfig from "../components/wagmiContractConfig";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import Button from "../components/Button";
import useVotingStatus from "../components/UseVotingStatus";
import AlertMessage from "../components/AlertMessage"; // افترض أنك تملك هذا المكون

const Deposite = () => {
  const { isPaused } = useVotingStatus();
  const [hasVoted, setHasVoted] = useState(false);
    const { address } = useAccount();
  

  const [ethAmount, setEthAmount] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const formRef = useRef();
  const { writeContract } = useWriteContract();

  const { refetch: refetchIsVoted } = useReadContract({
      ...wagmiContractConfig,
      functionName: "hasVoted",
      args: [address],
  });
   useEffect(() => {
      const fetchHasVoted = async () => {
        try {
          const res = await refetchIsVoted();
          if (res?.data !== undefined) {
            setHasVoted(res.data);
          }
        } catch (err) {
          console.error("Error fetching hasVoted:", err);
        }
      };
      if (address) fetchHasVoted();
    }, [refetchIsVoted, address]);
  const handleDeposite = async (e) => {
    e.preventDefault();
    if (!ethAmount || isNaN(ethAmount) || Number(ethAmount) <= 0) {
      setAlert({
        type: "error",
        message: "❌ Please enter a valid amount greater than 0",
      });
      return;
    }
    try {
      setAlert({ type: "", message: "" }); // مسح التنبيه قبل الإرسال
      await writeContract({
        ...wagmiContractConfig,
        functionName: "deposit",
        value: parseEther(ethAmount),
      });
      setAlert({
        type: "success",
        message: `✅ Successfully deposited ${ethAmount} ETH`,
      });
      setEthAmount("");
    } catch (err) {
      setAlert({
        type: "error",
        message: "❌ Transaction failed. Please try again.",
      });
      console.error(err);
    }
  };

  return (
    <div className="container text-center w-2/3 ">
      <div className="text-6xl text-[#1E3A8A]">Deposit Ether to vote</div>
      <div className="text-4xl m-7 text-[#374151]">
        You must deposit at least 0.01 ETH to unlock voting. Every 0.01 ETH
        counts as one point, up to a maximum of 5 points.
      </div>

      {alert.message && (
        <AlertMessage type={alert.type} message={alert.message} />
      )}

      <form ref={formRef} onSubmit={handleDeposite}>
        <input
          className="w-3xl text-3xl p-3 h-13 border-5 border-[#1E3A8A] rounded-md"
          type="number"
          placeholder="Enter amount of ETH"
          step="0.01"
          value={ethAmount}
          onChange={(e) => {
            setEthAmount(e.target.value);
            if (alert.message) setAlert({ type: "", message: "" }); // مسح التنبيه عند الكتابة
          }}
        />
      </form>

      <div className="w-full flex justify-center gap-x-20">
        <Button path="" text="Go To Home" />

        <button
          onClick={() => formRef.current.requestSubmit()}
          className={`w-60 h-15 bg-[#1E3A8A] text-3xl text-[#FFFFFF] mt-10 rounded-2xl ${
            isPaused || hasVoted
              ? "bg-gray-400 pointer-events-none"
              : "cursor-pointer hover:bg-[#374151]"
          }`}
          disabled={isPaused}
        >
          Confirm
        </button>
        <Button path="voting" text="Go to Vote" />
      </div>
    </div>
  );
};

export default Deposite;
