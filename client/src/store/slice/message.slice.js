import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "../message.thunk";

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      state.messages = [...(state.messages || []), action.payload];
    },
  },
  extraReducers: (builder) => {
    // sendMessage reducer
    builder.addCase(sendMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    }),
      builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.buttonLoading = true;
        state.messages = [
          ...(state.messages || []),
          action.payload?.responseData,
        ];
        // new message array is created which has old messages in ...state.messages & new message is added via action.payload?.responseData
        console.log(action.payload);
      }),
      builder.addCase(sendMessageThunk.rejected, (state, action) => {
        state.screenLoading = false;
      });

    // getMessage reducer
    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.buttonLoading = true;
    }),
      builder.addCase(getMessageThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        // console.log(action.payload)
        state.messages = action.payload?.responseData?.messages;
      }),
      builder.addCase(getMessageThunk.rejected, (state, action) => {
        state.screenLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
