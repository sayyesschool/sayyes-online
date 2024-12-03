import { Router } from 'express';

import legal from './legal';
import main from './main';

export default context => {
    const router = Router();

    main(context, router);
    legal(context, router);

    return router;
};