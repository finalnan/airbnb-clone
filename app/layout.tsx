import { Nunito } from "next/font/google";
import ClientOnly from "./components/ClientOnly";

import Navbar from "./components/navbar/Navbar";

import "./globals.css";
import SignupModal from "./components/modals/SignupModal";
import SigninModal from "./components/modals/SigninModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

export const metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <SigninModal />
          <SignupModal />
          <RentModal />

          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

export const dynamic = "force-dynamic";
