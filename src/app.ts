import { port } from "./config";
import router from "./router/routes";
import express from "express";
import bodyparser from "body-parser";

export default (): void => {

    const app = express();
    
    app.use((req, res, next) => {
        bodyparser.json()(req, res, err => {
            if (err) {
                return res.sendStatus(400);
            }
            next();
        });
    });
    app.use(bodyparser.urlencoded({ extended:false }));
    app.use(router);

    app.listen(port, () => console.log(`Server listening on port ${port}`));
};