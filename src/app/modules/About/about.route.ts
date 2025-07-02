import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AboutControllers } from './about.controller';
import { AboutValidations } from './about.validation';

const router = express.Router();

router.put(
    '/',
    auth('SUPERADMIN'),
    validateRequest(AboutValidations.upsertAbout),
    AboutControllers.upsertAbout
);

router.get(
    '/',
    AboutControllers.getAbout
);

export const AboutRouters = router;
