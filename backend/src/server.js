//! start server only when database is connected

import app from "./app.js";

import { connectDB } from "./config/database-config.js";
import { ENV_VAR } from "./config/index.js";

connectDB()
  .then(() => {
    app.listen(ENV_VAR.PORT, (err) => {
      if (err) {
        console.log("Error while starting the server");
        console.log(err);
        return;
      }
      console.log("Server Started at port:", ENV_VAR.PORT);
    });
  })
  .catch((err) => {
    console.log("Error while connecting with database");
    console.log(err);
  });
