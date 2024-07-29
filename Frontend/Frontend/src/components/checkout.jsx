import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (location.state && location.state.book) {
      setBook(location.state.book);
    } else {
      // Redirect or show an error if no book is found
      console.error("No book found in state");
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !book) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const { id } = paymentMethod;
    const response = await axios.post('http://localhost:4000/api/create-payment-intent', {
      amount: book.price * 100, // Convert dollars to cents
    });

    const { clientSecret } = response.data;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: id,
    });

    if (result.error) {
      setErrorMessage(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setPaymentSuccessful(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl text-center mb-6 font-bold text-gray-800">Checkout</h1>
        {book && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-700 mb-2">Price: ${book.price}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-gray-100 rounded-lg">
            <CardElement options={{ hidePostalCode: true }} />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Pay
          </button>
        </form>
        {paymentSuccessful && <p className="text-green-500 mt-4 text-center">Payment Successful!</p>}
        {errorMessage && <p className="text-red-500 mt-4 text-center">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Checkout;
