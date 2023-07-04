import "@/styles/globals.css";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import type { AppContext, AppProps } from "next/app";
import { useEffect, useState } from "react";
import { customTheme, darkTheme, lightTheme } from "../themes";

interface Props extends AppProps {
  theme: string;
}

export default function MyApp({ Component, pageProps, theme }: Props) {
  console.log({ theme });
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  useEffect(() => {
    const cookieTheme = Cookies.get("theme") || "light";
    const selectedTheme: Theme =
      cookieTheme === "light"
        ? lightTheme
        : cookieTheme === "dark"
        ? darkTheme
        : customTheme;

    setCurrentTheme(selectedTheme);
  }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Esto no hay que usarlo en lo posible, ya que deshabilita la forma 
// de generacion de paginas estaticas, hace q todo se renderice en cada
// solicitud en runtime, OJO
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // const cookies = appContext.ctx.req
//   //   ? (appContext.ctx.req as any).cookies
//   //   : { theme: "light" };
//   const { theme = "light" } = (appContext.ctx.req as any).cookies;

//   const validThemes = ["light", "dark", "custom"];

//   return {
//     theme: validThemes.includes(theme) ? theme : "dark",
//   };
// };

// Esto tampoco sirve aca para obtener las cookies en un componente del cliente,
// solo en las pages comunes

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { theme = "light" } = ctx.req.cookies; //asi de facil obtengo las cookies

//   const validThemes = ["light", "dark", "custom"];

//   return {
//     props: {
//       theme: validThemes.includes(theme) ? theme : "dark",
//     },
//   };
// };
