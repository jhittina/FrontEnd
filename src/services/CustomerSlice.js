import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCustomers = createAsyncThunk(
  "getCustomers",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { token, params } = arg;
    var url = `${process.env.REACT_APP_BACKEND_URL}/customerDetails`;
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

export const deleteCustomer = createAsyncThunk(
  "deleteCustomer",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { token, id } = arg;
    var url = `${process.env.REACT_APP_BACKEND_URL}/customerDetail/?id=${id}`;
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
export const createCustomer = createAsyncThunk(
  "createCustomer",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { body, token } = arg;
    var url;
    if (body.hasOwnProperty("_id")) {
      url = `${process.env.REACT_APP_BACKEND_URL}/customerDetail/?id=${body?._id}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/customerDetail`;
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
export const customerAddressCred = createAsyncThunk(
  "customerAddressCred",
  async ({ arg }, { rejectWithValue, fulfillWithValue }) => {
    const { body, token } = arg;

    var url = `${process.env.REACT_APP_BACKEND_URL}/customerAddressDetail/?id=${body?.id}&action=${body?.action}`;

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

const CustomerSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    createdData: undefined,
    deletedData: undefined,
    updateData: undefined,
    addressCredData: undefined,
    loading: false,
    error: null,
    createError: undefined,
    deleteError: undefined,
    updateError: undefined,
    addressCredError: undefined,
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
    [getCustomers.pending]: (state, action) => {
      state.loading = true;
    },
    [getCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = [action.payload];
    },
    [getCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteCustomer.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      state.loading = false;
      state.deletedData = [action.payload];
    },
    [deleteCustomer.rejected]: (state, action) => {
      state.loading = false;
      state.deleteError = action.payload;
    },
    [createCustomer.pending]: (state, action) => {
      state.loading = true;
    },
    [createCustomer.fulfilled]: (state, action) => {
      state.createdData = [action.payload];
      state.loading = false;
    },
    [createCustomer.rejected]: (state, action) => {
      console.log(action, "rejected");
      state.loading = false;
      state.createError = action.payload;
    },
    [customerAddressCred.pending]: (state, action) => {
      state.loading = true;
    },
    [customerAddressCred.fulfilled]: (state, action) => {
      state.addressCredData = [action.payload];
      state.loading = false;
    },
    [customerAddressCred.rejected]: (state, action) => {
      state.loading = false;
      state.addressCredError = action.payload;
    },
  },
});
export const { setEdit } = CustomerSlice.actions;
export default CustomerSlice.reducer;
