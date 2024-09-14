// ../pages/_app.tsx
import "@/styles/globals.css";
import "@meshsdk/react/styles.css";
import type { AppProps } from "next/app";
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