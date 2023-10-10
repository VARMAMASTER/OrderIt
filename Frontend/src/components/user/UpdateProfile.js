import React, { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser, clearErrors } from "../../Actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../Constants/useConstant";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[avatar,setAvatar]=useState("");
    const[avatarPreview,setAvatarPreview]=useState("public/images/avatar.png");

    const alert =useAlert();
    const dispatch =useDispatch();
    const navigate = useNavigate();
    const{user} =useSelector((state)=>state.auth);
    const{error,isUpdated,loading} = useSelector((state)=>state.user);
    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("user updated successfully");
            dispatch(loadUser());

            navigate("/users/me");
            dispatch({
                type:UPDATE_PROFILE_RESET,
            });

        }
    },[dispatch,alert,error,navigate,isUpdated,user]);

    
  
    const submitHandler = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("avatar", avatar);
        dispatch(updateProfile(formData));
      };
    
      const onChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
        } 
      };
      return (
        <>
          <div className="row wrapper">
            <div className="col-10 col-lg-5 updateprofile">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
              <hi className="mt-2 mb-5">Update Profile</hi>
                <div className="from-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="text"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                  ></input>
                </div>
    
                <div className="from-group">
                  <label htmlFor="email_field">email</label>
                  <input
                    type="text"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  ></input>
                </div>
    
                <div className="form-group">
                  <lable htmlFor="avatar_upload">Avatar</lable>
                
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        src={avatarPreview}
                        className="rounded-circle"
                        alt="Avatar Preview"
                      />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="images/*"
                      onChange={onChange}
                    ></input>
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
                </div>
                <button
              
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </>
      );
}
