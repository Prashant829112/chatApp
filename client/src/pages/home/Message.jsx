import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ messageDetails }) => {
  // console.log(messageDetails);
  const { selectedUser } = useSelector((state) => state.userReducer);
  const { userProfile } = useSelector((state) => state.userReducer);
  // console.log(selectedUser)
  // console.log(userProfile)
  const utcDateStr = messageDetails?.createdAt; // e.g. "2025-06-13T21:07:16.789Z"
  // Convert to Date object (auto converts to local time in JS)
  const localDate = new Date(utcDateStr); // e.g. Sat Jun 14 2025 02:37:16 GMT+0530 (India Standard Time)
  // Extract local parts
  const date = localDate.toLocaleDateString(); // e.g. "14/6/2025"
  const time = localDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // e.g. "02:37 AM"
  // localDate.toLocaleTimeString([], {...}) -> [] means format time according to browser's default language & region setting -> 'en-IN' for India 12-hour AM/PM, 'en-GB' for UK 24-hour format can be used in place of [] explicitly
  const myMessage =
    userProfile?._id === messageDetails?.senderId ? true : false;

  const messageRef = useRef(null);

  useEffect(()=>{
    if(messageRef.current){
      messageRef.current.scrollIntoView({behaviour:"smooth"})
    }
  },[])

  return (
    <div>
      <div
        ref={messageRef}
        className={`chat ${myMessage ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image">
          <div className="bg-neutral text-neutral-content w-12 h-12 rounded-full flex items-center justify-center">
            <span>
              {myMessage ? userProfile?.fullName[0] : selectedUser?.fullName[0]}
            </span>
          </div>
        </div>
        <div className="chat-header">
          {myMessage ? userProfile?.userName : selectedUser?.userName}
        </div>
        <div className="chat-bubble">{messageDetails?.message}</div>
        <div className="chat-footer opacity-50">
          {date} {time}
        </div>
      </div>
    </div>
  );
};

export default Message;
