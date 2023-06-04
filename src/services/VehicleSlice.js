import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getVehicles = createAsyncThunk(
  "getVehicles",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { token, params } = arg;
    var url = `${process.env.REACT_APP_BACKEND_URL}/vehicalDetails`;
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
      console.log(data, "data");
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  "deleteVehicle",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { token, id } = arg;
    var url = `${process.env.REACT_APP_BACKEND_URL}/vehicalDetail/?id=${id}`;
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
export const createVehicle = createAsyncThunk(
  "createVehicle",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { body, token } = arg;
    console.log(body, "body");
    var url;
    if (body.hasOwnProperty("_id")) {
      url = `${process.env.REACT_APP_BACKEND_URL}/vehicalDetail/?id=${body?._id}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/vehicalDetail`;
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
      console.log(response);
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

const VehicleSlice = createSlice({
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
    [getVehicles.pending]: (state, action) => {
      state.loading = true;
    },
    [getVehicles.fulfilled]: (state, action) => {
      console.log(action, "action");
      state.loading = false;
      state.data = [action.payload];
    },
    [getVehicles.rejected]: (state, action) => {
      console.log(action, "action");
      state.loading = false;
      state.error = action.payload;
    },
    [deleteVehicle.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteVehicle.fulfilled]: (state, action) => {
      state.loading = false;
      state.deletedData = [action.payload];
    },
    [deleteVehicle.rejected]: (state, action) => {
      state.loading = false;
      state.deleteError = action.payload;
    },
    [createVehicle.pending]: (state, action) => {
      state.loading = true;
    },
    [createVehicle.fulfilled]: (state, action) => {
      state.createdData = [action.payload];
      state.loading = false;
    },
    [createVehicle.rejected]: (state, action) => {
      console.log(action, "rejected");
      state.loading = false;
      state.createError = action.payload;
    },
  },
});
export const { setEdit } = VehicleSlice.actions;
export default VehicleSlice.reducer;
