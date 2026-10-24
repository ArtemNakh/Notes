import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import INote from "./note.interface";
import { CreateNote } from "./actions/CreateNote.action";
import { GetNotes } from "./actions/GetNotes.action";
import { DeleteNote } from "./actions/DeleteNote.action";
import { GetNoteById } from "./actions/GetNoteById.action";
import { UpdateNote } from "./actions/UpdateNote.action";

interface NoteState {
  note: Record<number, INote>;
}

const initialState: NoteState = {
  note: {},
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<INote[]>) => {
      state.note = {};
      if (Array.isArray(action.payload)) {
        action.payload.forEach((item) => {
          if (item && item.id) {
            state.note[item.id] = item;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder;
    builder
      .addCase(CreateNote.fulfilled, (state, action: PayloadAction<INote>) => {
        const newNote = action.payload;
        if (newNote && newNote.id) {
          state.note[newNote.id] = newNote;
        }
      })
      .addCase(GetNotes.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          action.payload.forEach((fetchedNote) => {
            if (fetchedNote && fetchedNote.id) {
              state.note[fetchedNote.id] = fetchedNote;
            }
          });
        }
      })
      .addCase(GetNoteById.fulfilled, (state, action: PayloadAction<INote>) => {
        const fetchedNote = action.payload;
        if (fetchedNote && fetchedNote.id) {
          state.note[fetchedNote.id] = fetchedNote;
        }
      })
      .addCase(UpdateNote.fulfilled, (state, action: PayloadAction<INote>) => {
        const updatedNote = action.payload;
        if (updatedNote && updatedNote.id) {
          state.note[updatedNote.id] = updatedNote;
        }
      })
      .addCase(DeleteNote.fulfilled, (state, action) => {
        const deletedId = action.meta.arg?.id ?? action.payload;
        if (deletedId !== undefined && deletedId !== null) {
          delete state.note[deletedId];
        }
      });
  },
});

export const { getAll } = noteSlice.actions;
export default noteSlice.reducer;
