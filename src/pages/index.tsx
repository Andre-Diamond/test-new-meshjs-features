import Head from "next/head";
import { MeshBadge } from "@meshsdk/react";
import Nav from "../components/Nav";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered by Mesh" />
      </Head>
      <main>
        <h1>
          <a href="https://meshjs.dev/">Mesh</a> Next.js
        </h1>
        <p>Welcome to the Home page!</p>
      </main>
      <footer>
        <MeshBadge isDark={true} />
      </footer>
    </div>
  );
}
