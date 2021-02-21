import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { User, Album, Photo } from "../../domain";

type AlbumPageProps = {
  user: User;
  album: Album;
  photos: Photo[];
};

const AlbumPage: NextPage<AlbumPageProps> = (props) => {
  const { photos } = props;

  return <div>{JSON.stringify(photos)}</div>;
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
    `https://jsonplaceholder.typicode.com/albums/${album.userId}`
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
