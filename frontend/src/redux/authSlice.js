import { createSlice } from '@reduxjs/toolkit';
import { userLogin, userRegister } from './authActions';

const initialState = {
  loading: false,
  token: null, // Do not persist this directly in Redux or localStorage
  isLogged: false, // Updated based on login state
  role: null, // Role will persist if needed
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.token = null;
      state.role = null; // Clear role on logout
      state.isLogged = false;
      state.error = null;
      state.success = false;
    },
    setCredentials: (state, { payload }) => {
      state.token = payload.token;
      state.role = payload.role; // Assume role is sent from backend
      state.isLogged = true;
      state.success = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload.token;
        state.role = payload.role; // Set role based on server response
        state.isLogged = true;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Signup cases
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        // Optionally handle role or other user details
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;



// import { createSlice } from '@reduxjs/toolkit';
// import { userLogin, userRegister } from './authActions';
// import { REHYDRATE } from 'redux-persist';

// const initialState = {
//   loading: false,
//   token: null,
//   isLogged: false,
//   role: null,
//   error: null,
//   success: false,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       Object.assign(state, initialState);
//     },
//     setCredentials: (state, { payload }) => {
//       state.token = payload.token;
//       state.role = payload.role;
//       state.isLogged = true;
//       state.success = true;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(REHYDRATE, (state, action) => {
//         if (action.payload?.auth) {
//           return {
//             ...state,
//             ...action.payload.auth,
//             loading: false,
//             error: null
//           };
//         }
//       })
//       .addCase(userLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(userLogin.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.token = payload.token;
//         state.role = payload.role;
//         state.isLogged = true;
//         state.success = true;
//         state.error = null;
//       })
//       .addCase(userLogin.rejected, (state, { payload }) => {
//         state.loading = false;
//         state.error = payload;
//         state.success = false;
//         state.isLogged = false;
//         state.token = null;
//         state.role = null;
//       });
//   },
// });

// export const { logout, setCredentials } = authSlice.actions;
// export default authSlice.reducer;
