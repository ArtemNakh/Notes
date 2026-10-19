import "./globals.css";
import AppToaster from "@/components/ui/AppToaster";
import "../../config/i18next.config";
import { I18nProvider } from "@/components/ui/i18next/i18n.provider";
import { Provider } from "react-redux";
import { store } from "@/components/lib/redux/store";
import ReduxProvider from "@/components/ui/ReduxProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html>
        <body>
          <ReduxProvider>
            <I18nProvider>
              {children}
              <AppToaster />
            </I18nProvider>
          </ReduxProvider>
        </body>
      </html>
    </>
  );
}
