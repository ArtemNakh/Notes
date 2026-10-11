import Image from "next/image";


interface WritingNoteProps {
  className?: string;
}

export function WritingNote({ className = "" }: WritingNoteProps) {
  return (
    <>
      <Image
        src="/assets/WritingNote.svg"
        alt="Animated illustration"
        fill
        className={`object-cover ${className} `}
        priority
      />
    </>
  );
}
