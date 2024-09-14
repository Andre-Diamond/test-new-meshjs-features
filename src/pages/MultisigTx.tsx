import { useState } from "react";
import Head from "next/head";
import { MeshTxBuilder, ForgeScript, Mint } from '@meshsdk/core';
import { useWallet } from '@meshsdk/react';
import { MeshBadge } from "@meshsdk/react";
import styles from "../styles/Multisig.module.css";

export default function MultisigTx() {
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const { connected, wallet } = useWallet();
  const txBuilder = new MeshTxBuilder

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const utxos = await wallet.getUtxos();
    const changeAddress = await wallet.getChangeAddress();

    const unsignedTx = await txBuilder
      .txOut(process.env.NEXT_PUBLIC_WALLET_2!, [{ unit: "lovelace", quantity: '2000000' }])
      .changeAddress(changeAddress)
      .selectUtxosFrom(utxos)
      .complete();

    //const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Submitted:", { token, amount, address }, txHash);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Multisig Transaction</title>
        <meta name="description" content="Multisig Transaction Page" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Multisig Transaction</h1>
        <p className={styles.description}>Enter transaction details below:</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <button type="submit" className={styles.submitButton}>
            Submit Transaction
          </button>
        </form>
      </main>

      <footer className={styles.footer}>
        <MeshBadge isDark={true} />
      </footer>
    </div>
  );
}