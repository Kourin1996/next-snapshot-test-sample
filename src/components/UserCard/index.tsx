import React from "react";
import { User } from "../../domain";
import { Card } from "../Card";
import styles from "./styles.module.css";

type UserCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: never;
  user: User;
};

export const UserCard: React.FC<UserCardProps> = (props) => {
  const { user } = props;

  return (
    <Card>
      <div className={styles.container}>
        <p className={styles.name}>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.website}</p>
      </div>
    </Card>
  );
};
