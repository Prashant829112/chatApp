import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect } from "react";
// import { Login } from "./store/slice/user.slice";
import { getProfileThunk, loginUserThunk } from "./store/user.thunk";
import {Toaster} from 'react-hot-toast'

function App() {
  // retrieving state
  //const x=useSelector(state=>state)     // returns the whole object -> userReducer:{isAuthenticated:false}
  // console.log(x);
  // const {isAuthenticated}=useSelector(state=>state.userReducer)
  // console.log(isAuthenticated)

  // retrieving fn
  // const dispatch=useDispatch()
  // useEffect(()=>{
  //   dispatch(Login())
  //   dispatch(loginUserThunk())
  // })

  const dispatch=useDispatch()
  useEffect(()=>{
    (async ()=>{
      await dispatch(getProfileThunk())
    })()
  },[])
  // this useEffect manages state before home page is rendered based on whether user is logged in or not
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} /> 
      {/* <Toaster> required to use toast.success() */}
    </>
  );
}

export default App;
