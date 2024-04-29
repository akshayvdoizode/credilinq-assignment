// import * as express from "express";
// import * as bodyParser from "body-parser";
// import { Request, Response } from "express";
// import { AppDataSource } from "./data-source";
// import { Routes } from "./routes";
// const cors = require("cors");

// AppDataSource.initialize()
//   .then(async () => {
//     const app = express();
//     app.use(bodyParser.json());

//     Routes.forEach((route) => {
//       (app as any)[route.method](
//         route.route,
//         (req: Request, res: Response, next: Function) => {
//           const result = new (route.controller as any)()[route.action](
//             req,
//             res,
//             next
//           );
//           if (result instanceof Promise) {
//             result.then((result) =>
//               result !== null && result !== undefined
//                 ? res.send(result)
//                 : undefined
//             );
//           } else if (result !== null && result !== undefined) {
//             res.json(result);
//           }
//         }
//       );
//     });
//     app.use(cors());

//     app.listen(5000);

//     console.log("Express server has started on port 5000. ");
//   })
//   .catch((error) => console.log(error));
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
const cors = require("cors");

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    // CORS configuration allowing requests from http://localhost:3000
    app.use(
      cors({
        origin: "http://localhost:3000",
        methods: "GET,POST",
        allowedHeaders: "Content-Type,Authorization",
      })
    );

    // Parse incoming JSON requests
    app.use(bodyParser.json());

    // Define routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // Handle preflight requests
    app.options("*", cors());

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Express server is listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
