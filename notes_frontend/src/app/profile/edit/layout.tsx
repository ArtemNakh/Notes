import IsAuthorized from "@/components/lib/IsAuthorized";
export default async function LayoutProfileEdit({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await IsAuthorized();

  return (
    <>
      <div className="w-full min-h-screen bg-amber-100  ">{children}</div>
    </>
  );
}
