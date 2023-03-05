import { MainLayout } from "../../components/layouts/MainLayout"
import styles from "../../styles/Home.module.css";
import Link from "next/link";

export default function PricingPage() {
  return (
    <MainLayout>
      <h1>Pricing Page</h1>
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
  )
}
