import { createAsyncThunk } from "@reduxjs/toolkit";

export const FetchSession = createAsyncThunk(
  "auth/fetchSession",
  async (_, thunkAPI) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/auth/v1/session`, {
        method: "GET",
        credentials: "include", // Обов'язково передає куки браузера
      });

      if (!response.ok) throw new Error("Не авторизовано");

      const data = await response.json();
      return data.user || data; // Повертаємо користувача
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Сесія недійсна");
    }
  },
);
