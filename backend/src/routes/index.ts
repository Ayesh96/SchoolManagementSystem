import { Router, type IRouter } from "express";
import classroomsRouter from "./classrooms";
import dashboardRouter from "./dashboard";
import feesRouter from "./fees";
import healthRouter from "./health";
import studentsRouter from "./students";
import teachersRouter from "./teachers";
import timetableRouter from "./timetable";

const router: IRouter = Router();

router.use(dashboardRouter);
router.use(healthRouter);
router.use(teachersRouter);
router.use(studentsRouter);
router.use(classroomsRouter);
router.use(timetableRouter);
router.use(feesRouter);

export default router;
