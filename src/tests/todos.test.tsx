import { getPage } from "next-page-tester";
import renderer from "react-test-renderer";
import fetchMock from "fetch-mock";
import { getServerSideProps } from "../pages/todos";

describe("index page", () => {
  beforeAll(() => {
    fetchMock.get("https://jsonplaceholder.typicode.com/todos", [
      {
        userId: 1,
        id: 1,
        title: "test (1)",
        completed: false,
      },
      {
        userId: 2,
        id: 2,
        title: "test (2)",
        completed: true,
      },
    ]);
  });

  test('should have "Welcome to"', async () => {
    const { page } = await getPage({
      route: "/todos",
    });

    const tree = renderer.create(page).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("getServerSideProps", async () => {
    const props = (await getServerSideProps({} as any)) as any;
    console.log("props", props);

    expect(props.props.todos).not.toBeFalsy();
  });
});
