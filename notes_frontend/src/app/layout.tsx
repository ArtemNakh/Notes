import "./globals.css";
import AppToaster from "@/components/ui/AppToaster";
import "../../config/i18next.config";
import { I18nProvider } from "@/components/ui/i18next/i18n.provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <body>
          <I18nProvider>
            {children}
            <AppToaster />
          </I18nProvider>
        </body>
      </html>
    </>
  );
}
