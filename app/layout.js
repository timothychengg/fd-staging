import "./globals.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata = {
  title: "F&D Staging – Luxury Home Staging & Styling",
  description:
    "Luxury home staging studio in Los Angeles creating aspirational interiors that sell.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-luxbg text-luxtxt antialiased">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
