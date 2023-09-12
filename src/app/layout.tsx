import CalculatorProvider from "@/context/calculator/CalculatorProvider";
import { Theme, ThemePanel } from "@radix-ui/themes";

import "./globals.css";
import "@radix-ui/themes/styles.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "How much should automation save you?",
  description:
    "This calculator will help you estimate how much time and money you can save by automating a task.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark" accentColor="violet" suppressHydrationWarning>
          <CalculatorProvider>{children}</CalculatorProvider>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  );
}
