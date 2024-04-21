import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import createToken from "../../../utils/createToken";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("User Test Cases", () => {
  let createdUser = "";
  it("Should be able register new user", (done) => {
    router()
      .post("/api/v1/todoApp/user/registerUser")
      .send({
        email: "testuser@gmail.com",
        password: "123",
      })
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("userId");
        expect(response.body.status).to.equal(true);
        expect(response.body.message).to.equal("Successfully registered.");
        createdUser = response.body.userId;
        done(error);
      });
  });

  it("Should not add same user twice", (done) => {
    router()
      .post("/api/v1/todoApp/user/registerUser")
      .send({
        email: "testuser@gmail.com",
        password: "123",
      })
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("message");
        expect(response.body.status).to.equal(false);
        expect(response.body.message).to.equal("User already exist.");
        done(error);
      });
  });

  it("Should be able to delete the user after register", (done) => {
    router()
      .delete(`/api/v1/todoApp/user/deleteUser/${createdUser}`)

      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("message");
        expect(response.body.status).to.equal(true);
        expect(response.body.message).to.equal("user deleted successfully");
        done(error);
      });
  });

  it("User should be able to login with valid credentials", (done) => {
    router()
      .post("/api/v1/todoApp/user/loginUser")
      .send({
        email: "mugishaelvis456@gmail.com",
        password: "123",
      })
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.an("object"); 
        expect(response.body.message).to.have.property("token");
        expect(response.body.status).to.equal(true);

        // Verify that the token is present
        expect(response.body.message.token).to.be.a("string");

        done(error);
      });
  });

  it("User should not be able to login with invalid credentials", (done) => {
    router()
      .post("/api/v1/todoApp/user/loginUser")
      .send({
        email: "fake@gmail.com",
        password: "fakePassword",
      })
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("message");
        expect(response.body.status).to.equal(false);
        expect(response.body.message).to.be.oneOf([
          "User not found",
          "Invalid Credentials",
        ]);
        done(error);
      });
  });
});
