// import { getPage } from "next-page-tester";
// import { screen } from "@testing-library/react";
// import fetchMock from "fetch-mock";

// describe("Index page", () => {
//   test("renders index page", async () => {
//     const { page, render } = await getPage({
//       route: "/",
//     });

//     render();
//     expect(screen.getByText("Welcome to")).toBeInTheDocument();
//   });
// });

import { render, screen } from "@testing-library/react";
import App from "../pages/index";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: "Welcome to Next.js!" })
    ).toBeInTheDocument();
  });
});
