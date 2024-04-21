import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import createToken from "../../../utils/createToken";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Todo Test Cases", () => {
  let todo = "";
  let token = "";

  before(async () => {
    const _id = "123456789";
    const email = "example@example.com";
    token = await createToken(_id, email);
  });

  it("it will be able to create a task", (done) => {
    router()
      .post("/api/v1/todoApp/task/createTask")
      .set("authorization", `Bearer ${token}`)
      .send({
        title: "TodoTest1",
        description: "This is todo for testing",
        completed: true,
      })
      .end((error, response) => {
        expect(response.body.message).to.be.an("object");
        expect(response.body).to.have.property("status");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("todoId");
        expect(response.body.status).to.equal(true);
        expect(response.body.message).to.be.an("object");
        expect(response.body.message).to.have.property("title", "TodoTest1");
        expect(response.body.message).to.have.property(
          "description",
          "This is todo for testing"
        );
        expect(response.body.message.completed).to.be.oneOf([true, false]);

        // Verify that the todoId matches the _id of the created todo
        expect(response.body.todoId).to.equal(response.body.message._id);
        todo = response.body.todoId;
        done(error);
      });
  });

  it("Can't add to do without login token", (done) => {
    router()
      .post("/api/v1/todoApp/task/createTask")
      .send({
        title: "TodoTest1",
        description: "This is todo for testing",
        completed: true,
      })
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.oneOf([
          "Unauthorized - Invalid token",
          "Unauthorized - Missing token",
        ]);
        done(error);
      });
  });

  it("Should not be able to get Todos without login Token", (done) => {
    router()
      .get("/api/v1/todoApp/task/getAll")
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.oneOf([
          "Unauthorized - Invalid token",
          "Unauthorized - Missing token",
        ]);

        done(error);
      });
  });

  it("Should be able to delete Todo", (done) => {
    router()
      .delete(`/api/v1/todoApp/task/delete/${todo}`)
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body).to.have.property("status");
        expect(response.body.message).to.equal("Deleted.");
        expect(response.body.status).to.equal(true);
        done(error);
      });
  });
});
