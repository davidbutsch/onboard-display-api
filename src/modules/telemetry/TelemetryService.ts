import { NotFoundError } from "@/common";
import { TelemetryFrame } from "@/modules/telemetry";
import { TelemetryRepository } from "./TelemetryRepository";

export class TelemetryService {
  private telemetryRepository = new TelemetryRepository();

  getAllTelemetryFrames = async (): Promise<TelemetryFrame[]> => {
    const frames = this.telemetryRepository.getFrames();

    return frames;
  };

  getLatestTelemetryFrame = async (): Promise<TelemetryFrame> => {
    const frames = this.telemetryRepository.getFrames();

    const latestFrame = frames.at(frames.length - 1);

    if (!latestFrame) throw new NotFoundError("No saved frames.");

    return latestFrame;
  };

  getHistoryLimit = async (): Promise<number> => {
    const historyLimit = this.telemetryRepository.getHistoryLimit();

    return historyLimit;
  };
}
