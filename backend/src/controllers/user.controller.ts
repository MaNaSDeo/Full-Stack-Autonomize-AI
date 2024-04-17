import { type Request, type Response } from "express";

const testController = (req: Request, res: Response) => {
  console.log("Test controller");
  res.send("Test controller");
};

export { testController };
