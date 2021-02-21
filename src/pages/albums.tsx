import React from "react";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import styles from "../styles/albums.module.css";
import { Album } from "../domain";

type AlbumsPageProps = {
  albums: Album[];
};

const AlbumsPage: NextPage<AlbumsPageProps> = (props) => {
  const { albums } = props;

  return (
    <div className={styles.container}>
      <h1>Albums</h1>
      <div className={styles.albums}>
        {albums.map((album) => {
          const { id, title } = album;

          return (
            <Link key={id} href={`/album/${id}`}>
              <a className={styles.album}>{title}</a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<AlbumsPageProps> = async () => {
  const albums = await fetch(
    "https://jsonplaceholder.typicode.com/albums"
  ).then((res) => res.json());

  return {
    props: {
      albums,
    },
  };
};

export default AlbumsPage;
