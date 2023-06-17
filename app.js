 
import dotenv from "dotenv";

dotenv.config({ path: `./.env` });
import express from "express";
import bodyParser from "body-parser";
import expressSanitizer from "express-sanitizer";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";

import badInput from "./config/badInput.js";
import logRegister from "./config/log.js";
import cors from "./config/cors.js";
import router from "./routers/routes.js";

dotenv.config({ path: `./.env` });
const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
// for upload image 
app.use(
    "/upload",
    express.static(path.join(path.resolve(), "upload"))
);
app.use(expressSanitizer());
app.use(express.json());
badInput(app);
logRegister(app);
//log
cors(app);
// helps in securing HTTP headers.
app.use(helmet());
app.use(
    helmet.hsts({
        maxAge: 0,
    })
);
//routers
app.use(router);

export default app;
