import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/user.thunk";

const login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    //console.log(e.target)             // e.target prints the whole HTML input tag
    //console.log(e.target.name)
    //console.log(e.target.value)         // .value prints the input given by the user
    // setLoginData({...loginData,           // ...loginData helps to retain old value of a different field, like if username is changed, the old password remains set in password
    //   [e.target.name]:e.target.value
    // })

    // another way using ...prev
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    // console.log('login')
    // toast.success("Login successfull")
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5 p-6">
      <div>
        <h1>Please Login</h1>
      </div>

      <div className="flex justify-center w-1/2">
        <label className="input validator">
          <FaUser />
          <input
            type="text"
            required
            placeholder="Username"
            name="username"
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
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div className="flex justify-center w-1/4">
        <button
          onClick={handleLogin}
          className="btn btn-soft btn-accent w-full"
        >
          Login
        </button>
      </div>

      <p>
        Don't have an account? &nbsp;
        <Link to="/signup" className="text-blue-500  underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default login;
