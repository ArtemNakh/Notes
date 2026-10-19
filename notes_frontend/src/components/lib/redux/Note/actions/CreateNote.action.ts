import BaseFetch, { HttpMethod } from "@/components/lib/BaseFetch";
import { createAsyncThunk } from "@reduxjs/toolkit";

export interface ICreateNote {
  title: string;
}

export const CreateNote = createAsyncThunk(
  "note/create",
  async (values: ICreateNote) => {
    return await BaseFetch({
      endPoint: "/notes/v1/save",
      values: values,
      method: HttpMethod.POST,
    });
  },
);
