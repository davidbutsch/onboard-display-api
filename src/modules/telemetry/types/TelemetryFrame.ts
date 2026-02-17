export type TelemetryFrameBattery = {
  voltage: number;
  current: number;
  percent: number;
};

export type TelemetryFrameArray = {
  voltage: number;
  current: number;
  power: number;
};

export type TelemetryFrameMotor = {
  voltage: number;
  temperature: number;
  power: number;
};

export type TelemetryFrameCabin = {
  temperature: number;
};

export type TelemetryFrame = {
  speed: number;
  batteries: {
    main: TelemetryFrameBattery;
    auxiliary: TelemetryFrameBattery;
  };
  arrays: TelemetryFrameArray[];
  motor: TelemetryFrameMotor;
  cabin: TelemetryFrameCabin;
};
