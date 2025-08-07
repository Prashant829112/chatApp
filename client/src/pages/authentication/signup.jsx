import React from "react";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/user.thunk";
import toast from "react-hot-toast";

const signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const [signupData, setSignupData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });
  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const dispatch = useDispatch();
  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and ConfirmPassword do not match");
    }
    const response = await dispatch(registerUserThunk(signupData));
    console.log(response);
    if (response?.payload?.success) {
      navigate("/");
    }
  };
  //console.log(signupData);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5 p-6">
      <div>
        <h1>Please SignUP</h1>
      </div>

      <div className="flex justify-center w-1/2">
        <label className="input validator">
          <FaUser />
          <input
            type="text"
            required
            placeholder="FullName"
            name="fullname"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="flex justify-center w-1/2">
        <label className="input validator">
          <FaUser />
          <input
            type="text"
            required
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="flex justify-center w-1/2">
        <label className="input validator">
          <FaKey />
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="flex justify-center w-1/2">
        <label className="input validator">
          <FaKey />
          <input
            type="password"
            required
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="flex justify-center w-1/2">
        <div className="w-full border border-white/25 rounded-lg px-4 h-10 flex justify-around items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              className="radio"
              value="male"
              onChange={handleInputChange}
            />
            <span>Male</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="gender"
              className="radio"
              value="female"
              onChange={handleInputChange}
            />
            <span>Female</span>
          </label>
        </div>
      </div>

      <div className="flex justify-center w-1/4">
        <button
          onClick={handleSignup}
          className="btn btn-soft btn-accent w-full"
        >
          SignUp
        </button>
      </div>

      <p>
        Already have an account? &nbsp;
        <Link to="/login" className="text-blue-500  underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default signup;
