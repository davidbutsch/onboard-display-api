import { Router } from "express";
import { TelemetryController } from "./TelemetryController";

export const telemetryRouter = Router();
const telemetryController = new TelemetryController();

telemetryRouter.get("/frames", telemetryController.getAllTelemetryFrames);

telemetryRouter.get(
  "/frames/latest",
  telemetryController.getLatestTelemetryFrame
);

telemetryRouter.get("/historyLimit", telemetryController.getHistoryLimit);
