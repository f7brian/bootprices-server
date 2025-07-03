import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
// oridin added
const app: Application = express();
app.use(
  cors({
    origin: [
      'https://bootprices.com',
      'https://www.bootprices.com',
      'https://bootprices-dashboard.vercel.app',
      'https://bootprices-dashboard-gqju.vercel.app',
      'https://bootprices-frontend-xgab.vercel.app'
    ],
    credentials: true,
  })
);
// changes 
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "The server is running. . .",
  });
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

export default app;
