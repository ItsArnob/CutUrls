import path from "path";
import { port } from "./config";
import router from "./router/routes";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

export default (): void => {

    const app = express();
    
    app.use((req, res, next) => {
        express.json()(req, res, err => {
            if (err) {
                return res.sendStatus(400);
            }
            next();
        });
    });

    app.set("view engine", "ejs");
    app.use(cookieParser());
    app.use(express.urlencoded({ extended:true }));
    if (app.get("env") === "production") {
        app.use(morgan("combined"));
    } else {
        app.use(morgan("dev"));
    }
    app.use("/static",express.static(path.join(__dirname, "..", "public")));
    app.use(router);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
};