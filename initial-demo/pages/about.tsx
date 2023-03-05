import styles from "../styles/Home.module.css";
import Link from "next/link";
import { MainLayout } from "../components/layouts/MainLayout";
import { DarkLayout } from "../components/layouts/DarkLayout";

export default function AboutPage() {
  return (
    <>
      <h1>About Page</h1>
      <div className={styles.description}>
        <h1 className={styles.title}>
          Ir a <Link href="/">Home</Link>
        </h1>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>pages/index.jsx</code>
        </p>
      </div>
    </>
  );
}

AboutPage.getLayout = function getLayout(page: JSX.Element) {
  return (
    <MainLayout>
      <DarkLayout>{page}</DarkLayout>
    </MainLayout>
  );
};
