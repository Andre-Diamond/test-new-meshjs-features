import Link from 'next/link';
import styles from '../styles/Nav.module.css';
import { useEffect, useState } from 'react';
import { CardanoWallet, useWallet } from '@meshsdk/react';

export default function Nav() {
  const { connected, wallet, disconnect } = useWallet();
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        setAddress(data?.user?.address ?? null);
      } catch {
        setAddress(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const login = async () => {
      if (!connected || !wallet) return;
      try {
        setLoading(true);
        let addr: string | null = null;
        try {
          // Preferred: change address
          addr = (await (wallet as any).getChangeAddress?.()) ?? null;
        } catch {
          // Fallback: first used address
          const used = (await (wallet as any).getUsedAddresses?.()) ?? [];
          addr = used[0] ?? null;
        }
        if (!addr) return;
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ address: addr }),
        });
        if (res.ok) {
          setAddress(addr);
        }
      } finally {
        setLoading(false);
      }
    };
    // Attempt login when wallet connects
    void login();
  }, [connected, wallet]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch('/api/auth/logout', { method: 'POST' });
      setAddress(null);
      if (connected) await disconnect();
    } finally {
      setLoading(false);
    }
  };

  const short = (addr: string) => `${addr.slice(0, 8)}…${addr.slice(-6)}`;

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.leftItems}>
          <Link href="/">Home</Link>
        </li>
        <li>
          {/* Wallet connect button (Mesh) */}
          <CardanoWallet />
        </li>
        <li>
          {address ? (
            <button onClick={handleLogout} disabled={loading}>
              {loading ? 'Signing out…' : `Sign out (${short(address)})`}
            </button>
          ) : (
            <span>{loading ? 'Authenticating…' : ''}</span>
          )}
        </li>
      </ul>
    </nav>
  );
}
