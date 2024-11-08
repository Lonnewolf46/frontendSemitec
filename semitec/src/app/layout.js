import "./globals.css";
import { Atkinson_Hyperlegible } from "next/font/google";
import { Footer } from "./components/footer";
import styles from "./MainLayout.module.css";
import { ThemeProvider } from "next-themes";

const atkinson_Hyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "SEMITEC",
  description:
    "Mecanografía accesible dirigida a usuarios con discapacidad visual",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={atkinson_Hyperlegible.className}>
        <div className={styles.MainLayout}>
          <ThemeProvider defaultTheme="light" enableColorScheme>
            {children}
          </ThemeProvider>
          {<Footer />}
        </div>
      </body>
    </html>
  );
}
