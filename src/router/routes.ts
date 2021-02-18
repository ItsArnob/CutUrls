import { Router } from "express";
import apiRouter from "./api.routes";
import viewsRouter from "./views.routes";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewsRouter);

export default router;