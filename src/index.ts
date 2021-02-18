import dotenv from "dotenv";
dotenv.config();

import { connectClient } from "./server/database/mongo";
import app from "./server/app";

console.log("Connecting to mongoDB server...");

(async function () {
    try {
        const client = await connectClient();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to mongoDB server.");
        app();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}());
