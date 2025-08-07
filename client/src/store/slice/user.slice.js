import { createSlice } from '@reduxjs/toolkit'
import { loginUserThunk } from '../user.thunk'
import { registerUserThunk } from '../user.thunk'
import { logoutThunk } from '../user.thunk'
import { getProfileThunk } from '../user.thunk'
import { getOtherUsersThunk } from '../user.thunk'

const initialState={
    isAuthenticated:false,
    screenLoading:true,
    userProfile:null,
    buttonLoading:false,
    otherUsers:null,
    selectedUser:JSON.parse(localStorage.getItem("selectedUser"))
    // localStorage is a browser feature that stores data in key-value pair until deleted manually -> used to save selectedUser after page reload
    // localStorage.getItem("key") retieves the sringified data
    // data stored in localStorage is strigified -> JSON.parse() converts it back to object format -> JSON.parse({"a":10})={a:10}
}

export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        // Login:()=>{
        //     console.log("Login")
        // }
        // writing fn this way does not support asynchronous calls 

        setSelectedUser:(state,action)=>{
            localStorage.setItem("selectedUser",JSON.stringify(action.payload))
            // localStorage.setItem("key",value) stores data which is value by the name "key" in localStorage 
            // value needs to be stringified to store in localStorage -> JSON.stringify({a:10})={"a":10}
            state.selectedUser=action.payload
        }
        // setSlectedUser fn does not involve any API call -> kept in normal reducer fn
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        // login reducer
        builder.addCase(loginUserThunk.pending, (state, action) => {
            // Add user to the state array
            //state.entities.push(action.payload)
            // console.log("Pending")
            state.buttonLoading=true
        }),
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            // console.log("Fullfiled")
            // console.log(action.payload)         
            state.userProfile=action.payload?.responseData?.user
            state.isAuthenticated=true
            state.buttonLoading=false
        }),
        builder.addCase(loginUserThunk.rejected, (state, action) => {
            console.log("Rejected")
            state.buttonLoading=false
        })

        // signup reducer 
        builder.addCase(registerUserThunk.pending, (state, action) => {
            state.buttonLoading=true
        }),
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {       
            state.userProfile=action.payload?.responseData?.user
            state.isAuthenticated=true
            state.buttonLoading=false
        }),
        builder.addCase(registerUserThunk.rejected, (state, action) => {
            state.buttonLoading=false
        })

        // logout reducer
        builder.addCase(logoutThunk.pending, (state, action) => {
            state.buttonLoading=true
        }),
        builder.addCase(logoutThunk.fulfilled, (state, action) => {       
            state.userProfile=null
            state.otherUsers=null
            state.selectedUser=null
            state.isAuthenticated=false
            state.buttonLoading=false
            localStorage.clear()
        }),
        builder.addCase(logoutThunk.rejected, (state, action) => {
            state.buttonLoading=false
        })

        // getProfile reducer
        builder.addCase(getProfileThunk.pending, (state, action) => {
            // state.screenLoading=true
        }),
        builder.addCase(getProfileThunk.fulfilled, (state, action) => {       
            state.isAuthenticated=true
            state.screenLoading=false
            // console.log(action.payload)
            state.userProfile=action.payload?.responseData
            // console.log(state.userProfile)
        }),
        builder.addCase(getProfileThunk.rejected, (state, action) => {
            state.screenLoading=false
        })

        // getOtherUsers reducer
        builder.addCase(getOtherUsersThunk.pending, (state, action) => {
            state.screenLoading=true
        }),
        builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {       
            state.screenLoading=false
            state.otherUsers=action.payload?.responseData
            // console.log(action.payload)
        }),
        builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
            state.screenLoading=false
        })
    },
})

// Action creators are generated for each case reducer function
export const {setSelectedUser}=userSlice.actions

export default userSlice.reducer