import { useWriteContract } from "wagmi";
import wagmiContractConfig from "./wagmiContractConfig";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { writeContract } = useWriteContract({});
  const handleEndVote = async (e) => {
    e.preventDefault();
    try {
      await writeContract({
        ...wagmiContractConfig,
        functionName: "endVoting",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <nav
        className="container relative flex w-full flex-nowrap items-center justify-between bg-[#1E3A8A] py-2 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className=" flex w-full flex-wrap items-center justify-between px-5">
          <div className="">
            <Link className="text-4xl text-[#FFFFFF]" to="/">
              BlockVote
            </Link>
          </div>
          <div>
            <button
              onClick={handleEndVote}
              className=" bg-[#1E3A8A] text-4xl text-white cursor-pointer hover:text-red-800"
            >
              End Voting
            </button>
          </div>
          <div className="flex  gap-2 ">
            <w3m-button />
            <w3m-network-button />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
