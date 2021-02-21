import React from "react";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { Card } from "../components/Card";
import styles from "../styles/posts.module.css";
import { Post } from "../domain/post";

type PostsPageProps = {
  posts: Post[];
};

const PostsPage: NextPage<PostsPageProps> = (props) => {
  const { posts } = props;

  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      <div className={styles.posts}>
        {posts.map((post) => {
          const { id, title, body } = post;
          return (
            <Link key={id} href={`/post/${id}`}>
              <Card>
                <div className={styles["post-container"]}>
                  <h2>{title}</h2>
                  <span>{body}</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
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
