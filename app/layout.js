import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import NextAuthProvider from "@/context/next-auth-providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RailTel Dot Access",
  description: "RailTel Dot Access  management app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <main className="w-full h-screen text-slate-900">{children}</main>
          <ToastContainer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
