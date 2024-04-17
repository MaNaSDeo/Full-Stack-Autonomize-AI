import * as dotenv from "dotenv";
import express, {
  type Express,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use((req: Request, res: Response, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.get("/api/v1", (req, res) => {
  res.send("<h1>GitHub Explorer</h1>");
});

const start = async (): Promise<void> => {
  try {
    mongoose
      .connect(process.env.MONGO_URI!)
      .then(() => {
        console.log("Connected to the Database...");
        return mongoose;
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
