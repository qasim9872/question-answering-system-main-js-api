import { Logger } from  "./utils/logger" 
import app from "./app";

const logger = Logger.getLogger('server')

const PORT = 3000;

app.listen(PORT, () => {
    logger.info(`Express server listening on port ${PORT}`);
})