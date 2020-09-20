const express = require("express");
const router = express.Router();
const tags = require("../utils/tags");
const { partialBotObject } = require("../utils/bot");

module.exports = (db) => {
    router.get("/:tag", (req, res) => {
        const tagName = req.params.tag;
        const tagFormated = tags[tagName];
        let page = req.query.page;
        if (!page || isNaN(page) || page < 1) 
            page = 1
        db.Bots.find({"details.tags": tagName}).limit(18).skip((page-1) * 18).exec().then(bots => {
            res.render("tags", {title: tagFormated, tag: tagFormated, page, bots: (bots || []).map(partialBotObject)});
        });
    });

    return router;
}
