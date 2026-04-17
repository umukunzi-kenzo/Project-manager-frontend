import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { Toaster } from "react-hot-toast";
import FloatingThemeToggle from "../components/FloatingThemeToggle";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Collabi - Collaborate Smarter",
  description: "Team collaboration and project management made simple",
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
                  const saved = localStorage.getItem("theme");
                  const isDark = saved === "dark";
                  if (isDark) {
                    document.documentElement.classList.add("dark");
                    document.body.classList.add("dark-mode");
                  } else {
                    document.documentElement.classList.remove("dark");
                    document.body.classList.add("light-mode");
                  }
                } catch (e) {
                  document.body.classList.add("light-mode");
                }
              })();
            `,
          }}
        />
        <script src="https://accounts.google.com/gsi/client" async defer />
      </head>
      <body className="h-full m-0 p-0" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <FloatingThemeToggle />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#ffffff",
                color: "#1a1c23",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                fontWeight: "500",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              },
              success: {
                style: {
                  background: "#10b981",
                  color: "#ffffff",
                  border: "none",
                },
                iconTheme: {
                  primary: "#ffffff",
                  secondary: "#065f46",
                },
              },
              error: {
                style: {
                  background: "#ef4444",
                  color: "#ffffff",
                  border: "none",
                },
                iconTheme: {
                  primary: "#ffffff",
                  secondary: "#991b1b",
                },
              },
              loading: {
                style: {
                  background: "#ffffff",
                  color: "#1a1c23",
                  border: "1px solid #e5e7eb",
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}