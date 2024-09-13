import Head from "next/head";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Testing new Meshjs features</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
      </Head>
      <main>
        <h1>
          <a href="https://meshjs.dev/">
            Mesh
          </a>{" "}
          Next.js
        </h1>

        <div>
          <CardanoWallet />
        </div>

      </main>
      <footer>
        <MeshBadge isDark={true} />
      </footer>
    </div>
  );
}