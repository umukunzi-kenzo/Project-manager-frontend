import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { Toaster } from "react-hot-toast";
import FloatingThemeToggle from "../components/FloatingThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Project Manager",
  description: "Manage your projects efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem("theme");
                  const isDark = savedTheme === "dark" || savedTheme === null;
                  if (isDark) {
                    document.documentElement.classList.add("dark");
                    document.body.classList.add("dark-mode");
                  } else {
                    document.documentElement.classList.add("light");
                    document.body.classList.add("light-mode");
                  }
                } catch (e) {
                  document.documentElement.classList.add("dark");
                  document.body.classList.add("dark-mode");
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <FloatingThemeToggle />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#10b981',
                },
              },
              error: {
                style: {
                  background: '#ef4444',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}