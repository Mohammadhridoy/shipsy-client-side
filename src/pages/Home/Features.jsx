import Count from "../../Components/Count";
import Container from "../../Shared/Container";
import Feature1 from "../../assets/Feature1.svg"; 
import Feature2 from "../../assets/Feature2.svg"; 
import Feature3 from "../../assets/Feature3.svg"; 


const Features = () => {
    return (
        <div className=" py-7 md:py-12">
            <h1 className="text-center text-2xl font-semibold md:text-3xl lg:text-4xl">Our Features</h1>
            <Container>
                   {/* card no-1 */}
            <div className=" py-3 md:py-5 lg:py-9 md:flex items-center justify-around ml-12 md:ml-0 ">
            <div className="card  w-72 md:w-56 lg:w-72 bg-base-100 border mb-4 md:mb-0">
            <div className="card-body text-center">
                <img className="w-10 ml-[90px]  md:ml-16 lg:ml-[90px]" src={Feature1} alt="" />
                <h2 className="card-title text-center ml-16 md:ml-8 lg:ml-16">Pick & Pack</h2>
                <p className="md:text-xs lg:text-[18px]">Pack your orders like a pro</p>
            </div>
            </div> 
          
            {/* card no-2 */}
        
            <div className="card w-72 md:h-48 md:w-56 lg:w-72 bg-base-100 border mb-4 md:mb-0">
            <div className="card-body text-center">
                <img className="w-12 ml-[90px] md:ml-16 lg:ml-[90px]" src={Feature2} alt="" />
                <h2 className="card-title text-center ml-16 md:ml-8 lg:ml-16">Shipping</h2>
                <p className="md:text-xs lg:text-[18px]">Ship orders faster</p>
            </div>
            </div> 
         
            {/* card no-3 */}
           
            <div className="card w-72 md:w-56 lg:w-72 bg-base-100 border mb-4 md:mb-0">
            <div className="card-body text-center">
                <img className="w-10 ml-[90px] md:ml-16 lg:ml-[90px]" src={Feature3} alt="" />
                <h2 className="card-title text-center ml-16 md:ml-8 lg:ml-16">Tracking </h2>
                <p className="md:text-xs lg:text-[18px]">Automate delivery updates</p>
            </div>
            </div> 
         
            </div>
            {/* count  */}
            <div className=" hidden py-4 md:flex justify-center items-center ">
            <Count></Count>
            </div>
          


            </Container>
         
            
        </div>
    );
};

export default Features;