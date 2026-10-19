import BaseFetch, { HttpMethod } from "@/components/lib/BaseFetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface IDeleteNote {
  id: number;
}
export const DeleteNote = createAsyncThunk(
  "note/delete",
  async (values: IDeleteNote) => {
    return await BaseFetch({
      endPoint: `/notes/v1/remove/${values.id}`,
      method: HttpMethod.DELETE,
      notification: { error: "Error during removing",success:"Note deleted" },
    });
  },
);
