"use client";
import { useAppDispatch, useAppSelector } from "@/components/lib/redux/hooks";
import { GetNotes } from "@/components/lib/redux/Note/actions/GetNotes.action";
import NotePanel from "@/components/ui/components/NotePanel";
import { useEffect, useRef, useState } from "react";

export default function MainPage() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.noteReducer.note);

  const [skip, setSkip] = useState(0);
  const take = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Ref для останнього елемента
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastNoteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(GetNotes({ take, skip: 0 }));
  }, [dispatch]);
  
  // Функція для підвантаження наступної порції
  const loadMoreNotes = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const nextSkip = skip + take;

    try {
      // Викликаємо санку і розгортаємо її результат через .unwrap()
      const newNotes = await dispatch(
        GetNotes({ take, skip: nextSkip }),
      ).unwrap();

      // Якщо бекенд повернув порожній масив, значить нотатки закінчилися
      if (!newNotes || newNotes.length === 0) {
        setHasMore(false);
      } else {
        setSkip(nextSkip);
      }
    } catch (error) {
      console.error("Помилка завантаження нотаток:", error);setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Налаштування Intersection Observer
  useEffect(() => {
    if (isLoading || !hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      // Якщо останній елемент з'явився на екрані
      if (entries[0].isIntersecting) {
        loadMoreNotes();
      }
    });

    if (lastNoteRef.current) {
      observerRef.current.observe(lastNoteRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isLoading, hasMore, skip, notes]);

  return (
    <div className="ml-2 mr-2  w-auto  min-h-screen ">
      <div
        className={`pt-3 w-full h-full flex flex-wrap gap-2 items-center justify-center`}
      >
        {notes &&
          notes.map((note, index) => {
            const isLastOrNearEnd = index === notes.length - 4;
            return (
              <div
                key={index}
                className=" mx-2"
                ref={isLastOrNearEnd ? lastNoteRef : null}
              >
                <NotePanel note={note} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
