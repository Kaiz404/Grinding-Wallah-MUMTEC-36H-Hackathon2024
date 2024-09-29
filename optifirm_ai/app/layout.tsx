import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NavBar from "@/components/Navbar";
import ContextProvider from "@/components/ContextProvider";
import { headers } from "next/headers"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="bg-blob bg-cover">
        <ContextProvider cookies={cookies}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="h-screen">
              <div className="w-full h-[10%]flex">
                <NavBar />
              </div>
              <div className="w-full h-[90%]">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
