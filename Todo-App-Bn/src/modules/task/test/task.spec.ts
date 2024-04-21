import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Todo Tasks Test Cases", () => {
  let todo = "";
  it("it will be able to create a task", (done) => {
    router()
      .post("/api/v1/todoApp/task/createTask")
      .send({
        title: "TodoTest1",
        description: "This is todo for testing",
        completed: true,
      })
      .end(async (error, response) => {
        try {
          expect(response.body).to.be.a("object");
          expect(response.body).to.have.property("status");
          expect(response.body.status).to.equal(true);
          expect(response.body).to.have.property("message");
          expect(response.body.message).to.be.a("object");

          expect(response.body).to.have.property("todoId").that.is.a("string");

          todo = response.body.todoId;

          done();
        } catch (error) {
          console.error("Test failed:", error);

          done(error);
        }
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
        expect(response.body.message).to.be.oneOf([
          "Deleted.",
          "Failed to delete Todo",
          "Todo doesn't exist.",
        ]);

        expect(response.body).to.have.property("status");
        expect(response.body.status).to.equal(true);

        done(error);
      });
  });
});
