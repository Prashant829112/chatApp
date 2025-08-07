import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/message.thunk";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.userReducer);
  const handleSendMessage = () => {
    console.log(message);
    dispatch(sendMessageThunk({ receiverId: selectedUser?._id, message }));
    setMessage("");
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="flex p-3 justify-center gap-1">
      <input
        type="text"
        placeholder="Type here..."
        className="input input-accent w-full"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown} // ⬅️ Enter detect karta ha
        value={message}
      />
      <button onClick={handleSendMessage} className="btn btn-square">
        <IoIosSend />
      </button>
    </div>
  );
};

export default SendMessage;
