import express from 'express';
const router = express.Router();
import eventEmitter from '../main';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

type statusType = {
    status: string
}

router.post('/', (req: express.Request, res: express.Response) => {
    const apikey = process.env.APIKEY;
    const auth = req.header('Authorization');
    if (auth === apikey) {
        console.log('auth succesfull with req.body = ' + req.body.status);
        eventEmitter.emit('status', req.body);
        res.send('Status Recieved');
    } else {
        res.send('Authorization failed');
    }
});

export { router as statusRouter, statusType };