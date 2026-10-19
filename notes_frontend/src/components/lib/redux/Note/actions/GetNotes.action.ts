import BaseFetch, { HttpMethod } from "@/components/lib/BaseFetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IGetNotes {
  take: number;
  skip: number;
}
export const GetNotes = createAsyncThunk(
  "note/get-all",
  async ({ take, skip }: IGetNotes) => {
    return await BaseFetch({
      endPoint: `/note/v1/get?take=${take}&skip=${skip}`,
      method: HttpMethod.GET,
      notification: {
        success: "Notes received",
        error: "Error retrieving notes",
      },
    });
  },
);
