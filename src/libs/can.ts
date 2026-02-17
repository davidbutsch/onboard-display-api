export type Battery = {
  voltage: number;
  current: number;
  percent: number;
};

export type SolarArray = {
  voltage: number;
  current: number;
  power: number;
};

export type Motor = {
  voltage: number;
  temperature: number;
  power: number;
};

export type TelemetryData = {
  speed: number;
  batteries: {
    main: Battery;
    auxiliary: Battery;
  };
  solarArrays: SolarArray[];
  motor: Motor;
  driverTemperature: number;
};

const generateTelemetryData = (): TelemetryData => {
  const mainBatteryVoltage = 45 + Math.random() * 5;
  const motorPower = Math.random() * 1000;
  const speed = (motorPower / 100) * (0.8 + Math.random() * 0.4);

  return {
    speed,
    batteries: {
      main: {
        voltage: mainBatteryVoltage,
        current: motorPower / mainBatteryVoltage,
        percent: 60 + Math.random() * 20,
      },
      auxiliary: {
        voltage: 12 + Math.random() * 0.5,
        current: 1 + Math.random() * 0.5,
        percent: 80 + Math.random() * 10,
      },
    },
    solarArrays: [
      {
        voltage: 24 + Math.random() * 2,
        current: 4 + Math.random() * 1,
        power: 100 + Math.random() * 20,
      },
      {
        voltage: 24 + Math.random() * 2,
        current: 4 + Math.random() * 1,
        power: 100 + Math.random() * 20,
      },
    ],
    motor: {
      voltage: mainBatteryVoltage,
      temperature: 40 + (motorPower / 1000) * 20 + Math.random() * 5,
      power: motorPower,
    },
    driverTemperature: 35 + Math.random() * 3,
  };
};
