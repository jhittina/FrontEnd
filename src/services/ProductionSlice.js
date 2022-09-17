import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProductions = createAsyncThunk("getProductions", async ({ arg }) => {
  const {token} = arg
  var url = `${process.env.REACT_APP_BACKEND_URL}/productions`
  const options = {
    method: "GET",
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'token': token
    }
  }
  return fetch(url, options).then((res) => res.json());
}
);

export const deleteProduction = createAsyncThunk(
  "deleteProduction",
  async ({ arg }) => {
    const {token,id} = arg
    var url = `${process.env.REACT_APP_BACKEND_URL}/production/?id=${id}`
    const options ={
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        'token': token
      },
    }
    return fetch(url, options).then((res) => res.json());
  }
);
export const createProduction = createAsyncThunk(
  "createProduction",
  async ({ arg }) => {
    const {body,token} = arg
    var url
    if (body.hasOwnProperty("_id")) {
      url = `${process.env.REACT_APP_BACKEND_URL}/production/?id=${body?._id}`
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/production`
    }
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        'token': token
      },
      body: JSON.stringify(body),
    }
    return fetch(url, options).then((res) => res.json());
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

const ProductionSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    createdData: [],
    deletedData: [],
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
    [getProductions.pending]: (state, action) => {
      state.loading = true;
    },
    [getProductions.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = [action.payload];
    },
    [getProductions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteProduction.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduction.fulfilled]: (state, action) => {
      state.loading = false;
      state.deletedData = [action.payload];
    },
    [deleteProduction.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createProduction.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduction.fulfilled]: (state, action) => {
      state.loading = false;
      state.createdData = [action.payload];
    },
    [createProduction.rejected]: (state, action) => {
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
export const { setEdit } = ProductionSlice.actions;
export default ProductionSlice.reducer;
