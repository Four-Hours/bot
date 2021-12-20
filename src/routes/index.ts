import express from 'express';
const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', function(req: express.Request, res: express.Response) {
    res.send('Four Hours discord bot api. Version: ' + process.env.npm_package_version);
});

export default router;