import React, { useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../Actions/orderActions";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { clearErrors } from "../../Actions/userAction";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const paty = {
  backgroundColor: "#BE521F",
  color: "white",
};

const Payment = () => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, deliveryInfo, restaurant } = useSelector(
    (state) => state.cart
  );
  const { error } = useSelector((state) => state.newOrder);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);
  const order = {
    orderItems: cartItems,
    deliveryInfo,
    restaurant,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.deliveryPrice = orderInfo.deliveryPrice;
    order.finalTotal = orderInfo.finalTotal;
  }

  const paymentData = {
    amount: Math.round(orderInfo.finalTotal * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    let res;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      paymentData.description = "Payment for Fooditem purchase";
      res = await axios.post("/api/v1/payment/process", paymentData, config);
      const clientSecret = res.data.client_secret;
      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("this is some issue while payment processing");
        }
      }
    } catch (error) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(error.response.data.message);
    }
  };

  return (
    <>
      <CheckoutSteps delivery confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <from className="shadow-lg" onClick={submitHandler}>
            <h1 className="m-4">Card Info</h1>

            <div className="form-group">
              <label htmlfor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlfor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlfor="card_cvc_field">Card cvc</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button
              style={paty}
              id="pay_btn"
              type="submit"
              className="btn btn-block py-3 "
            >
              pay {` - ${orderInfo && orderInfo.finalTotal}`}
            </button>
          </from>
        </div>
      </div>
    </>
  );
};

export default Payment;
