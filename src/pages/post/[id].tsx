import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { User, Post, Comment } from "../../domain";

type PostPageProps = {
  user: User;
  post: Post;
  comments: Comment[];
};

const PostPage: NextPage<PostPageProps> = (props) => {
  const { comments } = props;

  return <div>{JSON.stringify(comments)}</div>;
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  context
) => {
  const id = Array.isArray(context.query.id)
    ? context.query.id[0]
    : context.query.id;

  const [post, comments] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Object.keys(data).length === 0) {
          throw new Error("Not Found");
        }
        return data;
      }),
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((res) => res.json())
      .catch(() => []),
  ]);
  const user = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${post.userId}`
  ).then((res) => res.json());

  return {
    props: {
      user,
      post,
      comments,
    },
  };
};

export default PostPage;
