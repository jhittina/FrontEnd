import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProductions = createAsyncThunk(
  "getProductions",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { token, params } = arg;
    var url = `${process.env.REACT_APP_BACKEND_URL}/productions`;
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        token: token,
      },
    };
    try {
      const response = await fetch(
        url + "?" + new URLSearchParams(params),
        options
      );
      if (response.ok === false) {
        return rejectWithValue(response.statusText);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const deleteProduction = createAsyncThunk(
  "deleteProduction",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { token, id } = arg;
    var url = `${process.env.REACT_APP_BACKEND_URL}/production/?id=${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        token: token,
      },
    };
    try {
      const response = await fetch(url, options);
      if (response.ok === false) {
        return rejectWithValue(response.statusText);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
export const createProduction = createAsyncThunk(
  "createProduction",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { body, token } = arg;
    var url;
    if (body.hasOwnProperty("_id")) {
      url = `${process.env.REACT_APP_BACKEND_URL}/production/?id=${body?._id}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/production`;
    }
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        token: token,
      },
      body: JSON.stringify(body),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok === false) {
        return rejectWithValue(response.statusText);
      }
      const data = await response.json();
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
export const clearErrorState = createAsyncThunk(
  "clearErrorState",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    return fulfillWithValue();
  }
);

const ProductionSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    createdData: undefined,
    deletedData: undefined,
    updateData: undefined,
    loading: false,
    error: null,
    createError: undefined,
    deleteError: undefined,
    updateError: undefined,
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
    [clearErrorState.fulfilled]: (state, action) => {
      state.createError = undefined;
      state.deleteError = undefined;
      state.updateError = undefined;
    },
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
      state.deleteError = action.payload;
    },
    [createProduction.pending]: (state, action) => {
      state.loading = true;
    },
    [createProduction.fulfilled]: (state, action) => {
      state.createdData = [action.payload];
      state.loading = false;
    },
    [createProduction.rejected]: (state, action) => {
      console.log(action, "rejected");
      state.loading = false;
      state.createError = action.payload;
    },
  },
});
export const { setEdit } = ProductionSlice.actions;
export default ProductionSlice.reducer;
