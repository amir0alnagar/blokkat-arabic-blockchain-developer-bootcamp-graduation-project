import { useRef, useState } from "react";
import wagmiContractConfig from "../components/wagmiContractConfig";
import { useWriteContract } from "wagmi";
import Button from "../components/Button";
import AlertMessage from "../components/AlertMessage"; // لازم يكون عندك هذا المكون

const Dashboard = () => {
  const [candidate, setCandidate] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const formRef = useRef();
  const { writeContract } = useWriteContract();

  const handleCreateCandidate = async (e) => {
    e.preventDefault();
    if (!candidate.trim()) {
      setAlert({
        type: "error",
        message: "❌ Please enter the candidate's name",
      });
      return;
    }
    try {
      setAlert({ type: "", message: "" }); // مسح التنبيه قبل التنفيذ
      const _tx = await writeContract({
        ...wagmiContractConfig,
        functionName: "createCandidate",
        args: [candidate],
      });
      setAlert({
        type: "success",
        message: `✅ Candidate "${candidate}" created successfully!`,
      });
      setCandidate("");
    } catch (err) {
      setAlert({
        type: "error",
        message: "❌ Error creating candidate. Please try again.",
      });
      console.error("Error creating candidate:", err);
    }
  };

  return (
    <div className="container text-center w-2/3">
      <div className="text-6xl mb-6 text-[#1E3A8A]"> Add a Candidate </div>
      {alert.message && (
        <AlertMessage type={alert.type} message={alert.message} />
      )}
      <form ref={formRef} onSubmit={handleCreateCandidate}>
        <input
          className="w-3xl text-3xl p-3 h-13 border-5 border-[#1E3A8A] rounded-md"
          type="text"
          placeholder="Enter a new candidate name"
          value={candidate}
          onChange={(e) => {
            setCandidate(e.target.value);
            if (alert.message) setAlert({ type: "", message: "" }); // مسح التنبيه لما يكتب المستخدم
          }}
        />
      </form>
      <div className="w-full flex justify-center gap-x-20">
        <Button path="" text="Go To Home" />

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
