import { Link, useHistory } from "react-router-dom";
import React from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { EventBusyTwoTone } from "@material-ui/icons";
import CurrencyFormat from "react-currency-format";
import { basketTotal } from "./reducer";
import axios from "axios";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const Elements = useElements();

  const [error, setError] = useState(null);
  const [disable, setDisable] = useState(true);
  const [ succeded, setSucceded] = useState(false);
  const [ processing, setProcessing ] = useState("");
  const [ clientSecret, setClientSecret ] = useState(true);

  useEffect ( ()=> {
    const getClientsecret = async () => {
        const response = await axios({
            method: 'POST',
            url: `/payments/create?total=${basketTotal(basket) * 100}`
        })
        setClientSecret(response.data.clientSecret);

        console.log("res...", response)
    }
    
    getClientsecret();
  },[basket])
   
  console.log("secret is >>", clientSecret)
  const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmPayment(clientSecret, {
          payment_method: {
              card: Elements.getElement(CardElement)
          }
      }).then(({ paymentIntent }) => {
          setSucceded(true);
          setError(null);
          setProcessing(false);

          history.replace('/orders')
      })
  };

  const handleChange = event => {
    setDisable(event.empty);
    setError(event.error ? EventBusyTwoTone.error.message : "");
  };
  return (
    <div className="payment">
      <h1>
        Checkout (<Link to="/checkout">{basket?.length} items</Link>)
      </h1>

      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h3> Delivery addresss </h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 react lane</p>
            <p>Redux Los Angeles</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                img={item.image}
              />
            ))}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__price">
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={basketTotal(basket)} // Part of the homework
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled ={processing || disable || succeded}>
                    <span>{processing ?  <p>Processing </p> : "Buy Now" }</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
