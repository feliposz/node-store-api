import * as express from 'express';
const router = express.Router();
import * as controller from '../controllers/product-controller';
import * as authService from '../services/auth-service';

router.get('/', controller.get);
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);
router.post('/', authService.isAdmin, controller.post);
router.put('/:id', authService.isAdmin, controller.put);
router.delete('/:id', authService.isAdmin, controller.remove);

export default router;