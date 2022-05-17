import {
    createMiddlewareDecorator,
    NextFunction,
    UnauthorizedException,
} from '@storyofams/next-api-decorators';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export const RequiresAuth = createMiddlewareDecorator(
    async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
        const session = await getSession({ req });

        console.log('session', session);

        if (!session) {
            throw new UnauthorizedException();
        }

        next();
    }
);
