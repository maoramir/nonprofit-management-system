import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { RegistrationProvider } from "@/contexts/registration-context";

export const metadata: Metadata = {
  title: "איסוף פרטים לרישום עמותה",
  description: "אשף דיגיטלי לאיסוף פרטים ראשוניים לרישום עמותה"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <RegistrationProvider>{children}</RegistrationProvider>
      </body>
    </html>
  );
}
