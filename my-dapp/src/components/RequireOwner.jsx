import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
export const RequireOwner = ({ children }) => {
    const { address } = useAccount();
    const owner = import.meta.env.VITE_CONTRACT_OWNER;

  return address === owner ? children : <Navigate to="/" />;
};
