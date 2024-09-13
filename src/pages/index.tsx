import Head from "next/head";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mesh App on Cardano</title>
        <meta name="description" content="A Cardano dApp powered my Mesh" />
      </Head>
      <main>
        <h1>
          <a href="https://meshjs.dev/" className="text-sky-600">
            Mesh
          </a>{" "}
          Next.js
        </h1>

        <div className="mb-20">
          <CardanoWallet />
        </div>
      </main>
      <footer>
        <MeshBadge isDark={true} />
      </footer>
    </div>
  );
}