import { getPage } from "next-page-tester";
import { screen } from "@testing-library/react";

describe("Index page", () => {
  test("renders index page", async () => {
    const { render } = await getPage({
      route: "/",
    });

    render();
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
  });
});
