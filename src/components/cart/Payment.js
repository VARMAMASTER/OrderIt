import React, { useEffect } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErroes } from "../../Actions/orderActions";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

import { useNavigate } from "react-router-dom";
import axios from "axios";
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

export default function Payment() {
  return <div>Payment</div>;
}
