// @ts-nocheck
import { SessionProvider } from "next-auth/react";
import { CartProvider, UiProvider, AuthProvider } from "@/context";
import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { lightTheme } from "../themes";

export default function App({ Component, pageProps, session }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <UiProvider>
            <CartProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </ThemeProvider>
            </CartProvider>
          </UiProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
