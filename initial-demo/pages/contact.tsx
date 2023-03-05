import styles from "../styles/Home.module.css";
import Link from "next/link";
import { MainLayout } from "../components/layouts/MainLayout";

export default function ContactPage() {
  return (
    <MainLayout>
      <h1>Contact Page</h1>
      <div className={styles.description}>
        <h1 className={styles.title}>
          Ir a <Link href="/">Home</Link>
        </h1>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.jsx</code>
        </p>
      </div>
    </MainLayout>
  );
}
