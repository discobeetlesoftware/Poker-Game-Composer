import { App } from "./app";
import express = require("express");

export abstract class Controller<CustomApp extends App> {
    app: CustomApp;
    constructor(app: CustomApp) {
        this.app = app;
    }

    abstract registerRoutes(router: express.Router): void;
}
