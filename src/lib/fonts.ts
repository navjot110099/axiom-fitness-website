import { Archivo, Inter, JetBrains_Mono } from "next/font/google";

/** Display — condensed-capable grotesk for large editorial headings. */
export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

/** Body — highly legible neo-grotesque. */
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/** Mono — used for data, tickers, eyebrows. */
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
