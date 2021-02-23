import React from "react";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { Post } from "../domain";

type PostsPageProps = {
  posts: Post[];
};

const PostsPage: NextPage<PostsPageProps> = (props) => {
  const { posts } = props;

  return (
    <div className="posts__page">
      <h1>Posts</h1>
      <div className="posts__list">
        {posts.map((post) => {
          const { id, title, body } = post;
          return (
            <Link key={id} href={`/post/${id}`}>
              <div className="posts__list__post">
                <h2 className="posts__list__post__title">{title}</h2>
                <span>{body}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PostsPageProps> = async () => {
  const posts = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((res) => res.json());

  return {
    props: {
      posts,
    },
  };
};

export default PostsPage;
