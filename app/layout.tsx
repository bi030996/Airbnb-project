

import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modal/RegisterModal";
import ToasterProvider from "./provider/ToasterProvider";
import LoginModal from "./components/Modal/LoginModal";
import getCurrentUser from "./action/getCurrentUser";
import RentModal from "./components/Modal/RentModal";
import SearchModal from "./components/Modal/SearchModal";

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb project",
};

const font = Nunito({ 
  subsets: ["latin"] 
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <LoginModal />
          <RentModal />
          <RegisterModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
