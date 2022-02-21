import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).send({
        title: 'Node Store API',
        version: '0.0.1'
    });
});

export default router;