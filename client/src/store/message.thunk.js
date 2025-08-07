import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../components/utilities/axiosInstance";
import { toast } from "react-hot-toast";

export const sendMessageThunk = createAsyncThunk(
  "message/sendMessageThunk",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/getMessageThunk",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/message/get-messages/${receiverId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      const errorOutput = error?.response?.data?.errMessage;
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
