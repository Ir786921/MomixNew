import React, { useEffect, useRef, useState } from "react";
import { validation } from "../Utils/Validation";
import {  createUserWithEmailAndPassword , signInWithEmailAndPassword , fetchSignInMethodsForEmail, updateProfile} from "firebase/auth";
import {auth} from "../Utils/firebaseConfig";
import image from "../asset/Netflix.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, isLogin } from "./UserSlice";
import Store from "./store";
import Loader from "./Loader";



const Signup = () => {
  const [isclick, setIsclick] = useState(false);
  const [isSignUp,setIsSignUp] = useState(false)
  const [isUserLogin,setIsUserLogin] = useState(false)

  const [validationText, setValidationText] = useState(" ");
  const email = useRef(null);
  const password = useRef(null);
  const fname = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const UserDetails = useSelector(Store => Store.user.item);

  function clickHandle() {
    setIsclick(!isclick);
    setValidationText("")
    if(email.current){
        email.current.value = " "
    }
    if(password.current){
        password.current.value = ""
    }
  }
  async function LoginClicked() {
    
  
    // Validate email and password
    const emailValue = email?.current?.value;
    const passwordValue = password?.current?.value;
    const text = validation(emailValue, passwordValue);
    setValidationText(text);
    setIsUserLogin(true)
  
   // Stop execution if validation fails
  
    try {
   
      const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
      let user = userCredential.user;
  
   
      await user.reload();
      
      console.log("User logged in:", user);
      console.log("User display name:", user.displayName); 
  
      // Dispatch to Redux (if needed)
      dispatch(isLogin())
      dispatch(addUser(user));

        
        
      
    
        navigate("/browse");
     
  
      // Navigate only after successful login
      
    } catch (error) {
      console.error("Login error:", error.message);
      if (error.code === "auth/wrong-password") {
        setValidationText("Incorrect password! Please try again.");
      } else if (error.code === "auth/network-request-failed") {
        setValidationText("Network error! Check your connection.");
      } 
    }
  }
  

  async function SignupClicked() {
 
  
    const text = validation(
      email?.current?.value,
      password?.current?.value,
      fname?.current?.value
    );
    setValidationText(text);
    setIsSignUp(true)
  
    // Stop execution if validation fails
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email?.current?.value,
        password?.current?.value
      );
  
      const user = userCredential.user;
      console.log(user);
      
  
      // Update user profile with displayName
      await updateProfile(user, {
        displayName: fname?.current?.value,
      });
  
      // Dispatch actions after profile update
      dispatch(isLogin());
      dispatch(addUser(user));
  
      // Navigate after state update
      navigate("/browse");
    } catch (error) {
      if (error.code === "auth/email-already-in-use" || error.message.includes("EMAIL_EXISTS")) {
        setValidationText("User already exists! Please log in.");
      } else if (error.code === "auth/network-request-failed") {
        setValidationText("Network error! Check your internet connection.");
      } 
    }
  }




  return (
    <>
    { (isUserLogin && (!UserDetails || UserDetails.length === 0))  && <Loader/> || (isSignUp && (!UserDetails || UserDetails.length === 0))  && <Loader/>}
   <div className=" tw-flex justify-center  tw-h-screen"
   style={{backgroundImage:`url(${image})`}}>
     <div className="tw-m-auto tw-p-4 tw-bg-black tw-opacity-85 tw-rounded-md tw-shadow-md md:tw-w-[30%] tw-w-[70%]">
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      action=""
      className="tw-flex tw-justify-center tw-flex-col"
    >
      <p className="tw-text-start tw-text-white tw-font-bold tw-text-3xl tw-w-full  md:tw-ml-10 ">
        {isclick ? "Login" : "SignUp"}
      </p>
      <br />
      {!isclick && (
        <>
          <input
            type="text"
            ref={fname}
            className="tw-bg-[#333333] tw-w-[82%] tw-m-auto tw-p-2 tw-rounded-md tw-shadow-sm tw-text-white"
            placeholder="Full Name"
            required0
          />
          <br />
        </>
      )}
  
      <input
        type="email"
        ref={email}
        className="tw-bg-[#333333] tw-w-[82%]  tw-m-auto tw-p-2 tw-rounded-md tw-shadow-sm tw-text-white"
        placeholder="Email or Phone Number"
        required
      />
      <br />
      <input
        type="password"
        ref={password}
        className="tw-bg-[#333333] tw-w-[82%]  tw-m-auto tw-p-2 tw-rounded-md tw-shadow-sm tw-text-white"
        placeholder="Password"
        required
      />
      <br />
      <p className="tw-text-[#E50914] tw-text-lg tw-font-semibold tw-ml-10">
        {validationText}
      </p>
      <br />
  
      <button
        className="tw-w-[82%]  tw-m-auto tw-p-2 tw-rounded-md tw-shadow-sm tw-text-white tw-bg-[#E50914]"
        onClick={isclick ? LoginClicked : SignupClicked}
      >
        {isclick ? "Login" : "SignUp"}
      </button>
    </form>
    <br />
    <p className="tw-text-gray-600 tw-text-lg md:tw-ml-10 tw-cursor-pointer">
      {isclick ? "New Here" : "Already registered"} ? &nbsp;
      <span className="tw-text-white" onClick={clickHandle}>
        {" "}
        {isclick ? "Sign up now" : "Login"}
      </span>
    </p>
  </div>
   </div>
   </>
  );
};

export default Signup;
