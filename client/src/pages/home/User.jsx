import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user.slice";

const User = ({ userDetails }) => {
  // console.log(userDetails);
  const dispatch = useDispatch();
  const { selectedUser,otherUsers } = useSelector((state) => state.userReducer);
  // console.log(selectedUser);
  // console.log(otherUsers)
  const handleUserClick = () => {
    dispatch(setSelectedUser(userDetails));
  };
  const { onlineUsers } = useSelector((state) => state.socketReducer);

  // console.log(onlineUsers?.includes(userDetails?._id));
  const isUserOnline=onlineUsers?.includes(userDetails?._id)
  return (
    <div
      onClick={handleUserClick}
      className={`flex gap-5 items-center hover:bg-gray-700 rounded-lg p-1 cursor-pointer ${
        userDetails?._id === selectedUser?._id && "bg-gray-700"
      }`}
    >
      <div className={`avatar ${isUserOnline && 'avatar-online'} avatar-placeholder`}>
        <div className="bg-neutral text-neutral-content w-12 rounded-full">
          <span>{userDetails?.fullName[0]}</span>
        </div>
      </div>
      <div>
        <h2 className="line-clamp-1">{userDetails?.fullName}</h2>
        <p className="text-xs">{userDetails?.userName}</p>
      </div>
    </div>
  );
};

export default User;
