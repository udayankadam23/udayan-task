"use client"
import styles from "./main.module.css"
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter()

  router.push("/quiz")
  
  return (
    <div className={styles.app_home}>
    </div>
  );
}
