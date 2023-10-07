import "./App.css";
import "./components/home";
import Home from "./components/home";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import CART from "./components/cart/CART";
import Delivery from "./components/cart/Delivery";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import NewPassword from "./components/user/NewPassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ConfirmOrder from "./components/cart/ConfirmOrders";
import {Elements} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Payment from "./components/cart/Payment" 
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails"
 
export default function App() {
  const [stripeApiKey,setStripeApiKey] = useState(""); 
  useEffect(() => {
    store.dispatch(loadUser());
    async function getStripeApiKey(){
      const {data} = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/eats/stores/:id/menus" element={<Menu />} exact />
            <Route path="/cart" element={<CART />} exact />
            <Route path="/delivery" element={<Delivery />} exact />
            <Route path="/users/login" element={<Login />} exact />
            <Route path="/users/signup" element={<Register />} />
            <Route path="/users/me" element={<Profile />} />
            <Route path="/users/me/update" element={<UpdateProfile />} exact />
            <Route
              path="/users/forgetPassword"
              element={<ForgotPassword/>}
              exact
            />
            <Route
              path="/users/resetPassword/:token"
              element={<NewPassword/>}
              exact
            />
            <Route path="/confirm" element={<ConfirmOrder/>}/>
            {
              stripeApiKey && (
                <Route
                  path = "/payment"
                  element={<Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment/>
                  </Elements>}
                />
              )}
            <Route path="/success" element={<OrderSuccess/>}/>
            <Route path="/eats/orders/me/myOrders" element={<ListOrders/>}/>
            <Route path="/eats/orders/:id" element={<OrderDetails/>}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
