import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {
  Request as ExRequest,
  Response as ExResponse,
  NextFunction,
} from "express";
import { ValidateError } from "tsoa";
import { RegisterRoutes } from './routes';
import { registerSwaggerRoutes } from './swagger';

//For env File 
dotenv.config();

const app: express.Express = express();
const port = process.env['PORT'] || 8000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, }));
app.use(express.static('public'));
registerSwaggerRoutes(app);
RegisterRoutes(app);

app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
});


app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});