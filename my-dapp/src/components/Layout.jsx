import Navbar from "./Navbar";
import Footer from "./Footer";
import useVotingStatus from "./UseVotingStatus";
import AlertMessage from "./AlertMessage";

const Layout = ({ children }) => {
  const { isPaused } = useVotingStatus();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {isPaused && (
        <AlertMessage
          type="error"
          message="🚫 Voting has been paused. You cannot vote or make changes right now."
        />
      )}
      <main className="flex-1 flex justify-center items-center ">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
