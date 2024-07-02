import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navigation from "./_components/common/navigation";
import { ConfigProvider } from "antd";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./_providers/react-query";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEA Salon",
  description: "SEA Compfest project selection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        <ReactQueryProvider>
          <AntdRegistry>
            <ConfigProvider theme={{ token: { colorPrimary: "#7678ED" } }}>
              <SessionProvider>
                <Navigation />
                {children}
              </SessionProvider>
            </ConfigProvider>
          </AntdRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
