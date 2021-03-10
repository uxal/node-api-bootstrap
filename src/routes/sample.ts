import { Router } from 'express';
import SampleController from '../controllers/sample';

const router = Router();

router.get('/', SampleController.get);
router.post('/', SampleController.post);
router.put('/', SampleController.put);
router.delete('/', SampleController.delete);

export default router;
