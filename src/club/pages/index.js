import { Router } from 'express';

import main from './main';
import pay from './pay';

export default context => {
    const router = Router();

    main(context, router);
    pay(context, router);

    return router;
};