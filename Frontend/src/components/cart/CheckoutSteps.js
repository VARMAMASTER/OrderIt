import React from "react";
import {Link} from "react-router-dom";

export default function CheckoutSteps({delivery,confirmOrder,payment}){
    return(
        <div className="checkout-progress d-flex justify-content-center mt-5">
            {delivery ?(
                //If delivey is true, create a link to the "delivery route with active styles"
                <Link
                to="shipping" className="float-right">
                <div className="triangle2-acive"></div>
                <div className="step active-step">Address</div>
                <div className="triangle-active"></div>
                </Link>
            ):(
                <Link
                to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Address</div>
                <div className="triangle-incomplete"></div>
                </Link>

            )}

            {confirmOrder ?(
                //If delivey is true, create a link to the "delivery route with active styles"
                <Link
                to="/order/confirm" className="float-right">
                <div className="triangle2-acive"></div>
                <div className="step active-step">Confirm Order</div>
                <div className="triangle-active"></div>
                </Link>
            ):(
                <Link
                to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Confirm Order</div>
                <div className="triangle-incomplete"></div>
                </Link>

            )}

            {payment ?(
                //If delivey is true, create a link to the "delivery route with active styles"
                <Link
                to="/payment" className="float-right">
                <div className="triangle2-acive"></div>
                <div className="step active-step">Payment</div>
                <div className="triangle-active"></div>
                </Link>
            ):(
                <Link
                to="#!" disabled>
                <div className="triangle2-incomplete"></div>
                <div className="step incomplete">Payment</div>
                <div className="triangle-incomplete"></div>
                </Link>

            )}
        </div>
    )
}