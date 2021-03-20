const Razorpay = require('razorpay');

exports.getPaymentOrder = (req, res) => {
  try {
    const options = {
      amount: req.query.amount * 100, // amount == Rs 10
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
    };

    const instance = new Razorpay({
      key_id: process.env.RAZOR_PAY_KEY_ID,
      key_secret: process.env.RAZOR_PAY_KEY_SECRET,
    });
  
    instance.orders.create(options, async function (err, order) {
  
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        });
      }
    return res.status(200).json(order);
  });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

exports.postPayment = (req, res) => {
  try {
    return request(
     {
     method: "POST",
     url: `https://${process.env.RAZOR_PAY_KEY_ID}:${process.env.RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
     form: {
        amount: 10 * 100, // amount == Rs 10 // Same As Order amount
        currency: "INR",
      },
    },
   
    async function (err, response, body) {
      if (err) {
        return res.status(500).json({
          message: "Something Went Wrong",
        }); 
      }
   
      console.log("Status:", response.statusCode);
      console.log("Headers:", JSON.stringify(response.headers));
      console.log("Response:", body);
      
      return res.status(200).json(body);
    });
  } catch (err) {
      return res.status(500).json({
        message: "Something Went Wrong",
    });
  }
};
