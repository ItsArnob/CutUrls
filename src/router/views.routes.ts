import { urlCollection, waitBeforeRedirect } from "../config";
import { Router } from "express";
import { db } from "../database/mongo";

const router = Router();

router.get("/", (req, res) => {
    if(req.cookies.theme == "light") {
        res.render("home.ejs", {  cssHome: "light-home",cssNav:"light-nav", themeChecked: ""});
    }
    else if (req.cookies.theme == "dark") {
        res.render("home.ejs", { cssHome: "dark-home",cssNav:"dark-nav", themeChecked:"checked" });
    }
    else {
        res.cookie("theme", "light");
        res.render("home.ejs", { cssHome: "light-home", cssNav: "light-nav", themeChecked: "" });
    }
    
});
//temp
router.get("/favicon.ico", (req, res) => {
    res.status(404);
});

router.get("/:id", async (req, res) => {
    const shortUrlId = req.params.id;
    db().collection(urlCollection).findOne({ _id: shortUrlId }).then(doc => {
        if (doc) {
            db().collection(urlCollection).updateOne({ _id: shortUrlId }, {
                $inc: { clicks: 1 }
            }).catch(err => {
                res.status(500).send("Oops! something went wrong."); console.error(err);
            });
            if(waitBeforeRedirect == 0) return res.redirect(doc.redirectURL);
            res.render("redirect.ejs", { id: shortUrlId, redirectUrl: doc.redirectURL, seconds: waitBeforeRedirect, clicks: doc.clicks, });
        }
        else {
            if (req.cookies.theme == "light") {
                res.render("notfound.ejs", { cssNav: "light-nav", themeChecked: "" });
            }
            else if (req.cookies.theme == "dark") {
                res.render("notfound.ejs", { cssNav: "dark-nav", themeChecked: "checked" });
            }
            else {
                res.cookie("theme", "light");
                res.render("notfound.ejs", { cssNav: "light-nav", themeChecked: "" });
            }
        }
    });

});

export default router;
