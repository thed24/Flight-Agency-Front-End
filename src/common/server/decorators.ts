/* eslint-disable camelcase */

import { NextApiRequest, NextApiResponse } from 'next';
import { createMiddlewareDecorator, NextFunction } from 'next-api-decorators';

export const RequiresAuth = createMiddlewareDecorator(
    async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
        next();
    }
);
