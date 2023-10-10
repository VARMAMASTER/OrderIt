import { restaurantReducer } from "./Reducers/restaurantReducer";
import { menuReducer } from "./Reducers/menuReducers";

import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/cartReducer";
import {
  authReducer,
  forgotPasswordReducer,
  userReducer,
} from "./Reducers/userReducer";
import {
  myOrdersReducers,
  newOrderReducer,
  orderDetailsReducer,
} from "./Reducers/orderReducers";

// Define your reducers here
const rootReducer = combineReducers({
  restaurants: restaurantReducer,
  menus: menuReducer,
  cart: cartReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducers,
  orderDetails: orderDetailsReducer,
});

// Define your initial state here
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    deliveryInfo: localStorage.getItem("deliveryInfo")
      ? JSON.parse(localStorage.getItem("deliveryInfo"))
      : [],
  },
};

// Define middleware
const middleware = [thunk];

// Configure Redux DevTools Extension
const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
