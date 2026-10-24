import BaseFetch, { HttpMethod } from "@/components/lib/BaseFetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IUpdateNote {
  noteId: number;
  title?: string;
  content?: string;
}
export const UpdateNote = createAsyncThunk(
  "note/update-note",
  async ({ noteId, title, content }: IUpdateNote) => {
    return await BaseFetch({
      endPoint: `/notes/v1/update/${noteId}`,
      method: HttpMethod.PATCH,
      values: { title, content },
      notification: {
        success: "Note received",
        error: "Error retrieving note",
      },
    });
  },
);
