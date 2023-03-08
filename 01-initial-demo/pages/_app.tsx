import "../styles/globals.css";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Para poder ejecutar los "getLayout" que hagamos de forma anidada o lo que sea
  // se necesita ejecutar aca, y ver si esa funcion existe, en ese caso, la ejecuta

  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
  // return <Component {...pageProps} />;
}
