module.exports = {
  apps: [
    {
      name: "my-app",
      script: "./dist/server.js", // Path to the entry point of your app
      instances: "max", // Or a number of instances
      exec_mode: "cluster", // Enables cluster mode
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
