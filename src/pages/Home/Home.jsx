
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import Banner from "./Banner";
import Features from "./Features";


const Home = () => {
    return (
        <div>
           
             <Navbar></Navbar>
             <Banner></Banner>
             <Features></Features>   
             <Footer></Footer>      
        </div>
    );
};

export default Home;