import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Container from "../../../Shared/Container";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Checkout = () => {
    return (
      <div className="w-[500px] py-8  ml-60 mt-44 ">    <Elements  stripe={stripePromise}>
        <Container> 
      <CheckoutForm />
      </Container>
    </Elements>
    </div>  

      
    );
};

export default Checkout;