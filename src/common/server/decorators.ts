import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
    createMiddlewareDecorator,
    UnauthorizedException,
    NextFunction,
} from '@storyofams/next-api-decorators';

export const RequiresAuth = createMiddlewareDecorator(
    async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
        const session = await getSession({ req });

        if (!session) {
            throw new UnauthorizedException();
        }

        next();
    }
);
