import { BoardProvider } from "@/src/context/BoardContext";
import "./globals.css";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return(
    <html lang="en">
      <body>
        <BoardProvider>
          {children}
        </BoardProvider>
      </body>
    </html>
  )
}