import type { Metadata } from "next";
import { Inter, Space_Grotesk} from "next/font/google";
import "./globals.css";
import Providers from './providers';

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300','400','500','600']
})

export const metadata: Metadata = {
  title: "SteamScrapper - Home",
  description: "_desk_",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
