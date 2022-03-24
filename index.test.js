const axios = require("axios");
const { rest } = require("msw");
const { setupServer } = require("msw/node");

const url = `http://url:4242/potato`;

const server = setupServer(
  rest.get(url, (req, res, ctx) => {
    return res(ctx.json({ token: "mocked_user_token" }));
  }),
  rest.post(url, (req, res, ctx) => {
    return res(ctx.json({ token: "mocked_user_token" }));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("mockTest", () => {
  it("This fails intermittently", async () => {
    const { data } = await axios.get(url);

    expect(data).toStrictEqual({ token: "mocked_user_token" });
  });

  it("This always fails", async () => {
    const { data } = await axios.post(url, { some: "body" });

    expect(data).toStrictEqual({ token: "mocked_user_token" });
  });
});
