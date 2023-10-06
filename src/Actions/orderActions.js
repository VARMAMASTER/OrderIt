import axios from "axios";

import{
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    CLEAR_ERRORS,
    ORDER_DETAILS_SUCCESS,
}from "../Constants/orderConstants";

export const createOrder = (order) =>async (dispatch)=>{
    try{
        dispatch({
            type:CREATE_ORDER_REQUEST,

        })

        const config ={
            header:{
                "Content-Type":"applycation/json"
            }
        }

        const{data} = await axios.post("/api/v1/eats/orders/new",order,config);

        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload: data,
        });

    }catch(e){
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:e.response.data.message,
        })
    }
}
 
//my orders

export const myOrders = () =>async (dispatch)=>{
    try{
        dispatch({
            type:MY_ORDER_REQUEST,

        })

        const{data} = await axios.get("/api/v1/eats/orders/me/myOrders");

        dispatch({
            type:MY_ORDER_SUCCESS,
            payload: data.orders,
        });

    }catch(e){
        dispatch({
            type:MY_ORDER_FAIL,
            payload:e.response.data.message,
        })
    }
}


export const getOrderDetails = (id) =>async (dispatch)=>{
    try{
        dispatch({
            type:ORDER_DETAILS_REQUEST,
        })

        const config ={
            header:{
                "Content-Type":"applycation/json"
            }
        }

        const{data} = await axios.get(`/api/v1/eats/orders/${id}`);

        dispatch({
            type:ORDER_DETAILS_SUCCESS,
            payload: data.order,
        });

    }catch(e){
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:e.response.data.message,
        })
    }
}
 
//Clear Errors

export const clearErrors =()=>async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS,

    })
}
 

