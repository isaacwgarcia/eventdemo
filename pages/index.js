import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Events Dashboard</title>
        <meta name="description" content="Events Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome</h1>

        <div className={styles.grid}>
          <div>
            Organizing Owner, Events and Attendees with @materializer. <br />
            Make Rest API endpoints integrations in minutes with Stepzen.
            <br />
            <br />
          </div>
          <a
            href="https://github.com/isaacwgarcia/eventdemo"
            className={styles.card}
          >
            <h2>Code &rarr;</h2>
            <p>
              Find the code to start using Next.js features APIs and Stepzen.
            </p>
          </a>
          <a href="/owner/isaac@gmail.com" className={styles.card}>
            <h2>Try it &rarr;</h2>
            <p>Dynamic Route for each owner.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
