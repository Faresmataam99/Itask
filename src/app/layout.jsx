import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"
import Sidebar from "@/components/Sidebar";
import StoreProvider from "@/lib/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <StoreProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<div className="flex gap-3">
        <Sidebar/>
        {children}
</div>
      </body>
    </html>
    </StoreProvider>
  );
}
