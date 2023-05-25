import { RequestForm } from "./components/requestForm";
import styles from "./page.module.scss";

export default function RequestPage() {
  return (
    <main className={styles.formPage}>
      <h1 className={styles.title}>Подбор программы</h1>
      <RequestForm />
    </main>
  );
}
