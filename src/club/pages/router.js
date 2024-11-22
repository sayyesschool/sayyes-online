import { Router } from 'express';

import main from './main';

export default context => {
    const router = Router();

    main(context, router);

    return router;
};