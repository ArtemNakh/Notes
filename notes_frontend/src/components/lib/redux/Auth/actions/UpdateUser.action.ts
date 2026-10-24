import BaseFetch, { HttpMethod } from "@/components/lib/BaseFetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IUpdateUser {
  userId: number;
  name?: string;
  surname?: string;
}
export const UpdateUser = createAsyncThunk(
  "auth/update-user",
  async ({  name, surname }: IUpdateUser) => {
    return await BaseFetch({
      endPoint: `/users/v1/update`,
      method: HttpMethod.PATCH,
      values: { name, surname },
      notification: {
        success: "User updated",
        error: "Error updated user",
      },
    });
  },
);
