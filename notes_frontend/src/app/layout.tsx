import "./globals.css";
import AppToaster from "@/components/ui/AppToaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <body>
          {children}
          <AppToaster />
        </body>
      </html>
    </>
  );
}
