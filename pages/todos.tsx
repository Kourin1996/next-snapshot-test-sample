import { GetServerSideProps, NextPage } from "next";
import React from "react";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type TodoPageProps = {
  todos: Todo[];
};

const TodosPage: NextPage<TodoPageProps> = (props) => {
  const { todos } = props;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {todos.map((todo) => {
        const { userId, id, title, completed } = todo;

        return (
          <div key={id} style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" checked={completed} />
            <span style={{ marginLeft: "8px" }}>{`${title} (${userId})`}</span>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = "https://jsonplaceholder.typicode.com/todos";
  const todos = await fetch(url).then((data) => data.json());

  return {
    props: {
      todos,
    },
  };
};

export default TodosPage;
