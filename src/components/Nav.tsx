import Link from 'next/link';
import styles from '../styles/Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.leftItems}>
          <Link href="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}
