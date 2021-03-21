import { useState } from 'react';
import axios from 'axios';

// import usePayment from '../Payment/usePayment';
// const [paymentHandler, setOrderAmount, setMyColor] = usePayment();
// setOrderAmount(19);
// setMyColor("#000");
// onClick={paymentHandler}

function usePayment() {
  // const [orderAmount, setOrderAmount] = useState(50);
  const [myColor, setMyColor] = useState("#686CFD");
  const myAppName = "CodeX Clinic";
  const myDescription = "";

  const paymentHandler = async (orderAmount) => {
    const API_URL = 'http://localhost:5000/'
    // e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await axios.get(orderUrl,
       { params: { amount: orderAmount } });
    const { data } = response;
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      name: myAppName,
      description: myDescription,
      order_id: data.id,
      
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}`;
         const captureResponse = await axios.post(url, {})
         console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: myColor,
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return [paymentHandler, setMyColor]
}

export default usePayment;