import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { User, Post, Comment } from "../../domain";
import { UserCard } from "../../components/UserCard";

type PostPageProps = {
  user: User;
  post: Post;
  comments: Comment[];
};

const PostPage: NextPage<PostPageProps> = (props) => {
  const { user, post, comments } = props;

  return (
    <div className="post__page">
      <div className="post__main">
        <div>
          <h1 className="post__main__post__title">{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <div className="post__main__author">
          <UserCard user={user} />
        </div>
      </div>
      <div className="post__comments">
        <h2 className="post__comments__title">Comment</h2>
        {comments.map((comment) => {
          const { id, name, email, body } = comment;

          return (
            <div key={id} className="post__comments__comment">
              <p className="post__comments__comment__header">{`${name} (${email})`}</p>
              <p className="post__comments__comment__content">{body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  context
) => {
  const id = Array.isArray(context.params["id"])
    ? context.params["id"][0]
    : context.params["id"];

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
    `https://jsonplaceholder.typicode.com/users/${post.userId}`
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
