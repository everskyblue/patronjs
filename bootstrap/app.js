import Patron from "../lib/patron.js";
import * as config  from "../config/app.js";
import {LOCATION_DB_PATH, CONNECTION} from "../config/db.js";

const app = new Patron(config);
app.setDBConfig(LOCATION_DB_PATH, CONNECTION);

export default app;