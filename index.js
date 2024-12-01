import express from "express";

const routes = express.Router();
routes.get("/", function (req, res, next) {
    res.status(200).send("Ok").end();
});

export { routes as default };