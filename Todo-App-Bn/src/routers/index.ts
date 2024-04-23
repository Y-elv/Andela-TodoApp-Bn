import express from "express";
import userRoutes from "./userRouter";
import taskRouter from "./taskRouter";

const router = express.Router();

router.use("/v1/todoApp/user", userRoutes);
router.use("/v1/todoApp/task", taskRouter);

export default router;
