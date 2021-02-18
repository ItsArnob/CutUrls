import { MongoClient, Db } from "mongodb";
import { mongodbUri, dbName } from "../../config";

const mongoClient = new MongoClient(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true, });

const connectClient = async (): Promise<MongoClient> => {
    if (!mongoClient.isConnected()) {

        try {
            await mongoClient.connect();
            return mongoClient;
        } catch (error) {
            console.error(error);
            process.exit(1);
        }

    }
    return mongoClient;
};

const db = ():Db => {
    return mongoClient.db(dbName);
};

export { db, connectClient };