import app from "../../../index";
import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import createToken from "../../../utils/createToken";

chai.use(chaiHttp);
const router = () => chai.request(app);

describe("Todo Test Cases", () => {
  it("Can't add to do without login token", (done) => {
    router()
      .post("/api/v1/todoApp/task/createTask")
      .send({
        title: "TodoTest1",
        description: "This is todo for testing",
        completed:true
        
      })
      .end((error, response) => {
        expect(response.body).to.be.a("object");
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.be.oneOf(["Unauthorized - Invalid token","Unauthorized - Missing token"]);
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
});
