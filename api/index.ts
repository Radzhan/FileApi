import express from "express";
import fileDb from "./fileDb";
import cors from "cors"
import messageRouter from "./router/messages";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/messages', messageRouter);

const run = async () => {
    await fileDb.init();
    
    app.listen(port, () => {
        console.log('we are live on ' + port);
    });
};

run().catch(console.error)