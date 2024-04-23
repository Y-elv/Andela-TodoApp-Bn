import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

chai.use(chaiHttp);
const router = () => chai.request(app);

function registerAndLoginUser(callback: Function) {
  router()
    .post("/api/v1/todoApp/user/registerUser")
    .send({
      email: "testuserfortodo@gmail.com",
      password: "PasswordForUser",
    })
    .end((error, response) => {
      if (error) {
        return callback(error);
      }

      router()
        .post("/api/v1/todoApp/user/loginUser")
        .send({
          email: "testuserfortodo@gmail.com",
          password: "PasswordForUser",
        })
        .end((error, response) => {
          if (error) {
            return callback(error);
          }

          const token = response.body.message.token;
          callback(null, token);
        });
    });
}

describe("Todo Tasks Test Cases", () => {
  let todo = "609d2071278a0914dca23b99";
  let token = "";
  let createdTodo = {};

  before(function (done) {
    registerAndLoginUser((error: any, retrievedToken: string) => {
      if (error) {
        return done(error);
      }
      token = retrievedToken;
      done();
    });
  });

  after(function (done) {
    router()
      .delete("/api/v1/todoApp/user/delete")
      .set("authorization", `${token}`)
      .end((error, response) => {
        done();
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

        done(error);
      });
  });

  it("Should not be able to get Todos without login Token", (done) => {
    router()
      .get("/api/v1/todoApp/task/getAll")
      .end((error, response) => {
        expect(response.body).to.be.a("object");

        done(error);
      });
  });

   it("Should be able to get All todos", (done) => {
     router()
       .get("/api/v1/todoApp/task/getAll")
       .set("authorization", `${token}`)
       .end((error, response) => {
         expect(response.body).to.be.an("object");
         expect(response.body).to.have.property("status", true);
         done(error);
       });
   });

  // it("Should be able to add new todo", (done) => {
  //   router()
  //     .post("/api/v1/todoApp/task/createTask")
  //     .set("authorization", `${token}`)
  //     .send({
  //       title: "TestTodo",
  //       description: "This is todo created in testing.",
  //       completed: true,
  //     })
  //     .end((error, response) => {
  //       expect(response.body).to.be.an("object");
  //       expect(response.body).to.have.property("status", true);
  //       expect(response.body).to.have.property("message").that.is.an("object");
  //       createdTodo = response.body.message;
  //       done(error);
  //     });
  // });

  // it("Should be able to update todo", (done) => {
  //   router()
  //     .patch(`api/v1/todoApp/task/update/${(createdTodo as any)._id}`)
  //     .set("Authorization", `${token}`)
  //     .send({
  //       id: (createdTodo as any)._id,
  //       title: "Testing todo - updated",
  //       description: "This is updated todo created in testing.",
  //       completed: false,
  //     })
  //     .end((error, response) => {
  //       expect(response.body).to.be.an("object");
  //       expect(response.body).to.have.property("status", true);
  //       done(error);
  //     });
  // });

  // it("it will be able to create a task", (done) => {
  //   router()
  //     .post("/api/v1/todoApp/task/createTask")
  //     .set("authorization", `${token}`)
  //     .send({
  //       title: "TodoTest1",
  //       description: "This is todo for testing",
  //       completed: true,
  //     })
  //     .end(async (error, response) => {
  //       try {
  //         expect(response.body).to.be.a("object");
  //         expect(response.body).to.have.property("status");
  //         expect(response.body.status).to.equal(true);

  //         done();
  //       } catch (error) {
  //         console.error("Test failed:", error);

  //         done(error);
  //       }
  //     });
  // });

  // it("Can't add to do without login token", (done) => {
  //   router()
  //     .post("/api/v1/todoApp/task/createTask")
  //     .set("Authorization", `${token}`)
  //     .send({
  //       title: "TodoTest1",
  //       description: "This is todo for testing",
  //       completed: true,
  //     })
  //     .end((error, response) => {
  //       expect(response.body).to.be.a("object");
  //       expect(response.body).to.have.property("message");
  //       expect(response.body.message).to.be.oneOf([
  //         "Unauthorized - Invalid token",
  //         "Unauthorized - Missing token",
  //       ]);
  //       done(error);
  //     });
  // });

  it("Should be able to get All todos", (done) => {
    router()
      .get("/api/v1/todoApp/task/getAll")
      .set("authorization", `${token}`)
      .end((error, response) => {
        expect(response.body).to.be.an("object");
        expect(response.body).to.have.property("status", true);
        done(error);
      });
  });

  // it("Should be able to delete Todo", (done) => {
  //   router()
  //     .delete(`/api/v1/todoApp/task/delete/${todo}`)
  //     .set("Authorization", `${token}`)
  //     .end((error, response) => {
  //       expect(response.body).to.be.a("object");
  //       expect(response.body).to.have.property("message");
  //       expect(response.body.message).to.be.oneOf([
  //         "Deleted.",
  //         "Failed to delete Todo",
  //         "Todo doesn't exist.",
  //       ]);

  //       expect(response.body).to.have.property("status");
  //       expect(response.body.status).to.equal(true);

  //       done(error);
  //     });
  // });
});
