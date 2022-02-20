import * as express from 'express';
import * as controller from '../controllers/customer-controller';
import * as authService from '../services/auth-service';

const router = express.Router();

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.post('/refresh', authService.authorize, controller.refresh);

export default router;