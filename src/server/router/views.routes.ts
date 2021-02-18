import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
    res.send("there is nothing to see here.");
});

router.get("/:id", async (req, res) => {
    const shortUrlId = req.params.id;
    res.send(shortUrlId);
    //Will work on this after I have a working front end

});

export default router;
