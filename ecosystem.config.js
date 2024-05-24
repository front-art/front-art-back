module.exports = {
  apps: [
    {
      name: "frontart-back",
      script: "./dist/server.js", // Path to the entry point of your app
      instances: "max", // Or a number of instances
      exec_mode: "cluster", // Enables cluster mode
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        PORT: process.env.PORT,
      },
    },
  ],
};
