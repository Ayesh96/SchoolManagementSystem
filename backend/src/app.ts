import * as Sentry from "@sentry/node";
import express, { type ErrorRequestHandler, type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Capture errors thrown by route handlers. The default `expressIntegration()` relies on
// diagnostics-channel module injection, which cannot reach express once it is bundled into the
// single-file esbuild output, so register the error handler explicitly.
Sentry.setupExpressErrorHandler(app);

const apiErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  req.log.error({ err: error }, "Unhandled API error");
  if (res.headersSent) return;
  res.status(500).json({ error: "An unexpected server error occurred." });
};
app.use(apiErrorHandler);

export default app;
