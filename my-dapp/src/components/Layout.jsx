import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({children}) => {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex justify-center items-center ">
          {children}
        </main>
        <Footer />
      </div>
    );
}

export default Layout;
