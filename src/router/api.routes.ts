/*
 Yes i wasted some seconds organizing the imports.
*/
import { urlCollection, multiShortURLPerLink, retryIdGen, shortUrlIdLength, bannedIds } from "../config";
import { Router, Response } from "express";
import validator from "validator";
import { nanoid } from "nanoid/async";
import { db } from "../database/mongo";

const router = Router();

router.get("/info/:id", async (req, res) => {
    const shortUrlId = req.params.id;
    db().collection(urlCollection).findOne({ _id: shortUrlId }, { projection: { redirectURL: 1, clicks: 1, createdAt: 1, custom: 1 } }).then((doc) => {
        if (!doc) {
            return res.status(404).json({ "message": "NOT_FOUND" });
        }
        res.json(doc);

    }).catch(err => {
        console.error(err);
    });
});

router.post("/create", async (req, res) => {
    const { body } = req;
    if (Object.entries(body).length == 0) return res.status(400).json({ message: "NO_BODY" });

    const data: dataOBJ = {
        _id: body.customID ? String(body.customID) : await createID(),
        clicks: 0,
        custom: body.customID ? true : false,
        createdAt: new Date(),
        redirectURL: body.url ? body.url : undefined,
    };

    if (!data.redirectURL) return res.status(400).json({ message: "NO_URL" });
    if (!validator.isURL(data.redirectURL /*, { protocols: ["https", "http"] }*/)) return res.status(400).json({ message: "INVALID_URL" });
    //if (!validator.isURL(data.redirectURL, { require_protocol: true, protocols: ["https", "http"] })) return res.status(400).json({ message: "NO_PROTOCOL" });
    if (multiShortURLPerLink) {
        storeURL(true, data, res);
    }
    else {
        storeURL(false, data, res);
    }
});

const storeURL = (multiShortURL: boolean, data: dataOBJ, res: Response) => {

    //MultiShortURL support coming soon(TM)

    //Check if provided customID is banned or not. 

    if (data.custom && bannedIds.includes(data._id.toLowerCase())) return res.status(403).json({ message: "BANNED_ID" });
    
    //Insert the data
    const InsertData = async (i = 0, newID = "") => {

        if (i == retryIdGen) {

            //retry limit has been reached. send a error response back to the client. 
            console.log(`Failed to create a short ID for URL: ${data.redirectURL}. Maybe the ID length isn't big enough? try changing the environment variable's ("SHORTURLID_LENGTH") value.`);
            return res.status(500).json({ message: "FAILED_CREATE_ID" });
        }

        const Data = newID ? <dataOBJ>{
            ...data,
            _id: newID,
        } : data;

        if (bannedIds.includes(Data._id.toLowerCase())) {
            i++;
            InsertData(i);
        }
        
        db().collection(urlCollection).insertOne(Data).then(() => {
            console.log("An URL has been shortened.");
            res.status(201).json({ message: "SHORT_URL_SUCCESS", data: Data });
        }).catch(async (err) => {

            //check if the error is about duplicate key.
            if (String(err).includes("duplicate key error collection")) {

                //If the error occurred cause of a customID then send a respond with UNAVAILABLE_CUSTOM_ID.
                if (Data.custom) {
                    console.log("Duplicate key error. UNAVAILABLE_CUSTOM_ID.");
                    res.json({ message: "UNAVAILABLE_CUSTOM_ID" });
                }
                else {
                    /*
                     It seems like nanoid created an id that already exists. lets retry to generate a new one, hopefully it will be unique.
                     if it fails to do it after retrying set amount of time, it will send an error response to the client.
                    */
                    console.log(`Failed to create a short ID for URL: ${Data.redirectURL} because the id created by nanoID already exists...retrying`);
                    i++;
                    InsertData(i, await createID());
                }
            }
            console.error(err); 
        });

    };
    InsertData();
};
const createID = async () => {
    return await nanoid(shortUrlIdLength);
};

export default router;
export interface dataOBJ {
    _id: string,
    clicks: number,
    custom: boolean,
    createdAt: Date,
    redirectURL: string | undefined,

}