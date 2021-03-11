import dotenv from "dotenv";
dotenv.config();

import { connectClient } from "./database/mongo";
import app from "./app";

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
