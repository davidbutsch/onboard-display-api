import { RequestHandler } from "express";
import { TelemetryService } from "./TelemetryService";

export class TelemetryController {
  private telemetryService = new TelemetryService();

  /**
   * Get all telemetry frames.
   */
  getAllTelemetryFrames: RequestHandler = async (_request, response) => {
    const frames = await this.telemetryService.getAllTelemetryFrames();

    response.json(frames);
  };

  /**
   * Get latest telemetry frame.
   */
  getLatestTelemetryFrame: RequestHandler = async (_request, response) => {
    const frame = await this.telemetryService.getLatestTelemetryFrame();

    response.json(frame);
  };

  getHistoryLimit: RequestHandler = async (_request, response) => {
    const historyLimit = await this.telemetryService.getHistoryLimit();

    response.json(historyLimit);
  };
}
