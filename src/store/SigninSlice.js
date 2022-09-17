import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getPost = createAsyncThunk("data/getPost", async ({token}) => {
 return fetch(`${process.env.REACT_APP_BACKEND_URL}/productions`, {
            method: "GET",
            headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'token': token
                }
        }).then((res) => console.log(res));
    }
);
export const deletePost = createAsyncThunk(
  "data/deletePost",
  async ({ id }) => {
    return fetch(`https://jsonplaceholder.typicode.com/datas/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  }
);
export const Signin = createAsyncThunk(
  "Signin",
  async ({ body }) => {
    console.log(body,"udissssssssssssssssssssss");
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body:JSON.stringify( body)
    }).then((res) =>  res.json());
  }
);
export const updatePost = createAsyncThunk(
  "data/updatePost",
  async ({ id, title, body }) => {
    return fetch(`https://jsonplaceholder.typicode.com/datas/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    }).then((res) => res.json());
  }
);

const SigninSlice = createSlice({
  name: "data",
  initialState: {
    data:"",
    loading: false,
    error: null,
    body: "",
    edit: false,
  },
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;
      state.body = action.payload.body;
    },
  },
    extraReducers: {
      [getPost.pending]: (state, action) => {
        state.loading = true;
      },
      [getPost.fulfilled]: (state, action) => {
        state.loading = false;
        state.data = [action.payload];
      },
      [getPost.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    [deletePost.pending]: (state, action) => {
      state.loading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = [action.payload];
    },
    [deletePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [Signin.pending]: (state, action) => {
      state.loading = true;
    },
    [Signin.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = [action.payload];
    },
    [Signin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updatePost.pending]: (state, action) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = [action.payload];
    },
    [updatePost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { setEdit } = SigninSlice.actions;
export default SigninSlice.reducer;
