console.log("Code Clash Judge Worker started");

process.on("SIGINT", () => {
  console.log("Judge Worker shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Judge Worker shutting down...");
  process.exit(0);
});