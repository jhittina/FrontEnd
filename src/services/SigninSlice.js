// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// const env = require('dotenv');
// env.config();

// // It is used to define our endpoints and allow to create the API slice
// export const signinApi = createApi({
//     // The unique key that defines where the Redux store will store our cache.
//     reducerPath: 'signinApi',

//     // The base query to request data.
//     // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
//     }),

//     // The set of operations that we want to perform against the server.
//     endpoints: (builder) => ({
//         // getAllPost: builder.query({
//         //     query: () => ({
//         //         url: 'datas',
//         //         method: 'GET'
//         //     })
//         // }),
//         // getPostById: builder.query({
//         //     query: (id) => {
//         //         console.log("ID:", id)
//         //         return {
//         //             url: `datas/${id}`,
//         //             method: 'GET'
//         //         }
//         //     }
//         // }),

//         // getPostByLimit: builder.query({
//         //     query: (num) => {
//         //         console.log("Limit Number:", num)
//         //         return {
//         //             url: `datas?_limit=${num}`,
//         //             method: 'GET'
//         //         }
//         //     }
//         // }),

//         // deletePost: builder.mutation({
//         //     query: (id) => {
//         //         console.log("Delete ID:", id)
//         //         return {
//         //             url: `datas/${id}`,
//         //             method: 'DELETE'
//         //         }
//         //     }
//         // }),

//         signPost: builder.mutation({
//             query: (newPost) => {
//                 console.log("Create Post: ", newPost)
//                 return {
//                     url: `admin/signin`,
//                     method: 'POST',
//                     body: newPost,
//                     headers: {
//                         'Content-type': 'application/json; charset=UTF-8',
//                     }
//                 }
//             }
//         }),

//         // updatePost: builder.mutation({
//         //     query: (updatePostData) => {
//         //         console.log("Update Post: ", updatePostData)
//         //         const { id, ...data } = updatePostData
//         //         console.log("Actual Update Post: ", data)
//         //         return {
//         //             url: `datas/${id}`,
//         //             method: 'PUT',
//         //             body: data,
//         //             headers: {
//         //                 'Content-type': 'application/json; charset=UTF-8',
//         //             }
//         //         }
//         //     }
//         // }),
//     }),

// })

// // Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
// export const { useSignPostMutation } = signinApi


// // import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// // const env = require('dotenv');
// // env.config();

// // // It is used to define our endpoints and allow to create the API slice
// // export const productionApi = createApi({
// //     // The unique key that defines where the Redux store will store our cache.
// //     reducerPath: 'productionApi',

// //     // The base query to request data.
// //     // RTK Query ships with fetchBaseQuery, which is a lightweight fetch wrapper that automatically handles request headers and response parsing in a manner similar to common libraries like axios.
// //     baseQuery: fetchBaseQuery({
// //         baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
// //     }),

// //     // The set of operations that we want to perform against the server.
// //     endpoints: (builder) => ({
// //         getAllProductions: builder.query({
// //             query: (token) => ({
// //                 url: '/productions',
// //                 method: 'GET',
// //                 headers: {
// //                     'Content-type': 'application/json; charset=UTF-8',
// //                     'token': token
// //                 }
// //             })
// //         }),
// //         // getPostById: builder.query({
// //         //     query: (id) => {
// //         //         console.log("ID:", id)
// //         //         return {
// //         //             url: `datas/${id}`,
// //         //             method: 'GET'
// //         //         }
// //         //     }
// //         // }),

// //         // getPostByLimit: builder.query({
// //         //     query: (num) => {
// //         //         console.log("Limit Number:", num)
// //         //         return {
// //         //             url: `datas?_limit=${num}`,
// //         //             method: 'GET'
// //         //         }
// //         //     }
// //         // }),

// //         // deletePost: builder.mutation({
// //         //     query: (id) => {
// //         //         console.log("Delete ID:", id)
// //         //         return {
// //         //             url: `datas/${id}`,
// //         //             method: 'DELETE'
// //         //         }
// //         //     }
// //         // }),

// //         productionPost: builder.mutation({
// //             query: (params) => {
// //                 const { body, token } = params
// //                 console.log(body);
// //                 return {
// //                     url: `/production`,
// //                     method: 'POST',
// //                     body: body,
// //                     headers: {
// //                         'Content-type': 'application/json; charset=UTF-8',
// //                         'token': token
// //                     }
// //                 }
// //             }
// //         }),
// //         productionUpdatePost: builder.mutation({
// //             query: (params) => {
// //                 const { body, token } = params
// //                 console.log(params);
// //                 return {
// //                     url: `/production/?id=${params?.body._id}`,
// //                     method: 'POST',
// //                     body: body,
// //                     headers: {
// //                         'Content-type': 'application/json; charset=UTF-8',
// //                         'token': token
// //                     }
// //                 }
// //             }
// //         }),

// //         // updatePost: builder.mutation({
// //         //     query: (updatePostData) => {
// //         //         console.log("Update Post: ", updatePostData)
// //         //         const { id, ...data } = updatePostData
// //         //         console.log("Actual Update Post: ", data)
// //         //         return {
// //         //             url: `datas/${id}`,
// //         //             method: 'PUT',
// //         //             body: data,
// //         //             headers: {
// //         //                 'Content-type': 'application/json; charset=UTF-8',
// //         //             }
// //         //         }
// //         //     }
// //         // }),
// //     }),

// // })

// // // Export hooks for usage in functional components, which are auto-generated based on the defined endpoints
// // export const { useProductionPostMutation, useProductionUpdatePostMutation, useGetAllProductionsQuery } = productionApi

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const getPost = createAsyncThunk(

//     async ({ token }) => {
//         console.log("Hello");
//         return fetch(`${process.env.REACT_APP_BACKEND_URL}/productions`, {
//             method: "GET",
//             headers: {
//                     'Content-type': 'application/json; charset=UTF-8',
//                     'token': token
//                 }
//         }).then((res) => console.log(res));
//     }
// );

// const productionService = createSlice({
//     name: "production",
//     initialState: {
//         data: [],
//         loading: false,
//         error: null,
//         body: "",
//         edit: false,
//     },
//     extraReducers: {
//         [getPost.pending]: (state, action) => {
//             state.loading = true;
//         },
//         [getPost.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.data = [action.payload];
//         },
//         [getPost.rejected]: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//     }
// })
// export default productionService.reducer;

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
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body:JSON.stringify(body)
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
