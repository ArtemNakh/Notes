import BaseFetch, { HttpMethod } from "@/components/lib/BaseFetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IGetNoteById {
  noteId: number;
}
export const GetNoteById = createAsyncThunk(
  "note/getById",
  async ({ noteId }: IGetNoteById) => {
    return await BaseFetch({
      endPoint: `/notes/v1/get/${noteId}`,
      method: HttpMethod.GET,
      notification: {
        success: "Note received",
        error: "Error retrieving note",
      },
    });
  },
);
