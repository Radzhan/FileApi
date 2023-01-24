import express from 'express';
import fileDb from '../fileDb';
import { Api, ApiWithOutIdAndDate } from '../types';

const messageRouter = express.Router();

messageRouter.post('/', async (req , res) => {
    if (!req.body.message || !req.body.author){
        return res.status(400).send({error: 'Author and message must be present in the request'});
    }
    const messageData: ApiWithOutIdAndDate  =  {
        message: req.body.message,
        author: req.body.author,
    };

    const savedMessage = await fileDb.addItem(messageData);
    res.send(savedMessage);
});

messageRouter.get('/', async (req, res) => {
    const Querydate = req.query.datetime as string;
    const date = new Date(Querydate);
    const isDate = isNaN(date.getDate());
    if (Querydate === undefined) {
        const messages = await fileDb.getItems();
        const last = messages.slice(-30);
        return res.send(last);
    }
     if (!isDate) {
        const messages: Api[] = await fileDb.getItems();
        const array: Api[] = [];
        messages.forEach((element) => {
            if (element.datetime > Querydate) {
                array.push(element);
            }
        });
        return res.send(array);
    } 
    if (isDate) {
        return res.status(400).send({error: 'Invalid datetime'});
    }  
})

export default messageRouter;