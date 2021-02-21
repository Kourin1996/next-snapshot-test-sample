import { getPage } from "next-page-tester";
import renderer from "react-test-renderer";

describe("index page", () => {
  test('should have "Welcome to"', async () => {
    const { page } = await getPage({
      route: "/index",
    });

    const tree = renderer.create(page).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
