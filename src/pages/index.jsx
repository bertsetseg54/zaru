import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "../components/Nav";
import LandingPage from "../components/LandingPage";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Landing Page Content */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <LandingPage />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 w-full flex flex-col sm:flex-row justify-center items-center text-center sm:text-left text-sm sm:text-base md:text-lg px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-800">
        <p>© 2025 Хөгжлийг бүтээгч. All rights reserved.</p>
        <div className="flex gap-4 mt-2 sm:mt-0"></div>
      </footer>
    </div>
  );
}
