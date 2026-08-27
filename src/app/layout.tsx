import type { Metadata, Viewport } from "next";
import { Poppins, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "ATOM — الروابط الرسمية",
  description: "ATOM — أفضل بوكس أندرويد 4K في الجزائر. تصفح منتجاتنا وتواصل معنا.",
  icons: { icon: "/favicon.ico" },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "theme-color": "#05070f",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${poppins.variable} ${notoArabic.variable} h-full antialiased`}>
      <head>
        <meta name="theme-color" content="#05070f" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
