const app = require("../../app");
const supertest = require("supertest");
const faker = require("faker");

describe("Testing if inital user is created", () => {
  it("tests the user creation route and returns an initial user from initial migration", async () => {
    const response = await supertest(app)
      .post("/users")
      .send({ userId: 1 });
    expect(response.status).toBe(200);
    expect(response.body.user).toEqual({
      id: 1,
      firstName: "Test",
      lastName: "Kasutaja",
      email: "test@kasutaja.ee",
      password: response.body.user.password
    });
  });
});

describe("Testing new user creation", async () => {
  const testUser = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: "testingpw"
  };
  it("tests if creating route really creates a new user", async () => {
    const response = await supertest(app)
      .post("/signup")
      .send(testUser);
    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty("email");
  });
});

describe("Testing if login sends back a token", async () => {
  it("tests if logging in sends back a token that can be used for authenticating", async () => {
    const response = await supertest(app)
      .post("/login")
      .send({ email: "test@kasutaja.ee", password: "nonhashedpassword" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
