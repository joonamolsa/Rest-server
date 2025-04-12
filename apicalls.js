console.log("✅ apicalls.js loaded");

import express from "express";
import { verifyToken } from "./utils.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import index from "./api/index.js";
import data from "./api/data.js";
import login from "./api/login.js";
console.log("🧠 login-moduuli:", login);

const swaggerDocument = YAML.load("./openapi/api.yaml");
const app = express();
app.use(express.json());

app.use(cors());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", index);
app.use("/data", verifyToken, data);
app.use("/login", login);

// 🔍 TULOSTA KAIKKI KÄYTÖSSÄ OLEVAT REITIT
function listRoutes(app) {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push(middleware.route);
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          routes.push(route);
        }
      });
    }
  });

  console.log("🔎 Rekisteröidyt reitit:");
  routes.forEach((r) => {
    const methods = Object.keys(r.methods)
      .map((m) => m.toUpperCase())
      .join(", ");
    console.log(`  ${methods} ${r.path}`);
  });
}

listRoutes(app);

export default app;
