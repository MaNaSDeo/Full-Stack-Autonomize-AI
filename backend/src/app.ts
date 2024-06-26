import * as dotenv from "dotenv";
import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import connectDB from "./db/connect";
import userRoute from "./routes/user.routes";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

/*
app.use((req: Request, res: Response, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});
*/

app.get("/", (req, res) => {
  res.send('<h1>GitHub Explorer</h1><a href="/api-docs">Documentation</a>');
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/users", userRoute);

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
