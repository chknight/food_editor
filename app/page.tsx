import Image from "next/image";
import styles from "./page.module.css";
import FoodEditor from "./food-editor/food-editor";

export default function Home() {
  return (
    <main className={styles.main}>
      <FoodEditor />
    </main>
  );
}
