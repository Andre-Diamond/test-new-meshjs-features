import Head from "next/head";
import { MeshBadge } from "@meshsdk/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Mesh App on Cardano - Dark Mode</title>
        <meta name="description" content="A Cardano dApp powered by Mesh with dark mode" />
      </Head>
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.title}>
            <a href="https://meshjs.dev/" target="_blank" rel="noopener noreferrer">
              Mesh
            </a>{" "}
            Next.js
          </h1>
          <p className={styles.description}>
            Welcome to your Cardano dApp with dark mode enabled!
          </p>
          <div className={styles.badge}>
            <MeshBadge />
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Powered by Mesh SDK</p>
      </footer>
    </div>
  );
}
