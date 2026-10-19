import type { Metadata } from "next";
import { LandingView } from "@/components/landing/LandingView";
import { cabin, merriweather } from "@/components/landing/fonts";
import "@/components/landing/landing.css";

export const metadata: Metadata = {
  title: "JobPholio — Keep your job search together",
  description:
    "Track every application, interview and follow-up in one clear workspace.",
};

export default function HomePage() {
  return (
    <div className={`landing-root ${cabin.variable} ${merriweather.variable}`}>
      <LandingView />
    </div>
  );
}
