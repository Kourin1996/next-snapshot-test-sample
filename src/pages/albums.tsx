import React from "react";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { Album } from "../domain";

type AlbumsPageProps = {
  albums: Album[];
};

const AlbumsPage: NextPage<AlbumsPageProps> = (props) => {
  const { albums } = props;

  return (
    <div className="albums__page">
      <h1>Albums</h1>
      <div className="albums__list">
        {albums.map((album) => {
          const { id, title } = album;

          return (
            <Link key={id} href={`/album/${id}`}>
              <a className="albums__list__album">{title}</a>
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
