import { getPage } from "next-page-tester";
import fetchMock from "fetch-mock";
import renderer from "react-test-renderer";

describe("album page", () => {
  beforeAll(() => {
    fetchMock
      .get("https://jsonplaceholder.typicode.com/albums/1", {
        id: 1,
        userId: 1,
        title: "Test Title",
      })
      .get("https://jsonplaceholder.typicode.com/albums/1/photos", [
        {
          id: 1,
          albumId: 1,
          title: "Test Photo",
          url: "/test.png",
          thumbnailUrl: "/test-thumbnail.png",
        },
        {
          id: 2,
          albumId: 1,
          title: "Test Photo2",
          url: "/test-2.png",
          thumbnailUrl: "/test-thumbnail-2.png",
        },
      ])
      .get("https://jsonplaceholder.typicode.com/users/1", {
        id: 1,
        name: "Adam",
        username: "adam1980",
        email: "adam@hoge.org",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "adam.org",
        company: {
          name: "Test-Company",
          catchPhrase: "Next generation platform",
          bs: "photo",
        },
      });
  });

  test("should render correctly", async () => {
    const { page } = await getPage({
      route: "/album/1/",
    });

    const tree = renderer.create(page).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
