interface RotationPlusProps {
  onToggle?: () => void; // Функція, яку ми очікуємо від батьківського компонента
}

export default function RotationPlus({ onToggle }: RotationPlusProps) {
  return (
    <>
      <svg
        className={`w-12 h-12 text-amber-500 transition-transform duration-500 hover:rotate-90 cursor-pointer
              active:text-amber-600`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        onClick={() => {
          if (onToggle) onToggle();
        }}
      >
        <path d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z" />
      </svg>
    </>
  );
}
