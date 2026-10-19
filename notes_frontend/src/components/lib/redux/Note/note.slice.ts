import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import INote from "./note.interface";
import { CreateNote } from "./actions/CreateNote.action";
import { GetNotes } from "./actions/GetNotes.action";
import { DeleteNote } from "./actions/DeleteNote.action";

interface NoteState {
  note: INote[];
}
const initialState: NoteState = {
  note: [],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<INote[]>) => {
      state.note = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
    builder
      .addCase(CreateNote.fulfilled, (state, action: PayloadAction<INote>) => {
        // Якщо стан вже містить масив, додаємо туди нову нотатку
        if (state.note) {
          state.note.push(action.payload); // або [action.payload, ...state.note], якщо на початок
        } else {
          state.note = [action.payload]; // Якщо масиву ще не було, створюємо його з однією нотаткою
        }
      })
      .addCase(GetNotes.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          // Об'єднуємо старі та нові нотатки, залишаючи тільки унікальні за id
          const existingIds = new Set(state.note.map((item) => item.id));
          const uniqueNewNotes = action.payload.filter(
            (item) => !existingIds.has(item.id),
          );

          state.note = [...state.note, ...uniqueNewNotes];
        }
      })
      .addCase(DeleteNote.fulfilled, (state, action) => {
        const deletedId = action.meta.arg.id;
        state.note = state.note.filter((item) => item.id !== deletedId);
      });
  },
});

export const { getAll } = noteSlice.actions;
export default noteSlice.reducer;
