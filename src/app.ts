import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import battleRouter from "./routers/battleRouter.js";
import rankingRouter from "./routers/rankingRouter.js";
import errorHandleMiddleware from "./middlewares/errorHandleMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(battleRouter);
app.use(rankingRouter);
app.use(errorHandleMiddleware);

export default app;
