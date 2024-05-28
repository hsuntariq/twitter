import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllComments,
  getAllTweets,
  getComments,
  likeTweet,
  makeComment,
  postTweet,
  saveTweet,
  shareTweet,
} from "./postService";

// define your initialState

const initialState = {
  posts: [],
  myPosts: [],
  savedPosts: [],
  saveLoading: false,
  saveSuccess: false,
  saveError: false,
  postLoading: false,
  postSuccess: false,
  postError: false,
  postMessage: false,
  comments: [],
  likeLoading: false,
  shareLoading: false,
  shareError: false,
  shareSuccess: false,
};

export const uploadTweet = createAsyncThunk(
  "post/add-tweet",
  async (tweetData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postTweet(tweetData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getTweetData = createAsyncThunk(
  "post/get-tweet",
  async (_, thunkAPI) => {
    try {
      return await getAllTweets();
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCommentData = createAsyncThunk(
  "post/get-comments",
  async (data, thunkAPI) => {
    try {
      console.log(data);
      return await getComments(data);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createComment = createAsyncThunk(
  "post/make-comment",
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await makeComment(commentData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likePost = createAsyncThunk(
  "post/like-post",
  async (post_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await likeTweet(post_id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sharePost = createAsyncThunk(
  "post/share-post",
  async (post_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await shareTweet(post_id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const savePost = createAsyncThunk(
  "post/save-post",
  async (saveData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await saveTweet(saveData, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllCommentData = createAsyncThunk(
  "post/get-all-comment",
  async (_, thunkAPI) => {
    try {
      return await getAllComments();
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
      state.shareError = false;
      state.shareLoading = false;
      state.shareSuccess = false;
      state.likeLoading = false;
      state.saveLoading = false;
      state.saveSuccess = false;
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
      })
      .addCase(getTweetData.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(getTweetData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.message = action.payload;
      })
      .addCase(getTweetData.fulfilled, (state, action) => {
        state.postLoading = false;
        // state.postSuccess = true;
        state.posts = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(createComment.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.message = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postSuccess = true;
        state.comments.push(action.payload);
      })
      .addCase(getCommentData.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(getCommentData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.message = action.payload;
      })
      .addCase(getCommentData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getAllCommentData.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(getAllCommentData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.message = action.payload;
      })
      .addCase(getAllCommentData.fulfilled, (state, action) => {
        state.postLoading = false;
        // state.postSuccess = true;
        state.comments = action.payload;
      })
      .addCase(likePost.pending, (state) => {
        state.likeLoading = true;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likeLoading = false;
        state.postError = true;
        state.message = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.likeLoading = false;

        state.posts = state?.posts?.map((item, index) => {
          if (item._id == action.payload._id) {
            item.likes = action.payload.likes;
          }
          return item;
        });
      })
      .addCase(sharePost.pending, (state) => {
        state.shareLoading = true;
      })
      .addCase(sharePost.rejected, (state, action) => {
        state.shareLoading = false;
        state.shareError = true;
        state.message = action.payload;
      })
      .addCase(sharePost.fulfilled, (state, action) => {
        state.shareLoading = false;
        state.shareSuccess = true;

        state.posts = state?.posts?.map((item, index) => {
          if (item?._id == action?.payload?._id) {
            item.shares = action?.payload?.shares;
          }
          return item;
        });
      })
      .addCase(savePost.pending, (state) => {
        state.saveLoading = true;
      })
      .addCase(savePost.rejected, (state, action) => {
        state.saveLoading = false;
        state.saveError = true;
        state.message = action.payload;
      })
      .addCase(savePost.fulfilled, (state, action) => {
        state.saveLoading = false;
        state.saveSuccess = true;
        state.savedPosts.push(action.payload);
      });
  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;
