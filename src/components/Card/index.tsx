import React from "react";
import styles from "./styles.module.css";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <div ref={ref} className={styles.card} {...rest}>
      {children}
    </div>
  );
});
