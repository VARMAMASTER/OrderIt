import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword,clearErrors } from "../../Actions/userAction";
import{useParams} from "react"
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
    const [password,setPassword]=useState("");

    const [passwordConfirm,setPasswordConfirm] = useState("confirm");
    const alert = useAlert();
    const dispatch = useDispatch;
    const {error,success}=useSelector((state)=>state.forgotPassword)


    const{token} =useParams();
    const navigate =useNavigate();


    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success){
            alert.success("Password Updated Successfully");
            navigate("user/login");
        }


    },[dispatch,alert,error,success,navigate]);

    const submitHandler = (e)=>{
        e.preventDefault();
        const formData  = new FormData();
        formData.set("password",password);
        formData.set("passwordConfirm",passwordConfirm);
        dispatch(resetPassword(token,formData));
    }

   
 
    return (
        <>
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>
            <div className="from-group">
                <label htmlFor="password_field">Password</label>
                <input 
                type="password"
                id="password_filed"
                className="from-control"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}      
                />   
            </div>

            <div className="from-group">
                <label htmlFor="confirm_password_field">Password</label>
                <input 
                type="password"
                id="confirm_password_field"
                className="from-control"
                value={passwordConfirm}
                onChange={(e)=>setPasswordConfirm(e.target.value)}      
                />   
            </div>
            <button
            id = "new_password_button"
            type = "submit"
            className="btn btn-block py-3"
           >
                Set Password
            </button>
        </form>
        </div>
        </div>
    
    
        </>
      )
}
