import styles from "../styles/Home.module.css";
import Link from "next/link";
import { MainLayout } from "../components/layouts/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <h1>Home Page</h1>
      <div className={styles.description}>
        <h1 className={styles.title}>
          Ir a <Link href="/about">About</Link>
        </h1>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.jsx</code>
        </p>
      </div>
    </MainLayout>
  );
}
