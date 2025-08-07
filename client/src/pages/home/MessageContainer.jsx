import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/message.thunk";
import SendMessage from "./sendMessage";

const MessageContainer = () => {
  const { selectedUser } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedUser?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);
  const { messages } = useSelector((state) => state.messageReducer);
  // console.log(messages);
  return (
    <>
      {!selectedUser ? (
        <div className="w-full flex items-center justify-center flex-col gap-5">
          <h2>CHATAPP</h2>
          <p className="text-xl">Send and receive messages!</p>
        </div>
      ) : (
        <div className=" h-screen w-full flex flex-col">
          <div className="p-3 border-b border-b-white/10">
            <User userDetails={selectedUser} />
          </div>
          <div className="h-full overflow-y-auto p-3">
            {messages?.map((messageDetails) => {
              return <Message key={messageDetails?._id} messageDetails={messageDetails} />;
            })}
          </div>
          <SendMessage/>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
