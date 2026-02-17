import { io } from "@/libs";
import { TelemetryFrame } from "./types";

export class TelemetryRepository {
  private frames: TelemetryFrame[] = [];
  private historyLimit = 41;

  constructor() {
    this.init();
  }

  // TODO: Implement CAN reading
  private init = () => {
    // Temporary test data generator
    let startTime = Date.now();

    function generateDummyFrame(): TelemetryFrame {
      const elapsed = (Date.now() - startTime) / 100; // seconds elapsed
      const period = 240; // total period for a full up-and-down cycle (seconds)
      const sineFactor = Math.sin((2 * Math.PI * elapsed) / period); // -1 -> 1

      // Normalize sine to go from 0 -> 1
      const normalized = (sineFactor + 1) / 2;

      const dummyFrame: TelemetryFrame = {
        speed: 12 + Math.sin((2 * Math.PI * elapsed) / 60) * 10,
        batteries: {
          main: {
            voltage: 46 + normalized * 4, // 46 -> 50V
            current: 14 + normalized * 2, // 14 -> 16A
            percent: 60 + normalized * 20 + Math.random() * 2, // 80 -> 90%
          },
          auxiliary: {
            voltage: 11 + normalized * 2, // 11 -> 13V
            current: 1.5 + normalized * 1, // 1.5 -> 2.5A
            percent: 15 + normalized * 50 + Math.random() * 2, // 87.5 -> 92.5%
          },
        },
        arrays: [
          {
            voltage: 25 + Math.random() * 2 - 1,
            current: 8 + Math.random() * 1 - 0.5,
            power: 200 + Math.random() * 20 - 10,
          },
          {
            voltage: 24 + Math.random() * 2 - 1,
            current: 8 + Math.random() * 1 - 0.5,
            power: 198 + Math.random() * 20 - 10,
          },
          {
            voltage: 24 + Math.random() * 2 - 1,
            current: 8 + Math.random() * 1 - 0.5,
            power: 202 + Math.random() * 20 - 10,
          },
          {
            voltage: 23 + Math.random() * 2 - 1,
            current: 8 + Math.random() * 1 - 0.5,
            power: 196 + Math.random() * 20 - 10,
          },
        ],
        motor: {
          voltage: 24 + Math.random() * 2 - 1,
          temperature: 128 + Math.random() * 10 - 5,
          power: 2500 + Math.random() * 200 - 100,
        },
        cabin: {
          temperature: 75 + Math.random() * 10 - 5,
        },
      };

      return dummyFrame;
    }

    setInterval(() => {
      const frame = generateDummyFrame();
      this.addFrame(frame);
      io.emit("frame", frame);
    }, 500);
  };

  private addFrame = (frame: TelemetryFrame) => {
    // If frames length reaches limit remove first frame
    if (this.frames.length == this.historyLimit) this.frames.shift();

    this.frames.push(frame);
  };

  getFrames = (): TelemetryFrame[] => {
    return this.frames;
  };

  getHistoryLimit = () => {
    return this.historyLimit;
  };
}
