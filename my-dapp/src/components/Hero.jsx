import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const Hero = () => {
  const { address } = useAccount();
  const owner = import.meta.env.VITE_CONTRACT_OWNER;
    return (
      <div className="container text-center ">
        <div className="text-6xl mb-10 text-[#1E3A8A]">
          Decentralized Voting DApp
        </div>
        <div className="text-4xl text-[#374151]">
          Vote securely and transparently using the blockchain. Deposit ether to
          gain voting power, choose your candidate, and then receive your funds
          after the vote ends.
        </div>
        <div>
          {address === owner ? (
            <button className="w-65 h-15 bg-[#1E3A8A] text-4xl text-[#FFFFFF] mt-10 cursor-pointer in-hover:[#374151] rounded-2xl">
              <Link to="/dashboard">Add candidates</Link>
            </button>) : null}
        <button className="w-65 h-15 mx-3 bg-[#1E3A8A] text-4xl text-[#FFFFFF] mt-10 cursor-pointer in-hover:[#374151] rounded-2xl">
          <Link to="/deposite">Deposit</Link>
        </button>
        </div>
        
      </div>
    );
}

export default Hero;
