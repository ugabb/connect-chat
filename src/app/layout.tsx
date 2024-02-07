import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToasterContext from "./context/ToasterProvider";
import AuthContext from "./context/AuthConetxt";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fintalk Chat",
  description: "A real time chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterContext />

        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
