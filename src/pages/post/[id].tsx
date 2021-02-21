import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { User, Post, Comment } from "../../domain";
import styles from "../../styles/post/index.module.css";
import { UserCard } from "../../components/UserCard";

type PostPageProps = {
  user: User;
  post: Post;
  comments: Comment[];
};

const PostPage: NextPage<PostPageProps> = (props) => {
  const { user, post, comments } = props;

  return (
    <div className={styles.container}>
      <div className={styles["post-container"]}>
        <div className={styles["post-content"]}>
          <h1 className={styles.title}>{post.title}</h1>
          <p>{post.body}</p>
        </div>
        <div className={styles["post-author"]}>
          <UserCard user={user} />
        </div>
      </div>
      <div className={styles["comments"]}>
        <h2 className={styles["comments-title"]}>Comment</h2>
        {comments.map((comment) => {
          const { id, name, email, body } = comment;

          return (
            <div key={id} className={styles["comment"]}>
              <p className={styles["comment-header"]}>{`${name} (${email})`}</p>
              <p className={styles["comment-body"]}>{body}</p>
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
