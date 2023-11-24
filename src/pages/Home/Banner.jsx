import Container from "../../Shared/Container";
import banner1 from"../../assets/banner-section-1.png"


const Banner = () => {
    return (

<section
  className="relative bg-[#146e99] ">

 
  <Container >
  <div
    className="relative py-5 md:py-0 max-w-screen-xl md:flex md:items-center md:gap-7 lg:flex justify-between items-center lg:gap-24 md:h-96 lg:h-[650px] lg:items-center "
  >
    <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right">
      <h1 className="text-3xl text-center md:text-left font-extrabold lg:text-5xl text-white">
      Complex Deliveries
        <strong className="block font-extrabold text-white">
        Made Simple.
        </strong>
      </h1>

      <p className="mt-4 text-center md:text-left max-w-lg text-[18] lg:text-xl/relaxed text-gray-400">
      Delivery Management Platform. Reduce costs, simplify operations and drive brand loyalty
      </p>

      <div className="mt-8 flex flex-wrap  text-center">
        <a
          href="#"
          className="block w-full rounded bg-[#3ea5fe] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#7484a2] focus:outline-none focus:ring sm:w-auto"
        >
          START SHIPPING NOW!
        </a>

      </div>
    </div>
    {/* banner right */}
    <img className=" w-80 lg:w-[660px]" src={banner1} alt="" />

  </div>
  


  </Container>



</section>
    );
};

export default Banner;