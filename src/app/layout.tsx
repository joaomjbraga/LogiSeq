import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LogiSeq",
  description: "LogiSeq",
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="bg-zinc-900">
  
        {children}
  
      </body>
    </html>
  );
}
