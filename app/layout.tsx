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
          <footer className="relative border-t border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-zinc-900/40 to-zinc-950 py-8 text-center">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
            <p className="text-xs text-zinc-500">
              © Ворончихин Евгений — каталог AI-инструментов и OSS
            </p>
          </footer>
        </LocaleProvider>
        <YandexMetrika />
      </body>
    </html>
  );
}
