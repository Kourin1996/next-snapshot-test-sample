import React from "react";
import { User } from "../../domain";

type UserCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: never;
  user: User;
};

export const UserCard: React.FC<UserCardProps> = (props) => {
  const { user } = props;

  return (
    <div className="user-card">
      <p className="user-card__name">{user.name}</p>
      <p className="user_card__email">{user.email}</p>
      <p className="user-card__phone">{user.phone}</p>
      <p className="user-card__website">{user.website}</p>
      <div className="user-card__company">
        <p className="user-card__company__title">Company Info</p>
        <p className="user-card__company__name">{user.company.name}</p>
        <p className="user-card__company__catchphrase">
          {user.company.catchPhrase}
        </p>
      </div>
    </div>
  );
};
