"use client";
import { useAppDispatch, useAppSelector } from "@/components/lib/redux/hooks";
import { GetNoteById } from "@/components/lib/redux/Note/actions/GetNoteById.action";
import { UpdateNote } from "@/components/lib/redux/Note/actions/UpdateNote.action";
import INote from "@/components/lib/redux/Note/note.interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
export default function NotePage() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const noteId = Number(params.id);

  const note: INote | undefined = useAppSelector(
    (state) => state.noteReducer.note[noteId],
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      await dispatch(GetNoteById({ noteId }));
    };

    if (noteId) {
      fetchNote();
    }
  }, [dispatch, noteId]);

  useEffect(() => {
    if (note && !title && !content) {
      setTitle(note.title || "");
      setContent(note.content || "");
    }
  }, [note]);

  const handleSave = async () => {
    if (!note) return;

    try {
      await dispatch(
        UpdateNote({
          noteId,
          title,
          content,
        }),
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <>
      <div
        className={`flex mx-3 lg:mx-10 mt-2 lg:mt-4
       w-16 lg:w-15 2xl:w-25
        bg-amber-900 h-10 2xl:h-15 rounded-2xl`}
      >
        <button
          onClick={handleSave}
          className="px-4  py-1 2xl:w-25  bg-amber-700 text-white lg:text-xl rounded-2xl hover:bg-amber-800 transition "
        >
          save
        </button>
      </div>

      <div
        className={`mx-3 lg:mx-10 mt-2 lg:mt-4 text-4xl 2xl:text-6xl
           text-amber-800 border-amber-600 border-b-2 flex justify-between items-center`}
      >
        <h1
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => setTitle(e.currentTarget.textContent || "")}
          className="outline-none w-full bg-transparent cursor-text"
          dangerouslySetInnerHTML={{ __html: note.title || "" }}
        />
      </div>

      <div className="mx-3 lg:mx-10 mt-3 lg:mt-5 text-lg 2xl:text-3xl text-amber-900 ">
        <p
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => setContent(e.currentTarget.textContent || "")}
          className="outline-none w-full bg-transparent whitespace-pre-wrap cursor-text min-h-50 2xl:leading-11"
          dangerouslySetInnerHTML={{ __html: note.content || "" }}
        />
      </div>
    </>
  );
}
