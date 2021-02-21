import React from "react";
import { User } from "../../domain";
import styles from "./styles.module.css";

type UserCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: never;
  user: User;
};

export const UserCard: React.FC<UserCardProps> = (props) => {
  const { user } = props;

  return (
    <div className={styles.card}>
      <p className={styles.name}>{user.name}</p>
      <p className={styles.email}>{user.email}</p>
      <p className={styles.phone}>{user.phone}</p>
      <p className={styles.website}>{user.website}</p>
      <div className={styles.company}>
        <p className={styles["company-title"]}>Company Info</p>
        <p className={styles["company-name"]}>{user.company.name}</p>
        <p className={styles["company-catchphrase"]}>
          {user.company.catchPhrase}
        </p>
      </div>
    </div>
  );
};
