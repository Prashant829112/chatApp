import React from "react";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeSocket, setOnlineUsers } from "../../store/slice/socket.slice";
import { setNewMessage } from "../../store/slice/message.slice";

const home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile } = useSelector(
    (state) => state.userReducer
  );
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  const {socket,onlineUsers}=useSelector(state=>state.socketReducer)
  // console.log(onlineUsers)
  useEffect(() => {
    if(!socket){
      return 
    }
    socket.on("onlineUsers", (onlineUsers) => {
      // console.log(onlineUsers);
      // state.onlineUsers = onlineUsers;
      dispatch(setOnlineUsers(onlineUsers))
    });
    socket.on("newMessage", (newMessage) => {
      // console.log(newMessage)
      dispatch(setNewMessage(newMessage))
    });
    return ()=>{
      socket.close()
    }
    // when <Home/> unmounts, close the connection
  }, [socket]);
  // this useEffect runs sets event listeners on first render of <Home/> or when socket changes

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};

export default home;
