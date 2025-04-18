import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google'
import { SessionWrapper } from "@/utils/session-provider";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/common/progressBarProvider/progressBarProvider";

const nunito = Nunito({ subsets: ['latin'], weight: ['300', '400', '600', '700'] })




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${nunito.className} antialiased`}
      >
        <SessionWrapper>
          <Providers>{children}</Providers>
        </SessionWrapper>
        <Toaster />
      </body>
    </html>
  );
}
