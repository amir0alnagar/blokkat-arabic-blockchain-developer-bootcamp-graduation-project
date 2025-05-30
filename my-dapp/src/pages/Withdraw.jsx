import wagmiContractConfig from "../components/wagmiContractConfig";
import { useWriteContract } from "wagmi";
import { Link } from "react-router-dom";
import Button from "../components/Button";
const Withdraw = () => {
    const {writeContract } = useWriteContract({})
    const handleWithdraw = async (e) => {
        e.preventDefault()
        try {
            await writeContract({
              ...wagmiContractConfig,
              functionName: "withdraw",
            });
            console.log("Withdrawal successful");
        } catch (error) {
            console.log(error)
        }
  };
  return (
    <div className="container text-center w-2/3 ">
      <div className="text-6xl  text-[#1E3A8A]">Withdraw</div>
      <div className="text-4xl m-7 text-[#374151]">
        بمجرد أن ينتهي التصويت ، يمكنك سحب أموالك من حسابك.
      </div>
      <div className="w-full flex justify-center gap-x-20">
        <Button path="" text="Go To Home " />

        <button
          onClick={handleWithdraw}
          className="w-60 h-15 bg-[#1E3A8A] text-4xl text-[#FFFFFF] mt-10 cursor-pointer in-hover:[#374151]  rounded-2xl"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
