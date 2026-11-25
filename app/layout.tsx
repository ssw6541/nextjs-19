import type { Metadata } from "next";
import { Suspense } from "react";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import UserMenu from "@/components/UserMenu";
import Footer from "@/components/Footer";

const noto = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "church19 | 사람을 살리고, 키우고, 세우는 공동체",
  description: "church19 교회 공식 웹사이트 - 예배, 교육·훈련, 선교, 나눔터",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${noto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header
          userSlot={
            <Suspense fallback={<span className="w-24" />}>
              <UserMenu />
            </Suspense>
          }
        />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
