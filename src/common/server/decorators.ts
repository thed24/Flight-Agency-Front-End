/* eslint-disable camelcase */
import {
    createMiddlewareDecorator,
    NextFunction,
} from '@storyofams/next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next';

export const RequiresAuth = createMiddlewareDecorator(
    async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
        next();
    }
);
