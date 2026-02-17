import { env, NotFoundError } from "@/common";
import express from "express";
import http from "http";

import { errorHandler } from "@/common";
import { telemetryRouter } from "@/modules/telemetry";
import cors from "cors";
import helmet from "helmet";
import { Server as SocketServer } from "socket.io";
import { Logger } from "./winston";

const app = express();
const server = http.createServer(app);

export const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  Logger.info({
    message: "Socket connected with id: " + socket.id,
    id: socket.id,
  });
});

app.enable("trust proxy");
app.use(helmet());
app.use(cors());
app.use(express.json());

// Log requests
app.use((request, _response, next) => {
  Logger.info({
    message: `${request.method} ${request.url}`,
    url: request.url,
    headers: request.headers,
  });
  next();
});

// Health check endpoint
app.get("/health", (_request, response) => {
  response.json({
    message: "All good over here :)",
  });
});

// Routes
app.use("/telemetry", telemetryRouter);

// Handle undefined routes
app.use((request, _response, next) =>
  next(new NotFoundError(`${request.method} ${request.url} not found.`))
);

app.use(errorHandler);

server.listen(env.keys.PORT, () => {
  Logger.info(`Listening on port ${env.keys.PORT}`);
});
