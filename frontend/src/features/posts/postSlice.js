import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postTweet } from "./postService";

// define your initialState

const initialState = {
  posts: [],
  myPosts: [],
  postLoading: false,
  postSuccess: false,
  postError: false,
  postMessage: false,
};

export const uploadTweet = createAsyncThunk(
  "post/add-tweet",
  async (tweetData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await postTweet(tweetData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postReset: (state) => {
      state.postLoading = false;
      state.postError = false;
      state.postSuccess = false;
      state.postMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadTweet.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(uploadTweet.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.message = action.payload;
      })
      .addCase(uploadTweet.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postSuccess = true;
        state.posts.push(action.payload);
      });
  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;
