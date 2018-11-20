
import * as express from "express"
import * as bodyParser from "body-parser"

const app = express()

class App {

    private app: express.Application;

    constructor() {
        this.app = express();
        this.setup();        
    }

    public getApp(): express.Application {
        return this.app
    }

    private setup(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        // support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().getApp();