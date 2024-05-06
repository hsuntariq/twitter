// 1.always import these two packages in every slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser } from "./authService";

// check for user in the localStorage
// get the item with the name of user
// convert the string into object

const isUserAvailable = JSON.parse(localStorage.getItem("user"));

// 2.define your initial state

const initialState = {
  user: isUserAvailable ? isUserAvailable : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// handle the states of register user

export const regUser = createAsyncThunk(
  "auth/reg-user",
  async (userData, thunkAPI) => {
    try {
      return await registerUser(userData);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. create your slice to make your state global

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      });
  },
});

// 4.export your slice
export const { reset } = authSlice.actions;
export default authSlice.reducer;
