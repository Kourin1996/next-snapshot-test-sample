import { getPage } from "next-page-tester";
import { render, screen } from "@testing-library/react";

describe("index page", () => {
  test('should have "Welcome to"', async () => {
    const { page } = await getPage({
      route: "/index",
    });

    render(page);
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
  });
});
