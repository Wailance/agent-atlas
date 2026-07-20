import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { YandexMetrika } from "@/components/YandexMetrika";
import { LocaleProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ворончихин Евгений — каталог AI-инструментов",
  description:
    "Кураторский каталог open-source проектов: AI-агенты, RAG, MCP, scraping и бизнес-софт на GitHub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <LocaleProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-zinc-800/80 py-6 text-center text-xs text-zinc-600 bg-zinc-950/50">
            © Ворончихин Евгений — каталог AI-инструментов и OSS
          </footer>
        </LocaleProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
