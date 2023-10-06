import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  updateCartQuantity,
  removeItemFromCart,
} from "../../Actions/cartActions";

import React from "react";

export default function CART() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
 
  //function to remove items from the cart
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  //from to increase the quantity of an item
  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;
    dispatch(addItemToCart(id, newQty));
  };

  //function for decreasing the quantity of an item

  const decreaseQty = (id, quantity) => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      dispatch(updateCartQuantity(id, newQty));
    }
  };

  const checkoutHandler = () => {
    navigate("/delivery");
  };

  return (
    <div className="mt-5">
      {cartItems.length === 0 ? (
        <h2>Your Cart is empty</h2>
      ) : (
        <>
          <h2>
            Your Cart: <b>{cartItems.length} items</b>
          </h2>
          <div className="row d-flex justify-content-between cartt">
            <div className="col-12 col-lg-8">
              {cartItems.map((item) => (
                <>
                  <hr />
                  <div className="cart-item" key={item.fooditem}>
                    <div className="row">
                      {/* Display Item image*/}
                      <div className="col-4 col-lg-3">
                      {/* {item.image} */}
                        <img
                          src={item.image}
                          alt="items"
                          height="90"
                          width="115"
                        ></img>
                      </div>
                      {/* Display item Name */}
                      <div className="col-5 col-lg-3">{item.name}</div>
                       {/* Display item Name */}
                       <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">
                        ₹ {item.price}
                        </p>
                       </div>
                        {/* Quantity control */}
                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                {/* Decrease qty button */}
                                <span className="btn btn-danger minus" onClick ={()=>decreaseQty(item.fooditem, item.quantity)}>
                                -
                                </span>
                                {/* Displapy current quantity */}
                                <input
                                type ="number"
                                className="form-control count d-inline"
                                value={item.quantity}
                                readOnly
                                />
                                {/* Increase quantity button */}
                                <span
                                className="btn btn-primary plus" 
                                onClick={()=>increaseQty(
                                    item.fooditem,
                                    item.quantity,
                                    item.stock
                                )
                                }
                                >
                                +
                                </span>
                            </div>
                        </div>
                        {/* Remove item button */}
                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                            <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                            onClick={()=> removeCartItemHandler(item.foodItem)}></i>
                        </div>


                    </div>
                  </div>
                </>
              ))}
            </div>
            {/* order summery */}
            <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
            <h4>
              Order Summary
            </h4> <hr/>
            <p>
              Subtotal:
              <span className="order-summary-values">
              {cartItems.reduce(
                (acc,item)=>acc+ Number(item.quantity),0
              )}
              {" Units"}
              </span>
            </p>
                Total:
                <span className="order-summary-values">
                ₹ {cartItems.reduce(
                  (acc,item)=>acc+item.quantity*item.price,0).toFixed(2)
                }
                </span>
                <p>
                  <hr />
                  <button className="btn btn-primary btn-block" id="checkout_btn" onClick={checkoutHandler}>
                  
                  Check Out
                  </button>
                </p>
            </div>
 
            </div>
          </div>
        </>
      )}
    </div>
  );
}
