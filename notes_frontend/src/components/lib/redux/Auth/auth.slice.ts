// store/features/auth/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../User/user.interface";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/Auth/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      // Те, що ми тут повертаємо, стане payload у стані fulfilled
      return response.json();
    } catch (error: any) {
      // Якщо сталася помилка, можна повернути її через rejectWithValue
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка авторизації",
      );
    }
  },
);

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder;
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload; // Зберігаємо користувача в Redux після успішного запиту
      },
    );
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
