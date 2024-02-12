/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Instagram } from "react-feather";
import { Facebook } from "react-feather";
import { Mail } from "react-feather";
import { GitHub } from "react-feather";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Authenticate = () => {
  const [isActive, setIsActive] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Firebase Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target.elements.displayName.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    try {
      // Creates User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Defines the photoURL variable with the path to the profile picture
      const photoURL = "/profile/2.png";

      // Update User profile with the display name and profile picture
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL,
      });

      // Triggers Login animation
      handleClick();

      // Adds User to Users database
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName,
        email,
        photoURL: user.photoURL,
      });

      // Users Chats
      await setDoc(doc(db, "userChats", user.uid), {});

      // Signs Out User
      await signOut(auth);
    } catch (err) {
      let errorCode = err.code;
      let errorMessage = err.message;
      setErr(!err);
      console.log(`Error Code: ${errorCode} \n Error Message: ${errorMessage}`);
      // Handle errors (e.g., show error message to user)
    }
  };

  return (
    <div
      className={`container bg-white rounded-2xl shadow-lg overflow-hidden relative w-full md:w-[768px] max-w-full max-h-[480px] ${
        isActive ? "active" : ""
      }`}
      id="container"
    >
      <div className="form-container transition-all duration-600 ease-in-out sign-up">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col items-center justify-center px-10 h-full"
        >
          <h1 className="text-2xl font-bold">Create Account</h1>
          <div className="social-icons p-2 flex gap-4">
            <a
              href="#"
              className="my-3 border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10"
            >
              <Instagram />
            </a>
            <a
              href="#"
              className="my-3 border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10"
            >
              <Facebook />
            </a>
            <a
              href="#"
              className="my-3 border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10"
            >
              <Mail />
            </a>
            <a
              href="#"
              className="my-3 border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10"
            >
              <GitHub />
            </a>
          </div>
          <span className="text-xs">or use your email for registration</span>
          <input
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mt-2 mb-2 w-full text-sm focus:outline-none"
            type="text"
            placeholder="Name"
            name="displayName"
          />
          <input
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mt-2 mb-2 w-full text-sm focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mt-2 mb-2 w-full text-sm focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
          />
          {err && (
            <span className="text-red-500">Oops! Something went wrong.</span>
          )}
          <button className="bg-indigo-500 text-white text-xs md:text-sm font-semibold py-2 px-6 md:px-10 rounded-lg border border-transparent uppercase tracking-wide mt-4 cursor-pointer">
            Sign Up
          </button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form
          onSubmit={handleLogin}
          className="bg-white flex flex-col items-center justify-center px-10 h-full"
        >
          <h1 className="text-2xl font-bold">Sign In</h1>
          <div className="social-icons p-2 flex gap-4">
            <a
              href="#"
              className="my-3 border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10"
            >
              <Instagram />
            </a>
            <a
              href="#"
              className="my-3 border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10"
            >
              <Facebook />
            </a>
            <a
              href="#"
              className="my-3 border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10"
            >
              <Mail />
            </a>
            <a
              href="#"
              className="my-3 border border-gray-300 rounded-lg inline-flex justify-center items-center mx-1 w-10 h-10"
            >
              <GitHub />
            </a>
          </div>
          <span className="text-xs">or use your email password</span>
          <input
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mt-2 mb-2 w-full text-sm focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="bg-gray-100 border border-gray-300 rounded px-4 py-2 mt-2 mb-2 w-full text-sm focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
          />
          <a href="#">Forget Your Password?</a>
          <button className="bg-indigo-500 text-white text-xs md:text-sm font-semibold py-2 px-6 md:px-10 rounded-lg border border-transparent uppercase tracking-wide mt-4 cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
      <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden ">
        <div className="toggle bg-gradient-to-r from-indigo-900 to-indigo-700 text-white relative left-[-100%] w-[200%] h-[100%]">
          <div className="toggle-panel absolute top-0 w-1/2 h-full flex flex-col justify-center items-center px-6 text-center toggle-left">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="text-base leading-normal tracking-tight my-5">
              Enter your personal details to use all of site features
            </p>
            <button
              className="bg-indigo-500 text-white text-xs md:text-sm font-semibold py-2 px-6 md:px-10 rounded-lg border border-transparent uppercase tracking-wide mt-4 cursor-pointer"
              id="login"
              onClick={handleClick}
            >
              Sign In
            </button>
          </div>
          <div className="toggle-panel absolute top-0 w-1/2 h-full flex flex-col justify-center items-center px-6 text-center toggle-right">
            <h1 className="text-2xl font-bold">Hello, Friend!</h1>
            <p className="text-base leading-normal tracking-tight my-5">
              Register with your personal details to use all of site features
            </p>
            <button
              className="bg-indigo-500 text-white text-xs md:text-sm font-semibold py-2 px-6 md:px-10 rounded-lg border border-transparent uppercase tracking-wide mt-4 cursor-pointer"
              id="register"
              onClick={handleClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
