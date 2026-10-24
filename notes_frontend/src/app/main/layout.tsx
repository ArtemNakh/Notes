import IsAuthorized from "@/components/lib/IsAuthorized";
import Header from "@/components/ui/header/Header";

export default async function layoutMain({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await IsAuthorized();

  return (
    <>
      <div className="w-full min-h-screen bg-amber-100  ">
        <Header />

        {children}
      </div>
    </>
  );
}
