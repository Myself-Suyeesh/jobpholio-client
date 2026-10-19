import { Merriweather, Cabin } from "next/font/google";

export const cabin = Cabin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--landing-font-sans",
  display: "swap",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: "300",
  style: ["normal", "italic"],
  variable: "--landing-font-serif",
  display: "swap",
});
