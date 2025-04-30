import express from "express";
import { verifyToken } from "./utils.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import index from "./api/index.js";
import data from "./api/data.js";
import login from "./api/login.js";
import register from "./api/register.js";
import users from "./api/users.js";

const swaggerDocument = YAML.load("./openapi/api.yaml");
const app = express();
app.use(express.json());

app.use(cors());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", index);
app.use("/data", verifyToken, data);
app.use("/login", login);
app.use("/register", register);
app.use("/users", users);

export default app;
