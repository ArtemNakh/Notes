export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-amber-100 w-full min-h-screen">{children} 
      </div>
    </>
  );
}
