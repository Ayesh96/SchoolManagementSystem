import * as Sentry from "@sentry/node";

const isProduction = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: process.env.SENTRY_DSN ?? "http://codeakos@localhost:7421/1",
  environment: isProduction ? "production" : "development", // "development" on your own machine
  release: "schoolmanagementsystem@1.0.0", // your version or git commit
  attachStacktrace: true, // logged messages carry the stack
});

// Names the app on every error.
Sentry.setTag("service", "schoolmanagementsystem");

export { Sentry };
