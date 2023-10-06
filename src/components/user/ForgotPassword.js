import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword,clearErrors } from '../../Actions/userAction'
export default function ForgotPassword() {
    const [email,setEmail] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();
    const {error,loading,message}=useSelector((state)=>state.forgotPassword);

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(message){
            alert.success(message);
        }


    },[dispatch,alert,error,message]);

    const submitHandler = (e)=>{
       
        e.preventDefault();
        const formData  = new FormData();
        formData.set("email",email);
        dispatch(forgotPassword(formData));
    }

   
  return (
    <>
    <div className="row wrapper">
    <div className="co-10 col-lg-5">
    <form className="shadow-lg" onSubmit={submitHandler}>
        <h1 className="mb-3">ForgetPassword</h1>
        {/* <div className="from-group">
            <label htmlFor="email_field">Enter Email</label>
            <input 
            type="text"
            id="email_filed"
            className="from-control"
            value={email}
            onChange={(e)=>setEmail(e.target)}      
            />   
        </div> */}
  
           
        <div className="from-group">
                  <label htmlFor="email_field">Enter Email</label>
                  <input
                    type="text"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  ></input>
                </div>

        <button
        id = "forgot_password"
        type = "submit"
        className="btn btn-block py-3"
        disabled={loading?true:false}>
            Send Email
        </button>
    </form>
    </div>
    </div>


    </>
  )
}
