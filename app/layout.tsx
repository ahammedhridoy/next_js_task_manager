import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { ClerkProvider, auth } from "@clerk/nextjs";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "@clerk/nextjs/server";

const inter = Inter({ subsets: ["latin"] });
//@ts-ignore
let userId = async (req: Request) => getAuth(req);

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="container">
            <div className={userId ? "flex gap-5" : ""}>
              {userId ? (
                <div className="basis-1/5 fixed top-3 left-40 w-[300px] hidden lg:block sidebar">
                  {userId && <Sidebar />}
                </div>
              ) : (
                ""
              )}
              <div
                className={
                  userId
                    ? "lg:basis-4/5 basis-full lg:ml-[300px] m-2 mt-4 main-sec"
                    : "basis-full main-sec"
                }
              >
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
