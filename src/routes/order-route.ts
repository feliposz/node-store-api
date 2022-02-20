import * as express from 'express';
import * as controller from '../controllers/order-controller';
import * as authService from '../services/auth-service';

const router = express.Router();

router.get('/', authService.authorize, controller.get);
router.post('/', authService.authorize, controller.post);

export default router;