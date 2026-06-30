import "dotenv/config";
import { dbConnect } from "./database/index.js";
import { app } from "./app.js";

dbConnect();

const port = process.env.PORT || 2200;
app.listen(port, () => {
    console.log(`the server is active on port ${port}`);
});