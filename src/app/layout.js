import AuthContext from "./context/AuthContext";
import TosterContext from "./context/TosterContext";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "REAL_TIME_CHAT",
  description: "A Real Time Chat App Like Facebook Messanger",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <TosterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
