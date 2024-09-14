import Link from 'next/link';
import { CardanoWallet } from "@meshsdk/react";
import styles from '../styles/Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.leftItems}>
          <Link href="/">Home</Link>
          <Link href="/MultisigTx">Multisig Transaction</Link>
        </li>
        <li>
          <CardanoWallet />
        </li>
      </ul>
    </nav>
  );
}
