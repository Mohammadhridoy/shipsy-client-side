import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useGetprice from "../../../Hooks/useGetprice";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";



const CheckoutForm = () => {
    const [error, setError ] = useState(null)
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const totalPrice = useGetprice()
    const [clientSecret, setClientSecret] =useState('')
    const {user} = useContext(AuthContext)
    // console.log(typeof(totalPrice))
    const [transaction, setTransaction] =useState('')


    useEffect(()=>{
        if(totalPrice>0){
            axiosSecure.post('/create-payment-intent', {price: totalPrice})
            .then(res =>{
             console.log(res.data.clientSecret)
             setClientSecret(res.data.clientSecret)
            })
        }
      
    },[axiosSecure, totalPrice])


    const handleSubmit = async (event) =>{
        event.preventDefault()
        if (!stripe || !elements) {
            return;
          }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return;
          }

          const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });

          if (error) {
            console.log('[error]', error);
            setError(error.message)
          } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError(' ')
          }
        
          const {paymentIntent, error: confirmError } = await stripe.confirmCardPayment( clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email: user?.email || 'anonymous',
                  name: user?.displayName || 'anonymous'
                },
              },
            },
          );

          if(confirmError){
            console.log('confirm error')
          }
          else{
            console.log('payment intent', paymentIntent)
            if(paymentIntent.status=== 'succeeded'){
                console.log('transaction id', paymentIntent.id)
                setTransaction(paymentIntent.id)
                Swal.fire({
                    title: 'Success!',
                    text: ' payment successfully ',
                    icon: 'success',
                    confirmButtonText: 'OK'
                  })
            }
          }



    }

    return (
       <form onSubmit={handleSubmit}>
            <CardElement className="border p-3 rounded-md border-blue-400"
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="bg-[#3ea5fe] w-2/4 text-white p-2 rounded-md m-2 ml-24 " type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
        <p className="text-red-500 text-xl ml-12" >{error}</p>
        {transaction && <p className="text-green-400">transation id{transaction}</p>}
     
       </form>
    );
};

export default CheckoutForm;