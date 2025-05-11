import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser',async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:8000/ems_adminlogin/adminlogin', { email, password });
    //   const navigate = useNavigate();
    //   navigate("/");
      console.log(res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    firstLogin: false,
    userId: null
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.firstLogin = false;
      state.userId = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.firstLogin) {
          state.firstLogin = true;
          state.userId = action.payload.userId;
        } else {
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
