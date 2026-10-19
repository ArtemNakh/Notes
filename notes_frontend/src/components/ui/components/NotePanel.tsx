"use client";
import { useAppDispatch } from "@/components/lib/redux/hooks";
import { DeleteNote } from "@/components/lib/redux/Note/actions/DeleteNote.action";
import INote from "@/components/lib/redux/Note/note.interface";

interface NotePanelProps {
  note: INote;
}

export default function NotePanel({ note }: NotePanelProps) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className="w-76 h-33 bg-amber border border-amber-500 rounded-2xl bg-amber-150 text-amber-800"
        onClick={() => {
          console.log("redirect on dinamy page to edit note ");
        }}
      >
        <label className=" ml-2 mt-2 text-2xl border-b border-amber-400 ">
          {note.title}
        </label>
        <p className="ml-2 mt-2 text-base line-clamp-2 text-amber-700">
          {note.content}
        </p>
        <div className="mt-1 flex items-center justify-between w-full h-10 ">
          <div></div>
          <svg
            onClick={async (e) => {
              e.stopPropagation();
              await dispatch(DeleteNote({ id: note.id }));
              console.log(`deleted current ${note.id} note`);
            }}
            className=" w-7 h-7 mr-3 text-amber-700"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
