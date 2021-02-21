import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { User, Album, Photo } from "../../domain";
import styles from "../../styles/album/index.module.css";
import { UserCard } from "../../components/UserCard";

type AlbumPageProps = {
  user: User;
  album: Album;
  photos: Photo[];
};

const AlbumPage: NextPage<AlbumPageProps> = (props) => {
  const { user, album, photos } = props;

  return (
    <div className={styles["container"]}>
      <h1>{album.title}</h1>
      <div className={styles["album"]}>
        <div className={styles["photos"]}>
          {photos.map((photo) => {
            const { id, title, url } = photo;
            return (
              <div key={id} className={styles["photo"]}>
                <img alt={title} src={url} />
                <p>{title}</p>
              </div>
            );
          })}
        </div>
        <div className={styles["album-author"]}>
          <UserCard user={user} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<AlbumPageProps> = async (
  context
) => {
  const id = Array.isArray(context.query.id)
    ? context.query.id[0]
    : context.query.id;

  const [album, photos] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((res) => res.json())
      .then(
        (data): Album => {
          if (Object.keys(data).length === 0) {
            throw new Error("Not Found");
          }
          return data;
        }
      ),
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((res) => res.json())
      .catch(() => []),
  ]);
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/users/${album.userId}`
  ).then((res) => res.json());

  return {
    props: {
      user,
      album,
      photos,
    },
  };
};

export default AlbumPage;
