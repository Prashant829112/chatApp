import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { getOtherUsersThunk, logoutThunk } from "../../store/user.thunk";

const UserSidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };
  const { otherUsers } = useSelector((state) => state.userReducer);
  // console.log(otherUsers);
  useEffect(() => {
    (async () => {
      await dispatch(getOtherUsersThunk());
    })();
  }, []);
  // useEffect in react expects a synchronous fn that returns -> nothing or cleanup fn or just runs a code
  // if async await is directly used, it will return a Promise which is an object
  // that is why IIFE(Immediately Invoked fn expression , (fn)()) (runs without calling externally) has been used inside main fn which makes main fn synchronous & async fn(IIFE fn) which is inside main fn gets called by itself -> ()=>{(async fn)()}
  const { userProfile } = useSelector((state) => state.userReducer);

  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // otherUsers
    if (!searchValue) {
      setUsers(otherUsers);
    } else {
      setUsers(
        otherUsers.filter((user) => {
          return (
            user.userName.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.fullName.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      );
    }
  }, [searchValue]);

  return (
    <div className="max-w-[25em] w-full h-full flex flex-col border-r border-r-white/10">
      <h1 className="bg-black mx-3 rounded-lg mt-3 px-2 py-2 flex justify-center">
        CHATAPP
      </h1>

      <div className="p-3">
        <label className="input w-full">
          <CiSearch />
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            required
            placeholder="Search..."
          />
        </label>
      </div>

      <div className="h-full overflow-y-scroll px-3 fle flex-col gap-3">
        {users?.map((userDetails) => {
          // console.log(userDetails)
          return <User key={userDetails?._id} userDetails={userDetails} />;
        })}
        {/* userDetails is variable name for each indivisual element inside array otherUsers */}
        {/* array.map((var)=>{}) traverses each element of array with variable name "var" & runs the fn written inside {}*/}
      </div>

      <div className="flex items-center justify-between p-3 border-t border-t-white/10">
        <div className="flex items-center gap-3">
          <div className="avatar avatar-online avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-14 rounded-full">
              <span className="text-xl">{userProfile?.fullName[0]}</span>
            </div>
          </div>
          <h2>{userProfile?.userName}</h2>
        </div>

        <div>
          <button onClick={handleLogout} className="btn btn-soft btn-error">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
