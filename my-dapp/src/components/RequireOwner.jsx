import { Navigate } from "react-router-dom";
import { useAccount } from "wagmi";
export const RequireOwner = ({ children }) => {
    const { address } = useAccount();
    const owner = "0x995a9551E90E4Efc8fF755A529eCE1fF4a710126";

  return address === owner ? children : <Navigate to="/" />;
};
