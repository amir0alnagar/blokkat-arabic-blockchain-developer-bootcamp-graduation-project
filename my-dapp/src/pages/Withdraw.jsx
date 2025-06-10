import wagmiContractConfig from "../components/wagmiContractConfig";
import { useReadContract, useWriteContract } from "wagmi";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import useVotingStatus from "../components/UseVotingStatus";
import AlertMessage from "../components/AlertMessage";

const Withdraw = () => {
  const { isPaused } = useVotingStatus();
  const [deadline, setDeadline] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const { writeContract } = useWriteContract({});

  const { refetch: refetchDeadline } = useReadContract({
    ...wagmiContractConfig,
    functionName: "deadline",
  });

  useEffect(() => {
    const fetchDeadline = async () => {
      try {
        const res = await refetchDeadline();
        if (res?.data) {
          setDeadline(Number(res.data));
        }
      } catch (err) {
        console.error("Error fetching deadline:", err);
        setAlert({
          type: "error",
          message: "❌ تعذر تحميل تاريخ نهاية التصويت.",
        });
      }
    };
    fetchDeadline();
  }, [refetchDeadline]);

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      await writeContract({
        ...wagmiContractConfig,
        functionName: "withdraw",
      });
      setAlert({
        type: "success",
        message: "✅ تم السحب بنجاح.",
      });
    } catch (error) {
      console.error(error);
      setAlert({
        type: "error",
        message: "❌ حدث خطأ أثناء عملية السحب. تأكد أنك تملك رصيدًا.",
      });
    }
  };

  const formattedDeadline = deadline
    ? new Date(deadline * 1000).toLocaleString()
    : "Loading...";

  return (
    <div className="container text-center w-2/3 ">
      {alert.message && (
        <AlertMessage
          type={alert.type}
          message={alert.message}
          duration={5000}
        />
      )}

      <div className="text-6xl text-[#1E3A8A]">Withdraw</div>
      <div className="text-2xl mt-2 text-gray-600">
        ⏰ Voting ends at: <strong>{formattedDeadline}</strong>
      </div>
      <div className="text-4xl m-7 text-[#374151]">
        Once the voting is over, you can withdraw your funds from your account
        or when the vote is canceled by the owner.
      </div>

      <div className="w-full flex justify-center gap-x-20">
        <Button path="" text="Go To Home" />

        <button
          onClick={handleWithdraw}
          className={`w-60 h-15 text-3xl text-white mt-10 rounded-2xl
            ${
              !isPaused
                ? "bg-gray-400 pointer-events-none"
                : "bg-[#1E3A8A] hover:bg-[#374151] cursor-pointer"
            }`}
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
