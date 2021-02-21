import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Index.module.css";

const Index: NextPage<{}> = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p>This is a Sample Project for Next Snapshot Test!</p>
        <p>Please click on the links below to see sample UI</p>
        <div className={styles.links}>
          <Link href="/posts">Posts</Link>
          <Link href="/albums">Albums</Link>
        </div>
      </main>
    </div>
  );
};

export default Index;
