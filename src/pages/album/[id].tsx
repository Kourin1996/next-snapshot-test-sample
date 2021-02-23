import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { User, Album, Photo } from "../../domain";
import { UserCard } from "../../components/UserCard";

type AlbumPageProps = {
  user: User;
  album: Album;
  photos: Photo[];
};

const AlbumPage: NextPage<AlbumPageProps> = (props) => {
  const { user, album, photos } = props;

  return (
    <div className="album__page">
      <h1>{album.title}</h1>
      <div className="album__body">
        <div className="album__body__list">
          {photos.map((photo) => {
            const { id, title, url } = photo;
            return (
              <div key={id} className="album__body__list__item">
                <img
                  alt={title}
                  src={url}
                  className="album__body__list__item__image"
                />
                <p className="album__body__list__item__title">{title}</p>
              </div>
            );
          })}
        </div>
        <div className="album__body__author">
          <UserCard user={user} />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<AlbumPageProps> = async (
  context
) => {
  const id = Array.isArray(context.params["id"])
    ? context.params["id"][0]
    : context.params["id"];

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
