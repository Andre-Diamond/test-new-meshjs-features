// ../pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { MeshProvider } from "@meshsdk/react";
import Nav from "../components/Nav";

function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Nav />
      <Component {...pageProps} />
    </MeshProvider>
  );
}

export default App;