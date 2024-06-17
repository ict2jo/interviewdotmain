import "./_style/globals.css";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './_components/defaultTheme.js';
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: {
    template: "%s/ 인터뷰닷",
    default: "인터뷰닷",
  },
  description: "practice interview with AI",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SessionProvider>
            {children}
            {/* <div className="flex-1 px-8 py-12 bg-gray-100">
        </div> 
          <main className="max-w-7xl mx-auto w-full"></main>
        */}
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
