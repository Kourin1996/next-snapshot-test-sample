import { getPage } from "next-page-tester";
import { render, screen } from "@testing-library/react";

describe("use enzyme", () => {
  test('as a user I can combine "enzyme" and "next-page-tester"', async () => {
    const { page } = await getPage({
      route: "/index",
    });

    render(page);
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
  });
});
