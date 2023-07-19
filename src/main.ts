import express, {json, NextFunction, urlencoded} from "express";
import { RegisterRoutes } from "./routes";
import {globalErrorHandler, notFoundHandler} from "./errorHandler";

export const app = express();

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());

RegisterRoutes(app);

app.use(notFoundHandler);
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);