import { useEffect, useState } from "react";
import { useReadContract, useWriteContract, useAccount } from "wagmi";
import wagmiContractConfig from "../components/wagmiContractConfig";
import Card from "../components/Card";
import Button from "../components/Button";
import useVotingStatus from "../components/UseVotingStatus";
import AlertMessage from "../components/AlertMessage";

const Voting = () => {
  const { address } = useAccount();
  const { isPaused } = useVotingStatus();

  const [hasVoted, setHasVoted] = useState(false);
  const [haveBalance, setHaveBalance] = useState(false);
  const [chosen, setChosen] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const { refetch: refetchIsVoted } = useReadContract({
    ...wagmiContractConfig,
    functionName: "hasVoted",
    args: [address],
  });

  const { refetch: refetchHaveBalance } = useReadContract({
    ...wagmiContractConfig,
    functionName: "balances",
    args: [address],
  });

  const { refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCandidates",
  });

  const { writeContract } = useWriteContract();

  // جلب الرصيد
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await refetchHaveBalance();
        if (res?.data !== undefined) {
          setHaveBalance(Number(res.data) > 0);
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };
    if (address) fetchBalance();
  }, [refetchHaveBalance, address]);

  // التحقق من التصويت
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

  // جلب المرشحين
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

  // التصويت
  const handleVote = async (e) => {
    e.preventDefault();

    if (!chosen.trim()) {
      setAlert({
        type: "error",
        message: "❌ الرجاء اختيار أحد المرشحين.",
      });
      return;
    }

    try {
      await writeContract({
        ...wagmiContractConfig,
        functionName: "vote",
        args: [chosen],
      });

      setAlert({
        type: "success",
        message: `✅ تم التصويت بنجاح لـ ${chosen}`,
      });

      setHasVoted(true);
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "❌ حدث خطأ أثناء التصويت، يرجى المحاولة لاحقًا.",
      });
    }
  };

  return (
    <div className="text-center w-full items-start px-6">
      {!haveBalance && (
        <AlertMessage
          type="warning"
          message="⚠️ You need to deposit tokens before voting."
          duration={5000}
        />
      )}

      {alert.message && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          duration={5000}
        />
      )}

      <div className="mb-10 container flex items-baseline justify-center gap-10 w-full text-4xl text-[#1E3A8A]">
        Vote for your favorite candidate:
      </div>
      {candidates.length ? (
        <div className="flex flex-wrap justify-center mt-10 gap-7">
          {candidates &&
            candidates.map((candidate, index) => (
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
      ) : (
        <div className=" text-3xl">nothing to show</div>
      )}
      <div className="w-full flex justify-center gap-x-20">
        <Button path="deposite" text="Deposit" />

        <button
          onClick={handleVote}
          className={`w-60 h-15 text-3xl text-white mt-10 rounded-2xl 
            ${
              isPaused || hasVoted || !haveBalance
                ? "bg-gray-400 pointer-events-none"
                : "bg-[#1E3A8A] cursor-pointer hover:bg-blue-900"
            }`}
        >
          Confirm
        </button>
        <Button path="results" text="Go to Results" />
      </div>
    </div>
  );
};

export default Voting;
