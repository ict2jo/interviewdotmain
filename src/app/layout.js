import "./_style/globals.css";
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './_components/defaultTheme.js';

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
